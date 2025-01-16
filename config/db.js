require('dotenv').config();
const Sequelize = require('sequelize');

const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('../models/user')(sequelize, Sequelize);
db.Quotation = require('../models/quotation')(sequelize, Sequelize);
db.PurchaseOrder = require('../models/purchase-order')(sequelize, Sequelize);

module.exports = db;
