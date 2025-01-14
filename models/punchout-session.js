module.exports = (sequelize, Sequelize) => {
  const PunchoutSession = sequelize.define(
    'PunchoutSession',
    {
      sessionId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      redirectUrl: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      vehicleParams: {
        type: Sequelize.JSON,
        allowNull: false,
      },
    },
    {
      tableName: 'punchout_sessions',
      timestamps: true,
    }
  );

  return PunchoutSession;
};
