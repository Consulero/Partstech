module.exports = (sequelize, Sequelize, dbName) => {
  const user = sequelize.define(
    dbName,
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ps_refresh_token: {
        type: Sequelize.TEXT,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
    }
  );

  return user;
};
