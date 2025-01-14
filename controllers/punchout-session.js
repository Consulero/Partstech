const db = require('../config/db');
const { Op } = require('sequelize');
const { makePartsTechPostRequest } = require('../utils/ps-axios');

module.exports = {
  async findAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const whereCondition = {};
      const totalItems = await db.PunchoutSession.count({ where: whereCondition });

      const data = await db.PunchoutSession.findAll({
        where: whereCondition,
        include: [
          {
            model: db.PartType,
            as: 'partTypes',
          },
        ],
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

  async create(req, res) {
    try {
      const { partTypeIds } = req.body.data;
      console.log(partTypeIds);
      // const data = await PunchoutSession.create({});
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async createPunchoutSessionWithPartTypes(req, res) {
    try {
      const punchoutSessionData = {
        sessionId: 'ABC123',
        userId: 1,
        redirectUrl: 'https://example.com',
        vehicleParams: { make: 'Tesla', model: 'Model 3' },
        partTypes: [{ partTypeId: 101 }, { partTypeId: 102 }, { partTypeId: 103 }],
      };

      const data = await db.PunchoutSession.create(punchoutSessionData, {
        include: [{ model: db.PartType, as: 'partTypes' }],
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async findPunchoutSessionWithPartTypes(req, res) {
    try {
      const data = await db.PunchoutSession.findOne({
        where: { id: 1 }, // Example ID
        include: [
          {
            model: db.PartType,
            as: 'partTypes', // Alias used in association
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async reqQuotes(req, res) {
    try {
      const { vehicleInfo, partTypeIds } = req.body.data;
      // get from ui
      const result = await makePartsTechPostRequest(`/punchout/quote/create`, { searchParams: { vehicleParams: vehicleInfo, partTypeIds: [5132, 10328] } });
      console.log(result);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
