const db = require('../config/db');
const User = db.user;
const { Op } = require('sequelize');

module.exports = {
  async findAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const archived = req.query.archived === 'true';
      const whereCondition = { archived: archived };
      const totalItems = await User.count({ where: whereCondition });

      const data = await User.findAll({ where: whereCondition, offset: offset, limit: limit, order: [['createdAt', 'DESC']] });
      res.status(200).json({
        data: data,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalItems / limit),
          totalItems: totalItems,
        },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async create(req, res) {
    try {
      const { name } = req.body.data;
      const data = await User.create({
        name,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
