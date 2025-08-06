import clientPromise from "@/utils/mongodb";

async function getNextOrderID(db) {
  const lastOrder = await db
    .collection("Orders")
    .find({})
    .sort({ orderID: -1 })
    .limit(1)
    .toArray();

  return lastOrder.length === 0 ? 1 : lastOrder[0].orderID + 1;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { orderType } = body;

    if (!orderType) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing order type" }),
        {
          status: 400,
        }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const ordersCollection = db.collection("Orders");
    const orderID = await getNextOrderID(db);
    const orderStatus = "Pending";
    const result = await ordersCollection.insertOne({
      orderID,
      orderType,
      orderStatus,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Order #${orderID} added into pending order list`,
        botId: result.orderID,
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("[POST /api/orders/create] Error:", error);
    return new Response(JSON.stringify({success:false, error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
