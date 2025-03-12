const { all } = require("axios");

module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define(
        'Inventory',
        {
            brandUid: {
                type: Sequelize.INTEGER,
            },
            brandId: {
                type: Sequelize.STRING,
            },
            brandName: {
                type: Sequelize.STRING,
            },
            brandDisplayName: {
                type: Sequelize.STRING,
            },
            priceFet: {
                type: Sequelize.FLOAT,
                defaultValue: 0,
            },
            priceMap: {
                type: Sequelize.FLOAT,
                defaultValue: 0,
            },
            priceCore: {
                type: Sequelize.FLOAT,
                defaultValue: 0,
            },
            priceCost: {
                type: Sequelize.FLOAT,
            },
            priceList: {
                type: Sequelize.FLOAT,
                defaultValue: 0,
            },
            pricePrice: {
                type: Sequelize.FLOAT,
            },
            priceRetail: {
                type: Sequelize.FLOAT,
            },
            priceDiscount: {
                type: Sequelize.FLOAT,
                defaultValue: 0,
            },
            partId: {
                type: Sequelize.STRING,
            },
            imageUrl: {
                type: Sequelize.TEXT,
            },
            partName: {
                type: Sequelize.STRING,
            },
            taxonomyCategoryId: {
                type: Sequelize.INTEGER,
            },
            taxonomyPartTypeId: {
                type: Sequelize.INTEGER,
            },
            taxonomyCategoryName: {
                type: Sequelize.STRING,
            },
            taxonomyPartTypeName: {
                type: Sequelize.STRING,
            },
            taxonomySubCategoryId: {
                type: Sequelize.INTEGER,
            },
            taxonomySubCategoryName: {
                type: Sequelize.STRING,
            },
            taxonomyPartTypeDescription: {
                type: Sequelize.TEXT,
            },
            partNumber: {
                type: Sequelize.STRING,
            },
            partCategory: {
                type: Sequelize.STRING,
            },
            quantity: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
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
