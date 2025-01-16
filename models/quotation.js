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
        allowNull: false,
      },
    },
    {
      tableName: 'quotations',
      timestamps: true,
    }
  );

  return Quotation;
};
