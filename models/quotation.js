module.exports = (sequelize, Sequelize) => {
  const Quotation = sequelize.define(
    'Quotation',
    {
      sessionId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      redirectUrl: {
        type: Sequelize.TEXT,
      },
      orders: {
        type: Sequelize.JSON,
      },
      action: {
        type: Sequelize.STRING,
      },
      poNumber: {
        type: Sequelize.STRING,
      },
      poLastNumber: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      isOrderPlaced: {
        type: Sequelize.BOOLEAN,
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
