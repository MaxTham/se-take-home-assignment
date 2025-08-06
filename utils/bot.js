export const createBot  = async () =>{
    const res = await fetch("/api/bots/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

export const deleteBot = async () => {
  const res = await fetch("/api/bots/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

export const getBot = async () => {
  const res = await fetch("/api/bots/get");
  return res.json();
};