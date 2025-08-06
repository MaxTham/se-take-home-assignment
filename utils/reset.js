import clientPromise from "./mongodb";

export const resetOrdersAndBots = async () => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const ordersCol = db.collection("Orders");
  const botsCol = db.collection("Bots");

  await ordersCol.updateMany(
    { orderStatus: "Processing" },
    {
      $set: {
        orderStatus: "Pending",
        updatedAt: new Date(),
      },
    }
  );

  await botsCol.updateMany(
    { botStatus: "processing" },
    {
      $set: {
        botStatus: "active",
        botTask: "IDLE",
        botTaskType: null,
      },
    }
  );

  console.log("✅ Reset completed (orders + bots).");
};
