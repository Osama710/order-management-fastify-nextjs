const customerRoute = require("./customer_route")
const productRoutes = require("./product_route")
const orderRoute = require("./order_route")

const allRoutes = (app) => {
    app.register(require("fastify-cors"), {
        origin: "*",
        methods: ["GET","DELETE","PUT","POST"]
    });
    app.register(productRoutes);
    app.register(customerRoute);
    app.register(orderRoute);
}

module.exports = allRoutes