// app/api/orders/complete/route.js
import { updateOrderStatus, getBots } from "@/utils/mockDb";

export async function POST(req) {
  try {
    const { orderID, botID } = await req.json();
    const bot = getBots().find((b) => b.botID === botID);

    if (!bot || bot.botTask !== orderID) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Order no longer assigned to this bot",
        }),
        { status: 400 }
      );
    }

    bot.botStatus = "active";
    bot.botTask = "IDLE";
    bot.botTaskType = null;

    const orderUpdated = updateOrderStatus(orderID, "Complete");

    if (!orderUpdated) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Error in /api/orders/complete:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
