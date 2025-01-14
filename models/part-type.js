module.exports = (sequelize, Sequelize) => {
  const PartType = sequelize.define(
    'PartType',
    {
      partTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      punchoutSessionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'punchout_sessions', // Table name of PunchoutSession
          key: 'id', // Primary key of PunchoutSession
        },
        onDelete: 'CASCADE', // Ensures related PartType records are removed
        onUpdate: 'CASCADE',
      },
    },
    {
      tableName: 'part_types',
      timestamps: true,
    }
  );

  return PartType;
};
