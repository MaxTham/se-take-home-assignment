import { getNextOrderID, insertOrder } from "@/utils/mockDb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { orderType } = body;

    if (!orderType) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing order type" }),
        { status: 400 }
      );
    }

    const orderID = await getNextOrderID();
    const orderStatus = "Pending";

    await insertOrder({
      orderID,
      orderType,
      orderStatus,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Order #${orderID} added into pending order list`,
        orderID, // fixed key name (was botId before)
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/orders/create] Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
