import { getOrders, getBots } from "@/utils/mockDb";

export async function POST() {
  try {
    const pendingOrder = [...getOrders()]
      .filter(o => o.orderStatus === "Pending")
      .sort((a, b) => {
        if (a.orderType < b.orderType) return -1;
        if (a.orderType > b.orderType) return 1;
        return new Date(a.createdAt) - new Date(b.createdAt);
      })[0];

    if (!pendingOrder) {
      return new Response(
        JSON.stringify({ message: "No pending orders" }),
        { status: 200 }
      );
    }

    const availableBot = [...getBots()]
      .filter(b => b.botStatus === "active")
      .sort((a, b) => a.botID - b.botID)[0]; 

    if (!availableBot) {
      return new Response(
        JSON.stringify({ message: "No available bots" }),
        { status: 200 }
      );
    }

    availableBot.botStatus = "processing";
    availableBot.botTask = pendingOrder.orderID;
    availableBot.botTaskType = pendingOrder.orderType;

    pendingOrder.orderStatus = "Processing";
    pendingOrder.updatedAt = new Date();

    return new Response(
      JSON.stringify({
        success: true,
        assignedBotID: availableBot.botID,
        assignedOrderID: pendingOrder.orderID,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in /api/orders/assign:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
