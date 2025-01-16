module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
    }
  );

  return User;
};
