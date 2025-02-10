module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    'Order',
    {
      orders: {
        type: Sequelize.JSON,
      },
      reviewStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'orders',
      timestamps: true,
    }
  );

  return Order;
};
