const Customers = require("../models/Customer.model")

const getAllCustomers = async (request, reply) => {
    const customers = await Customers.findAll();
    return reply.status(200).send({ status: 200, customers, message: "Customers Successfully Fetched" });
}

const addNewCustomer = async (request, reply) => {
    try {
        const customer = await Customers.create({ ...request.body });
        return reply.status(200).send({ status: 200, customer, message: "Customer Successfully Added" });
    } catch (error) {
        reply.status(500).send({ status: 500, message: "Email already exists" })
    }
}

const getCustomerById = async (request, reply) => {
    try {
        const { id } = request.params;
        const customer = await Customers.findByPk(id);
        if (customer !== null) {
            return reply.send({ status: 200, customer, message: `Customer Successfully Fetched with ID ${id}` });
        } else {
            reply.send({ status: 400, message: `No record found with ID ${id}` })
        }
    } catch (error) {
        reply.status(500).send(error)
    }
}

const updateCustomerById = async (request, reply) => {
    const { id } = request.params;
    const customer = await Customers.findByPk(id);
    if (customer !== null) {
        await Customers.update({ ...request.body }, { where: { id } });
        return reply.send({ status: 200, customer, message: `Successfully Updated Customer with ID ${id}` });
    } else {
        reply.send({ status: 400, message: `No record found with ID ${id} to update` })
    }
}

const deleteCustomer = async (request, reply) => {
    const { id } = request.params;
    const customer = await Customers.findByPk(id);
    if (customer !== null) {
        await Customers.destroy({ where: { id } });
        return reply.send({ status: 200, customer, message: `Successfully Deleted Customer with ID ${id}` });
    } else {
        reply.send({ status: 400, message: `No record found with ID ${id} to delete.` })
    }
}

module.exports = { getAllCustomers: getAllCustomers, addNewCustomer: addNewCustomer, getCustomerById: getCustomerById, updateCustomerById: updateCustomerById, deleteCustomer: deleteCustomer }