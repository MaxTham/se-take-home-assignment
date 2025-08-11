import { getBots, getOrders, updateOrderStatus, deleteBot } from "@/utils/mockDb"; // Use mock DB for testing

export async function DELETE() {
  try {
    const bots = getBots();

    const targetBot = [...bots].sort((a, b) => b.botID - a.botID)[0];

    if (!targetBot) {
      return new Response(
        JSON.stringify({ success: false, error: "No available bots" }),
        { status: 200 }
      );
    }

    if (targetBot.botStatus === "processing") {
      const processingOrder = getOrders().find(
        (o) => o.orderID === targetBot.botTask
      );
      if (processingOrder) {
        updateOrderStatus(processingOrder.orderID, "Pending");
      }
    }

    const deleted = deleteBot(targetBot.botID);

    if (!deleted) {
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
      { status: 200 }
    );
  } catch (error) {
    console.error("[DELETE /api/bots/delete] Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
