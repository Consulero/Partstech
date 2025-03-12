const db = require('../config/db');

module.exports = {
    async upsertInventoryItems(invPart, recievedItem) {
        try {
            // checking if the quantity for same brand, category, subcategory and partid exists
            const isExistPart = await db.Inventory.findOne({
                where: {
                    brandUid: invPart.brand.id,
                    taxonomyCategoryId: invPart.taxonomy.categoryId,
                    taxonomySubCategoryId: invPart.taxonomy.subCategoryId,
                    partNumber: invPart.partNumber,
                    partId: invPart.partId,
                }
            });

            if (isExistPart) {
             
                const qty = recievedItem + isExistPart.dataValues.quantity;
                const updatedPart = await db.Inventory.update({ quantity: qty }, { where: { id: isExistPart.dataValues.id } })
                return updatedPart

            } else {
                const partsData = {
                    brandUid: invPart.brand.id,
                    brandId: invPart.brand.brandID,
                    brandName: invPart.brand.brandName,
                    brandDisplayName: invPart.brand.displayName,
                    priceFet: invPart.price.fet,
                    priceMap: invPart.price.map || 0,
                    priceCore: invPart.price.core,
                    priceCost: invPart.price.cost,
                    priceList: invPart.price.list || 0,
                    pricePrice: invPart.price.price,
                    priceRetail: invPart.price.retail,
                    priceDiscount: invPart.price.discount,
                    partId: invPart.partId,
                    imageUrl: invPart.imageUrl,
                    partName: invPart.partName,
                    taxonomyCategoryId: invPart.taxonomy.categoryId,
                    taxonomyPartTypeId: invPart.taxonomy.partTypeId,
                    taxonomyCategoryName: invPart.taxonomy.categoryName,
                    taxonomyPartTypeName: invPart.taxonomy.partTypeName,
                    taxonomySubCategoryId: invPart.taxonomy.subCategoryId,
                    taxonomySubCategoryName: invPart.taxonomy.subCategoryName,
                    taxonomyPartTypeDescription: invPart.taxonomy.partTypeDescription,
                    partNumber: invPart.partNumber,
                    partCategory: invPart.partCategory,
                    quantity: recievedItem
                };
                const parts = await db.Inventory.create(partsData);
                return parts;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}