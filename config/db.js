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
db.PunchoutSession = require('../models/punchout-session')(sequelize, Sequelize);
db.PartType = require('../models/part-type')(sequelize, Sequelize);

// relationships
db.PunchoutSession.hasMany(db.PartType, {
  foreignKey: 'punchoutSessionId',
  as: 'partTypes', // Alias for related records
});
db.PartType.belongsTo(db.PunchoutSession, {
  foreignKey: 'punchoutSessionId',
  as: 'punchoutSession',
});

module.exports = db;
