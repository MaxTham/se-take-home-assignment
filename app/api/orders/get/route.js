import clientPromise from '@/utils/mongodb';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orderStatus = searchParams.get('orderStatus');

    const allowedStatuses = ['Pending', 'Complete'];
    if (!allowedStatuses.includes(orderStatus)) {
      return new Response(
        JSON.stringify({ error: 'Invalid orderStatus' }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const ordersCollection = db.collection('Orders');

    const orders = await ordersCollection
      .find({ orderStatus })
      .sort({ createdAt: -1 }) // optional: newest first
      .toArray();

    return new Response(JSON.stringify({ success: true, data: orders }), {
      status: 200,
    });
  } catch (error) {
    console.error('[GET /api/orders/get] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
