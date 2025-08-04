export const createBot  = async (botName) =>{
    const res = await fetch("/api/bots/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ botName }),
  });

  return res.json();
}

export const deleteBot = async (botID) => {
  const res = await fetch("/api/bots/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ botID: Number(botID) }),
  });

  return res.json();
};

export const getBot = async () => {
  const res = await fetch("/api/bots/get");
  return res.json();
};