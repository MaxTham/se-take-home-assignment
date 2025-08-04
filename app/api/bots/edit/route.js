import clientPromise from '@/utils/mongodb'

export async function POST(request) {
  try {
    const body = await request.json()
    const { botID, botName, botStatus } = body

    if (!botID || !botName || !botStatus) {
      return new Response(
        JSON.stringify({ error: 'Missing botID, botName, or botStatus' }),
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)
    const botsCollection = db.collection('Bots')

    const result = await botsCollection.updateOne(
      { botID: parseInt(botID) }, // Find by botID
      {
        $set: {
          botName,
          botStatus,
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
      message: `Bot with botID ${botID} updated successfully`,
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
