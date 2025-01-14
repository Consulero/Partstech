module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ptUserId: {
        type: Sequelize.STRING,
      },
      ptUserKey: {
        type: Sequelize.TEXT,
      },
      ptPartnerId: {
        type: Sequelize.STRING,
      },
      ptPartnerKey: {
        type: Sequelize.TEXT,
      },
      refreshToken: {
        type: Sequelize.TEXT,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
    }
  );

  return User;
};
