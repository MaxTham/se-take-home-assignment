import clientPromise from "@/utils/mongodb";

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const ordersCol = db.collection("Orders");
    const botsCol = db.collection("Bots");

    await ordersCol.updateMany(
      { orderStatus: "Processing" },
      {
        $set: {
          orderStatus: "Pending",
          updatedAt: new Date(),
        },
      }
    );

    await botsCol.updateOne(
      { botStatus: "processing" },
      {
        $set: {
          botStatus: "active",
          botTask: "IDLE",
          botTaskType: null,
        },
      }
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Orders and Bots are reset",
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Error in api/orders/reset:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
