
const Sequelize = require("sequelize")
const connection = new Sequelize('fastify', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

module.exports = connection;
