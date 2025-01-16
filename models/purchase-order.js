module.exports = (sequelize, Sequelize) => {
  const PurchaseOrder = sequelize.define(
    'PurchaseOrder',
    {
      poNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      poLastDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      poLastNumber: {
        type: Sequelize.INTEGER,
      },
      totalAmount: {
        type: Sequelize.FLOAT,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'Pending',
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
      },
      expectedDeliveryDate: {
        type: Sequelize.DATE,
      },
    },
    {
      tableName: 'purchase_orders',
      timestamps: true,
    }
  );

  return PurchaseOrder;
};
