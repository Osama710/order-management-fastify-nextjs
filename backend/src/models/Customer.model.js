const Sequelize = require("sequelize")
const database = require("../database/index");

const Customers = database.define("customers", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
});

module.exports = Customers;
