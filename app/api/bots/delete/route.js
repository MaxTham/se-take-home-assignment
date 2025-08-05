import clientPromise from "@/utils/mongodb";

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { botID } = body;

    if (!botID) {
      return new Response(JSON.stringify({ error: "Missing botID" }), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const botsCol = db.collection("Bots");
    const ordersCol = db.collection("Orders");

    // find targted bot
    const targetBot = await botsCol.findOne({ botID: botID });
    if (!targetBot) {
      return new Response(JSON.stringify({ message: "No available bots" }), {
        status: 200,
      });
    }
    if (targetBot.botStatus == "processing") {
      const processingOrder = await ordersCol.findOne({
        orderID: targetBot.botTask,
      });
      if (processingOrder) {
        await ordersCol.updateOne(
          { orderID: processingOrder.orderID },
          { $set: { orderStatus: "Pending" } }
        );
      }
    }

    const result = await botsCol.deleteOne({ botID: botID });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: `Bot with botID ${botID} not found` }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Bot with Bot ID {${botID}} deleted successfully`,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("[DELETE /api/bot/delete] Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
