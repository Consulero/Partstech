const axios = require('axios');
const PARTSTECH_BASE_URL = process.env.PARTSTECH_BASE_URL;

module.exports = {
  async makePartsTechPostRequest(endpoint, data, accessToken) {
    try {
      const response = await axios.post(`${PARTSTECH_BASE_URL}${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('PartsTech API Error:', error.response?.data || error.message);
      throw {
        message: 'PartsTech API request failed',
        details: error.response?.data || error.message,
        statusCode: error.response?.status || 500,
      };
    }
  },
};
