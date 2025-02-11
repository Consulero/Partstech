require('dotenv').config();
const db = require('../config/db');

module.exports = {
  async findAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const whereCondition = {};
      const totalItems = await db.Inventory.count({ where: whereCondition });

      const data = await db.Inventory.findAll({
        where: whereCondition,
        offset: offset,
        limit: limit,
        order: [['id', 'DESC']],
      });
      res.status(200).json({
        data: data,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalItems / limit),
          totalItems: totalItems,
        },
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json(error);
    }
  },
}