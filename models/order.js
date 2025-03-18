module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      orders: {
        type: DataTypes.JSON,
      },
      orderType: {
        type: DataTypes.ENUM('tire', 'part')
      },
    },
    {
      tableName: 'orders',
      timestamps: true,
    }
  );

  return Order;
};
