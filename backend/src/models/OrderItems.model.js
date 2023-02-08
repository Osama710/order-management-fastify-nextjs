
const Sequelize = require("sequelize")
const database = require("../database/index")

const OrderItems = database.define("order_items", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  order_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'orders',
      key: 'id'
    }
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  total_price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
});

module.exports = OrderItems;
