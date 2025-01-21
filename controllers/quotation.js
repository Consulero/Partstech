require('dotenv').config();
const db = require('../config/db');
const { makePartsTechPostRequest } = require('../utils/ps-axios');
const { generatePo } = require('../services/po');
const { Op } = require('sequelize');

module.exports = {
  async findAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const whereCondition = {};
      const totalItems = await db.Quotation.count({ where: whereCondition });

      const data = await db.Quotation.findAll({
        where: whereCondition,
        offset: offset,
        limit: limit,
        order: [['createdAt', 'DESC']],
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
      res.status(500).json(error);
    }
  },

  async reqQuote(req, res) {
    try {
      const { vehicleInfo, partTypeIds } = req.body.data;
      //todo : get the partTypeIds from ui
      const lastPoInfo = await db.Quotation.findOne({
        attributes: ['createdAt', 'poLastNumber'],
        order: [['id', 'DESC']],
      });

      const poNumber = await generatePo(lastPoInfo);

      const result = await makePartsTechPostRequest(`/punchout/quote/create`, {
        searchParams: { vehicleParams: vehicleInfo, partTypeIds: [5132, 10328] },
        urls: { callbackUrl: `${process.env.PS_CALLBACK_URL}/quote`, returnUrl: `${process.env.PS_REDIRECT_URL}/quotations` },
        settings: { poNumber: poNumber },
      });

      res.status(200).json(result);
    } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json(error);
    }
  },

  async updateQuoteStatus(req, res) {
    try {
      const { ids, status } = req.body;
      const result = await db.Quotation.update(
        { status: status },
        {
          where: {
            id: {
              [Op.in]: ids,
            },
          },
        }
      );

      res.status(200).json(result);
    } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json(error);
    }
  },
};
