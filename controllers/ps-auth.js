const axios = require('axios');

module.exports = {
  async generateAccessToken(req, res) {
    try {
      const { data } = req.body;

      const payload = {
        accessType: 'user',
        credentials: {
          user: {
            id: data.ptUserId,
            key: data.ptUserKey,
          },
          partner: {
            id: data.ptPartnerId,
            key: data.ptPartnerKey,
          },
        },
      };

      const result = await axios.post(`${process.env.PARTSTECH_BASE_URL}/oauth/access`, payload);

      res.status(200).json(result.data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async refreshAccessToken(req, res) {
    try {
      const { refreshToken } = req.body;

      const result = await axios.post(`${process.env.PARTSTECH_BASE_URL}/oauth/refresh`, refreshToken);

      res.status(200).json(result.data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
