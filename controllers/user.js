const db = require('../config/db');

module.exports = {
  async getUser(req, res) {
    try {
      const data = await db.User.findAll({ limit: 1 });
      res.status(200).json(data[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
