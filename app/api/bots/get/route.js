
import { getBots } from "@/utils/mockDb";

export async function GET() {
  try {
    // Simulate DB query
    const data = getBots().map(bot => ({
      botName: bot.botName,
      botStatus: bot.botStatus,
      botID: bot.botID,
      botTask: bot.botTask,
      botTaskType: bot.botTaskType,
    }));

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[GET /api/bots] Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
// 