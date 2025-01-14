const axios = require('axios');
require('dotenv').config();
const { refreshAccessToken } = require('./token');

const PARTSTECH_BASE_URL = process.env.PARTSTECH_BASE_URL;

async function makePartsTechRequest(method, endpoint, data = null) {
  try {
    const response = await axios({
      method,
      url: `${PARTSTECH_BASE_URL}${endpoint}`,
      data,
      headers: {
        Authorization: `Bearer ${process.env.PARTSTECH_ACCESS_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.error?.code === 'InvalidToken' && error.response?.status === 401) {
      await refreshAccessToken();

      const retryResponse = await axios({
        method,
        url: `${PARTSTECH_BASE_URL}${endpoint}`,
        data,
        headers: {
          Authorization: `Bearer ${process.env.PARTSTECH_ACCESS_TOKEN}`,
        },
      });
      return retryResponse.data;
    } else {
      console.error('PartsTech API Error:', error.response?.data || error.message);
      throw {
        message: `PartsTech ${method.toUpperCase()} API request failed`,
        details: error.response?.data || error.message,
        statusCode: error.response?.status || 500,
      };
    }
  }
}

module.exports = {
  async makePartsTechPostRequest(endpoint, data) {
    return makePartsTechRequest('post', endpoint, data);
  },

  async makePartsTechGetRequest(endpoint) {
    return makePartsTechRequest('get', endpoint);
  },
};
