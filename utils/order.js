export const createOrder = async (orderType) => {
  const res = await fetch("/api/orders/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderType }),
  });

  return res.json();
};

export const getPendingOrder = async () => {
  const res = await fetch("/api/orders/get?orderStatus=Pending");
  return res.json();
};

export const getCompleteOrder = async () => {
  const res = await fetch("/api/orders/get?orderStatus=Complete");
  return res.json();
};

export const getInProgressOrder = async () => {
  const res = await fetch("/api/orders/get?orderStatus=Processing");
  return res.json();
};

export const assignOrder = async () => {
  const res = await fetch("/api/orders/assign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

export const completeOrder = async (orderID, botID) => {
  const res = await fetch("/api/orders/complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderID: orderID, botID: botID }),
  });
  return res.json();
};

export const resetOrder = async () => {
  const res = await fetch("/api/orders/reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};
