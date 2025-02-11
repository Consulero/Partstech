module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define(
        'Inventory',
        {
            inventoryUID: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            partNumber: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            brandId: {
                type: Sequelize.STRING,

            },
            lineCode: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            partDescription: {
                type: Sequelize.STRING,

            },
            supplierId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            supplierUID: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            supplierName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            categoryUID: {
                type: Sequelize.STRING,

            },
            categoryName: {
                type: Sequelize.STRING,

            },
            onHand: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            partPrice: {
                type: Sequelize.FLOAT,
                allowNull: false,
                defaultValue: 0,
            },
            partCost: {
                type: Sequelize.FLOAT,
                allowNull: false,
                defaultValue: 0,
            },
            type: {
                type: Sequelize.STRING, //parts or tires
                allowNull: false,
            },
        },
        {
            tableName: 'inventory',
            timestamps: true,
        }
    );

    return Inventory;
};
