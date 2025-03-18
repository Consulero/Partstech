require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const {
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: true, // SQL query logging
  pool: {
    max: 10, // Allow up to 10 connections
    min: 0,
    acquire: 30000, // Wait for 30 seconds before throwing error
    idle: 10000, // Close idle connections after 10 seconds
  },
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('../models/user')(sequelize, Sequelize);
db.Quotation = require('../models/quotation')(sequelize, DataTypes);
db.Order = require('../models/order')(sequelize, DataTypes);
db.Inventory = require('../models/inventory')(sequelize, Sequelize);

module.exports = db;
