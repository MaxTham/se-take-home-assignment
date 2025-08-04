import clientPromise from '@/utils/mongodb'

export async function POST(request) {
  try {
    const body = await request.json()
    const { orderID, orderStatus } = body

    if (!orderID || !orderStatus) {
      return new Response(
        JSON.stringify({ error: 'Missing orderID or orderStatus' }),
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)
    const ordersCollection = db.collection('Orders')

    const result = await ordersCollection.updateOne(
      { orderID: parseInt(orderID) }, // Find by botID
      {
        $set: {
          orderStatus,
          updatedAt: new Date(),
        }
      }
    )

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ error: `No bot found with botID ${botID}` }),
        { status: 404 }
      )
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Order #${orderID} updated successfully`,
    }), {
      status: 200
    })

  } catch (error) {
    console.error('[POST /api/bots/edit] Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    )
  }
}
