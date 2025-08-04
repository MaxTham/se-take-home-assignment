import clientPromise from '@/utils/mongodb'

export async function DELETE(request) {
  try {
    const body = await request.json()
    const { botID } = body

    if (!botID) {
      return new Response(
        JSON.stringify({ error: 'Missing botID' }),
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)
    const botsCollection = db.collection('Bots')

    const result = await botsCollection.deleteOne({ botID: botID })

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: `Bot with botID ${botID} not found` }),
        { status: 404 }
      )
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Bot with Bot ID {${botID}} deleted successfully`
    }), {
      status: 200
    })

  } catch (error) {
    console.error('[DELETE /api/bot/delete] Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    )
  }
}
