const axios = require('axios');

async function updateAccessAndRefreshToken() {
  try {
    const result = await axios.post(`${process.env.PARTSTECH_BASE_URL}/oauth/access`, {
      accessType: 'user',
      credentials: {
        user: {
          id: process.env.PARTSTECH_USER_ID,
          key: process.env.PARTSTECH_USER_API_KEY,
        },
        partner: {
          id: process.env.PARTSTECH_PARTNER_ID,
          key: process.env.PARTSTECH_PARTNER_API_KEY,
        },
      },
    });
    process.env.PARTSTECH_ACCESS_TOKEN = result.data.accessToken;
    process.env.PARTSTECH_REFRESH_TOKEN = result.data.refreshToken;

    // console.log('Access Token:\n\n', process.env.PARTSTECH_ACCESS_TOKEN,"\n\n");

    console.info('Generating Access and Refresh Token!!!');
  } catch (e) {
    throw {
      details: error.response?.data || error.message,
      statusCode: error.response?.status || 500,
    };
  }
}

module.exports = {
  async refreshAccessToken() {
    try {
      const data = { refreshToken: process.env.PARTSTECH_REFRESH_TOKEN };
      const result = await axios.post(`${process.env.PARTSTECH_BASE_URL}/oauth/refresh`, data);
      process.env.PARTSTECH_ACCESS_TOKEN = result.data.accessToken;
      process.env.PARTSTECH_REFRESH_TOKEN = result.data.refreshToken;
      console.info('Updating Access and Refresh Token!!!');
    } catch (error) {
      if (error.response?.data?.error?.code === 'InvalidToken' && error.response?.status === 401) {
        await updateAccessAndRefreshToken();
      } else {
        throw {
          details: error.response?.data || error.message,
          statusCode: error.response?.status || 500,
        };
      }
    }
  },
};
