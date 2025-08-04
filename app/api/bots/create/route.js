import clientPromise from '@/utils/mongodb'

export async function POST(request) {
  try {
    const body = await request.json()
    const { botName } = body

    if (!botName) {
      return new Response(
        JSON.stringify({ error: 'Missing botName' }),
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)
    const botsCollection = db.collection('Bots')

    // Find the current max botID (as integer), fallback to 0
    const latestBot = await botsCollection
      .find({})
      .sort({ botID: -1 }) // Sort descending by botID
      .limit(1)
      .toArray()

    const nextBotID = latestBot.length > 0 ? (parseInt(latestBot[0].botID) || 0) + 1 : 1
    const botStatus = body.botStatus || 'active'

    const result = await botsCollection.insertOne({
      botName,
      botStatus,
      botID: nextBotID,
      createdAt: new Date(),
    })

    return new Response(JSON.stringify({
      success: true,
      message: `Bot ${botName} created successfully`,
      botId: result.insertedId,
      botID: nextBotID,
    }), {
      status: 201
    })
  } catch (error) {
    console.error('[POST /api/bot/create] Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    )
  }
}
