const { makePartsTechGetRequest } = require('../utils/ps-axios');

module.exports = {
  async findYears(req, res) {
    try {
      const result = await makePartsTechGetRequest('/taxonomy/vehicles/years');
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async findMakes(req, res) {
    try {
      const { year } = req.query;
      const yearId = Number(year);
      const result = await makePartsTechGetRequest(`/taxonomy/vehicles/makes?year=${yearId}`);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async findModels(req, res) {
    try {
      const { make, year } = req.query;
      const makeId = Number(make);
      const yearId = Number(year);
      const result = await makePartsTechGetRequest(`/taxonomy/vehicles/models?year=${yearId}&make=${makeId}`);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async findSubmodels(req, res) {
    try {
      const { model, make, year } = req.query;
      const modelId = Number(model);
      const makeId = Number(make);
      const yearId = Number(year);
      const result = await makePartsTechGetRequest(`/taxonomy/vehicles/submodels?year=${yearId}&make=${makeId}&model=${modelId}`);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async findEngines(req, res) {
    try {
      const { model, make, year, submodel } = req.query;
      const modelId = Number(model);
      const makeId = Number(make);
      const yearId = Number(year);
      const submodelId = Number(submodel);
      const result = await makePartsTechGetRequest(`/taxonomy/vehicles/engines?year=${yearId}&make=${makeId}&model=${modelId}&submodel=${submodelId}`);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async findVehicleByVin(req, res) {
    try {
      const { vin } = req.query;
      const result = await makePartsTechGetRequest(`/taxonomy/vehicles/vin/${vin}`);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async findVehicleByDetail(req, res) {
    try {
      const { model, make, year, submodel, engine } = req.query;
      const modelId = Number(model);
      const makeId = Number(make);
      const yearId = Number(year);
      const submodelId = Number(submodel);
      const result = await makePartsTechGetRequest(`/taxonomy/vehicles?year=${yearId}&make=${makeId}&model=${modelId}&submodel=${submodelId}&engine=${engine}`);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
