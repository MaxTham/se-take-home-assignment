//Bots data
let bots = [];
let botCounter = 0;

// Orders data
let orders = [];
let orderCounter = 0;
// Bots Functions
export async function getNextBotID() {
  botCounter++;
  return botCounter;
}

export async function insertBot(bot) {
  bots.push(bot);
  return bot;
}

export function getBots() {
  return bots;
}

export function deleteBot(botID) {
  const index = bots.findIndex((b) => b.botID === botID);
  if (index !== -1) {
    bots.splice(index, 1);
    return true;
  }
  return false;
}


// Orders Functions
export async function getNextOrderID() {
  orderCounter++;
  return orderCounter;
}

export async function insertOrder(order) {
  orders.push(order);
  return order;
}

export function getOrders() {
  return orders;
}

export function updateOrderStatus(orderID, status) {
  const order = orders.find((o) => o.orderID === orderID);
  if (order) {
    order.orderStatus = status;
    return true;
  }
  return false;
}