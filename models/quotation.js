module.exports = (sequelize, DataTypes) => {
  const Quotation = sequelize.define(
    'Quotation',
    {
      sessionId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      redirectUrl: {
        type: DataTypes.TEXT,
      },
      orders: {
        type: DataTypes.JSON,
      },
      action: {
        type: DataTypes.ENUM('SUBMIT_QUOTE', 'PURCHASE'),
      },
      orderType: {
        type: DataTypes.ENUM('tire', 'part')
      },
      poNumber: {
        type: DataTypes.STRING,
      },
      poLastNumber: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected')
      },
      isOrderPlaced: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'quotations',
      timestamps: true,
    }
  );

  return Quotation;
};
