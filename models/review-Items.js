module.exports = (sequelize, Sequelize, dbName) => {
  const reviewItems = sequelize.define(
    dbName,
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      supplierName: {
        type: Sequelize.TEXT,
      },
      supplierPart: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: 'review_items',
      timestamps: true,
    }
  );

  return reviewItems;
};
