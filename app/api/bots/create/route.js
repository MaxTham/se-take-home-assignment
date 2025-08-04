import clientPromise from '@/utils/mongodb'

async function getNextBotID(db) {
  const lastBot = await db.collection("Bots")
    .find({})
    .sort({ botID: -1 })
    .limit(1)
    .toArray();

  return lastBot.length === 0 ? 1 : lastBot[0].botID + 1;
}


export async function POST(request) {
  try {
    const body = await request.json();
    const { botName } = body;

    if (!botName) {
      return new Response(
        JSON.stringify({ error: "Missing botName" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const botsCollection = db.collection("Bots");
    const botID = await getNextBotID(db);
    const botStatus = "active";

    const result = await botsCollection.insertOne({
      botName,
      botStatus,
      botID,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Bot ${botName} #${botID} created successfully`,
        botId: botID,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/bot/create] Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
