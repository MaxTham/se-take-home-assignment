import {getNextBotID, insertBot} from "@/utils/mockDb"; // Use mock DB for testing

export async function POST() {
   try {
    const botID = await getNextBotID();
    const botStatus = "active";
    const botTask = "IDLE";
    const botTaskType = null;

    const bot = {
      botStatus,
      botID,
      createdAt: new Date(),
      botTask,
      botTaskType,
    };

    await insertBot(bot);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Bot #${botID} created successfully`,
        botId: botID,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/bots/create] Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
