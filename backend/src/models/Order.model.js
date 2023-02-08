
const Sequelize = require("sequelize")
const database = require("../database/index");
const Customers = require("./Customer.model");

const Order = database.define("order", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  customer_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'customers',
      key: 'id'
    }
  },
  total_price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  order_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

Order.belongsTo(Customers, {foreignKey: 'customer_id'});

module.exports = Order;
