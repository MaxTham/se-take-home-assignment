import clientPromise from '@/utils/mongodb'

export async function GET(request) {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    const data = await db.collection('Bots')
      .find({}, { projection: { _id: 0, botName: 1, botStatus: 1, botID: 1, botTask: 1, botTaskType:1 } })
      .toArray()

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('[GET /api/bots] Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    )
  }
}
