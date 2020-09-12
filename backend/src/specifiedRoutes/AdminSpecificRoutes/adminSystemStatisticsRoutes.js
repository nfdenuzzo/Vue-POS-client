const router = require("express").Router();
const _ = require("lodash");
const momentTZ = require("moment-timezone");
const {
  loadSpecificCollection
} = require("../../../utils/dbUtils.js");
const ObjectId = require("mongodb").ObjectID;
const {
  hasReadPermission,
} = require("../../../utils/getPermissions.js");

//#region
// retrieve latest side option items
router.get("/", hasReadPermission, async (req, res) => {
  const ordersCollection = await loadSpecificCollection("orders");
  const returnFieldsOrders = {
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

  const usersCollection = await loadSpecificCollection("users");
  const returnFieldsUsers = {
    name: 1,
    userEmail: 1,
    lastLoginDate: 1,
    _id: 0,
  };
  const retrievedUsers = await usersCollection
    .find({}, { projection: returnFieldsUsers })
    .toArray();

  const orderDetails = [];
  retrievedOrders.forEach(order => {
    order.orderDetails.forEach(item => {
      orderDetails.push(item)
    })
  });

  const totalofOrders = await getTotalofOrders(retrievedOrders);
  
  const totalMonthlySales = await getTotalMonthlySales(retrievedOrders);
  const topFiveItems = await getTopFiveItems(orderDetails);

  const stats = {
    averageBill: totalofOrders / retrievedOrders.length,
    totalSales: totalofOrders,
    totalSalesMonth: totalMonthlySales,
    topFiveItems: topFiveItems,
    userCount: retrievedUsers.length
  };

  res.send(stats);
});
//#endregion

async function getTopFiveItems(orders) {
  let grouped = _.groupBy(orders, 'id')
  let items = []
  for (group in grouped) {
    let array = grouped[group]
    let orderedData = _.orderBy(array, ['quantity'], ['desc'])
    items.push(orderedData.slice(0,1))
  }
  let top5Items = items.slice(0,5)
  return top5Items
}

async function getTotalofOrders(orders) {
  return orders.reduce((a, b) => +a + +b.orderTotal, 0);
}

async function getTotalMonthlySales(orders) {
  const startDate = momentTZ
    .tz("africa/Johannesburg")
    .startOf("month")
    .utc();
  const endDate = momentTZ
    .tz("africa/Johannesburg")
    .endOf("day")
    .utc();

  let data = orders.filter((order) => {
    return (
      new Date(order.createdAt) >=
      new Date(startDate) &&
      new Date(order.createdAt) <=
      new Date(endDate)
    );
  });


  let results = data.length > 0 ? await getTotalofOrders(data) : 0;

  return results;
}

module.exports = router;
