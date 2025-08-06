import clientPromise from "@/utils/mongodb";

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const ordersCol = db.collection("Orders");
    const botsCol = db.collection("Bots");

    // 1. Get earliest VIP or Normal pending order
    const pendingOrder = await ordersCol.findOne(
      { orderStatus: "Pending" },
      { sort: { orderType: 1, createdAt: 1 } } // VIP before Normal, then oldest
    );

    if (!pendingOrder) {
      return new Response(JSON.stringify({ message: "No pending orders" }), {
        status: 200,
      });
    }

    // 2. Get an available bot
    const availableBot = await botsCol
      .find({ botStatus: "active" })
      .sort({ orderID: 1 }) // Sort by orderID descending (highest first)
      .limit(1)
      .next();

    if (!availableBot) {
      return new Response(JSON.stringify({ message: "No available bots" }), {
        status: 200,
      });
    }

    // 3. Assign bot to order
    await botsCol.updateOne(
      { botID: availableBot.botID },
      {
        $set: {
          botStatus: "processing",
          botTask: pendingOrder.orderID,
          botTaskType: pendingOrder.orderType,
        },
      }
    );

    await ordersCol.updateOne(
      { orderID: pendingOrder.orderID },
      { $set: { orderStatus: "Processing", updatedAt: new Date() } }
    );

    return new Response(
      JSON.stringify({
        success: true,
        assignedBotID: availableBot.botID,
        assignedOrderID: pendingOrder.orderID,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Error in api/orders/assign:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
