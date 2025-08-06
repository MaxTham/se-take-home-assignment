import clientPromise from "@/utils/mongodb";

export async function DELETE() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const botsCol = db.collection("Bots");
    const ordersCol = db.collection("Orders");

    // find targeted bot
    const targetBot = await botsCol
      .find({})
      .sort({ botID: -1 }) // Sort descending by botID
      .limit(1)
      .next(); // Get the first document from the cursor

    if (!targetBot) {
      return new Response(
        JSON.stringify({ success: false, error: "No available bots" }),
        {
          status: 200,
        }
      );
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

    const result = await botsCol.deleteOne({ botID: targetBot.botID });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Bot with botID ${targetBot.botID} not found`,
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Bot #${targetBot.botID} deleted successfully`,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("[DELETE /api/bot/delete] Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}
