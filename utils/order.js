export const createOrder = async (orderDetails, orderType) => {
  const res = await fetch("/api/orders/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderDetails, orderType }),
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
     body: JSON.stringify({ orderID, botID }),
  });

  return res.json();
};