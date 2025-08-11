import { getOrders } from "@/utils/mockDb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orderStatus = searchParams.get("orderStatus");

    const allowedStatuses = ["Pending", "Complete", "Processing"];
    if (!allowedStatuses.includes(orderStatus)) {
      return new Response(JSON.stringify({ error: "Invalid orderStatus" }), {
        status: 400,
      });
    }

    const orders = getOrders()
      .filter(order => order.orderStatus === orderStatus)
      .sort((a, b) => {
        if (a.orderType < b.orderType) return -1;
        if (a.orderType > b.orderType) return 1;
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

    return new Response(
      JSON.stringify({ success: true, data: orders }),
      { status: 200 }
    );
  } catch (error) {
    console.error("[GET /api/orders/get] Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
