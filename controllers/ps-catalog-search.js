const { makePartsTechPostRequest } = require('../utils/ps-axios');

module.exports = {
  async searchByVehicleAndKeyword(req, res) {
    try {
      const { vehicleParams, engineParams, keyword } = req.body.data;
      const requestData = {
        searchParams: {
          vehicleParams,
          engineParams,
        },
        keyword,
      };

      const result = await makePartsTechPostRequest('/catalog/search', requestData, req.headers.ps_access_token);

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search by vehicle and keyword', message: error.response?.data || error.message });
    }
  },

  async searchByVehicleAndPartType(req, res) {
    try {
      const { vehicleParams, engineParams, partTypeIds } = req.body.data;
      const requestData = {
        searchParams: {
          vehicleParams,
          engineParams,
        },
        partTypeIds,
      };

      const result = await makePartsTechPostRequest('/catalog/search', requestData, req.headers.ps_access_token);

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search by vehicle and part type', message: error.response?.data || error.message });
    }
  },

  async searchByVinAndKeyword(req, res) {
    try {
      const { vin, keyword, filters } = req.body.data;
      const requestData = {
        searchParams: {
          vin,
          keyword,
        },
        filters,
      };

      const result = await makePartsTechPostRequest('/catalog/search', requestData, req.headers.ps_access_token);

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search by VIN and keyword', message: error.response?.data || error.message });
    }
  },

  async searchByVinAndPartType(req, res) {
    try {
      const { vin, partTypeIds } = req.body.data;
      const requestData = {
        searchParams: {
          vin,
          partTypeIds,
        },
      };

      const result = await makePartsTechPostRequest('/catalog/search', requestData, req.headers.ps_access_token);

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search by VIN and part type', message: error.response?.data || error.message });
    }
  },
};
