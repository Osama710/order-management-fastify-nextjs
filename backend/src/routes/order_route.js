const order = require("../controllers/order.controller")
async function orderRoute(app){
    app.get("/orders", order.getAllOrders);
    app.post("/addOrder", order.addNewOrder);
}

module.exports = orderRoute