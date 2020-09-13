const router = require("express").Router();
const _ = require("lodash");
const momentTZ = require("moment-timezone");
const { loadSpecificCollection } = require("../../../utils/dbUtils.js");
const ObjectId = require("mongodb").ObjectID;
const { hasReadPermission } = require("../../../utils/getPermissions.js");

//#region
// retrieve latest side option items
router.get("/", hasReadPermission, async (req, res) => {
  const ordersCollection = await loadSpecificCollection("orders");
  const returnFieldsOrders = {
    orderType: 1,
    orderTotal: 1,
    orderDetails: 1,
    userEmail: 1,
    createdAt: 1,
    name: 1,
    _id: 0,
  };
  const retrievedOrders = await ordersCollection
    .find({}, { projection: returnFieldsOrders })
    .toArray();

  const orderDetails = [];
  retrievedOrders.forEach((order) => {
    order.orderDetails.forEach((item) => {
      orderDetails.push(item);
    });
  });

  const totalofOrders = await getTotalofOrders(retrievedOrders);

  const totalMonthlySales = await getTotalMonthlySales(retrievedOrders);
  const topFiveItems = await getTopFiveItems(orderDetails);

  const orderTypeCounts = await getOrderTypeCounts(retrievedOrders);

  const monthlyDaySales = await getMonthlyDaySales(retrievedOrders);

  const stats = {
    averageBill: totalofOrders / retrievedOrders.length,
    totalSales: totalofOrders,
    totalSalesMonth: totalMonthlySales,
    topFiveItems: topFiveItems,
    orderTypeCounts: orderTypeCounts,
    monthlyDaySales: monthlyDaySales,
  };

  res.send(stats);
});
//#endregion

async function getTopFiveItems(orders) {
  let grouped = _.groupBy(orders, "id");
  let items = [];
  for (group in grouped) {
    let orderItems = grouped[group];
    let totalItemCount = await getTotalItemCount(orderItems);
    let item = { totalItemCount: totalItemCount, name: orderItems[0].name };
    items.push(item);
  }
  let sortedData = _.orderBy(items, ["totalItemCount"], ["desc"]);
  let top5Items = sortedData.slice(0, 5);
  return top5Items;
}

async function getTotalofOrders(orders) {
  return orders.reduce((a, b) => +a + +b.orderTotal, 0);
}

async function getTotalItemCount(orders) {
  return orders.reduce((a, b) => +a + +b.quantity, 0);
}

async function getTotalMonthlySales(orders) {
  const startDate = momentTZ.tz("africa/Johannesburg").startOf("month").utc();
  const endDate = momentTZ.tz("africa/Johannesburg").endOf("day").utc();

  let data = orders.filter((order) => {
    return (
      new Date(order.createdAt) >= new Date(startDate) &&
      new Date(order.createdAt) <= new Date(endDate)
    );
  });

  let results = data.length > 0 ? await getTotalofOrders(data) : 0;

  return results;
}

async function getOrderTypeCounts(orders) {
  const collectionOrders = orders.filter(
    (item) => item.orderType === "Collection"
  );
  const deliveryOrders = orders.filter((item) => item.orderType === "Delivery");

  return {
    collectionOrdersCount: collectionOrders.length,
    deliveryOrdersCount: deliveryOrders.length,
  };
}

async function getMonthlyDaySales(orders) {
  const startDate = momentTZ.tz("africa/Johannesburg").startOf("month").utc();
  const endDate = momentTZ.tz("africa/Johannesburg").endOf("day").utc();

  let data = orders.filter((order) => {
    return (
      new Date(order.createdAt) >= new Date(startDate) &&
      new Date(order.createdAt) <= new Date(endDate)
    );
  });
  // this gives an object with dates as keys
  const groups = data.reduce((groups, order) => {
    const date = order.createdAt.toISOString().split("T")[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(order);
    return groups;
  }, {});

  const dailySaleTotals = await getDailySaleTotals(groups);
  return dailySaleTotals;
}

function getDailySaleTotals(groups) {
  return Promise.all(
    Object.keys(groups).map(async (date) => {
      return {
        date: date,
        ordersTotal: await getTotalofOrders(groups[date]),
      };
    })
  );
}

module.exports = router;
