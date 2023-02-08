const Customers = require("../models/Customer.model");
const Order = require("../models/Order.model")
const OrderItem = require("../models/OrderItems.model");
const Product = require("../models/Product.model");

const getAllOrders = async (request, reply) => {
    const orders = await Order.findAll({
        include: [{
            model: Customers,
            attributes: ['id', 'name'],
            required: true
        }]
    })
    return reply.status(200).send({ status: 200, orders, message: "Orders Successfully Fetched" });
}

const addNewOrder = async (request, reply) => {
    try {
        let products = request.body.products;
        delete request.body.products
        const order = await Order.create({ ...request.body });
        let order_id = null
        await Order.findAll({
            limit: 1,
            order: [['createdAt', 'DESC']]
        }).then(function (entries) {
            order_id = entries[0].id
        });
        let total_price = 0
        products?.map(async (product) => {
            let prod = await Product.findByPk(product?.id);
            let price = prod?.price * product?.quantity
            total_price = total_price + price
            await OrderItem.create({ order_id: order_id, product_id: product?.id, total_price: price, quantity: product?.quantity });
        })
        const ord = await Order.findByPk(order_id);
        if (ord !== null) {
            await Order.update({ total_price: total_price }, { where: { id: order_id } });
        }
        return reply.status(200).send({ status: 200, order, message: "Order Successfully Created" });
    } catch (error) {
        reply.status(500).send({ status: 500, message: error?.message })
    }
}

// const getCustomerById = async (request, reply) => {
//     try {
//         const { id } = request.params;
//         const customer = await Customers.findByPk(id);
//         if (customer !== null) {
//             return reply.send({ status: 200, customer, message: `Customer Successfully Fetched with ID ${id}` });
//         } else {
//             reply.send({ status: 400, message: `No record found with ID ${id}` })
//         }
//     } catch (error) {
//         reply.status(500).send(error)
//     }
// }

// const updateOrderById = async (request, reply) => {
//     const { id } = request.params;
//     const customer = await Order.findByPk(id);
//     if (customer !== null) {
//         await Order.update({ ...request.body }, { where: { id } });
//         return reply.send({ status: 200, customer, message: `Successfully Updated Order with ID ${id}` });
//     } else {
//         reply.send({ status: 400, message: `No record found with ID ${id} to update` })
//     }
// }

// const deleteCustomer = async (request, reply) => {
//     const { id } = request.params;
//     const customer = await Customers.findByPk(id);
//     if (customer !== null) {
//         await Customers.destroy({ where: { id } });
//         return reply.send({ status: 200, customer, message: `Successfully Deleted Customer with ID ${id}` });
//     } else {
//         reply.send({ status: 400, message: `No record found with ID ${id} to delete.` })
//     }
// }

// module.exports = { getAllCustomers: getAllCustomers, addNewCustomer: addNewCustomer, getCustomerById: getCustomerById, updateCustomerById: updateCustomerById, deleteCustomer: deleteCustomer }

module.exports = { getAllOrders: getAllOrders, addNewOrder: addNewOrder }