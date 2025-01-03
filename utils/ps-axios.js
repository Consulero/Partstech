const axios = require('axios');
const PARTSTECH_BASE_URL = process.env.PARTSTECH_BASE_URL;
require('dotenv').config();

module.exports = {
  async makePartsTechPostRequest(endpoint, data) {
    try {
      const response = await axios.post(`${PARTSTECH_BASE_URL}${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${process.env.PARTSTECH_ACCESS_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('PartsTech API Error:', error.response?.data || error.message);
      throw {
        message: 'PartsTech POST API request failed',
        details: error.response?.data || error.message,
        statusCode: error.response?.status || 500,
      };
    }
  },
  async makePartsTechGetRequest(endpoint) {
    try {
      const response = await axios.get(`${PARTSTECH_BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${process.env.PARTSTECH_ACCESS_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('PartsTech API Error:', error.response?.data || error.message);
      throw {
        message: 'PartsTech GET API request failed',
        details: error.response?.data || error.message,
        statusCode: error.response?.status || 500,
      };
    }
  },
};
