const Product = require("../models/Product.model")

const getAllProduct = async (request, reply) => {
    const products = await Product.findAll();
    return reply.status(200).send({ status: 200, products, message: "Products Successfully Fetched" });
}

const addNewProduct = async (request, reply) => {
    try {
        const product = await Product.create({ ...request.body });
        return reply.status(200).send({ status: 200, product, message: "Product Successfully Added" });
    } catch (error) {
        reply.status(500).send({ status: 500, message: "Email already exists" })
    }
}

const getProductById = async (request, reply) => {
    try {
        const { id } = request.params;
        const product = await Product.findByPk(id);
        if (product !== null) {
            return reply.send({ status: 200, product, message: `Product Successfully Fetched with ID ${id}` });
        } else {
            reply.send({ status: 400, message: `No record found with ID ${id}` })
        }
    } catch (error) {
        reply.status(500).send(error)
    }
}

const updateProductById = async (request, reply) => {
    const { id } = request.params;
    const product = await Product.findByPk(id);
    if (product !== null) {
        await Product.update({ ...request.body }, { where: { id } });
        return reply.send({ status: 200, product, message: `Successfully Updated Product with ID ${id}` });
    } else {
        reply.send({ status: 400, message: `No record found with ID ${id} to update` })
    }
}

const deleteProduct = async (request, reply) => {
    const { id } = request.params;
    const product = await Product.findByPk(id);
    if (product !== null) {
        await Product.destroy({ where: { id } });
        return reply.send({ status: 200, product, message: `Successfully Deleted Product with ID ${id}` });
    } else {
        reply.send({ status: 400, message: `No record found with ID ${id} to delete.` })
    }

}

module.exports = { getAllProduct: getAllProduct, addNewProduct: addNewProduct, getProductById: getProductById, updateProductById: updateProductById, deleteProduct: deleteProduct }