import clientPromise from "@/utils/mongodb";

export async function POST(req) {
  try {
    const { orderID, botID } = await req.json();
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const ordersCol = db.collection("Orders");
    const botsCol = db.collection("Bots");

    await ordersCol.updateOne(
      { orderID },
      { $set: { orderStatus: "Complete", updatedAt: new Date() } }
    );

    await botsCol.updateOne(
      { botID },
      { $set: { botStatus: "active", botTask: "IDLE", botTaskType: null } }
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Error in /api/orders/complete:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
