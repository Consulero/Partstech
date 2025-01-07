const { makePartsTechGetRequest } = require('../utils/ps-axios');

module.exports = {
  async findCategories(req, res) {
    try {
      const result = await makePartsTechGetRequest('/taxonomy/categories');
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async findSubCategories(req, res) {
    try {
      const { category } = req.query;
      const categoryId = Number(category);
      const result = await makePartsTechGetRequest(`/taxonomy/subcategories?category=${categoryId}`);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async findPartsTypes(req, res) {
    try {
      const { category, subcategory } = req.query;
      const categoryId = Number(category);
      const subcategoryId = Number(subcategory);
      const result = await makePartsTechGetRequest(`/taxonomy/part-types?category=${categoryId}&subcategory=${subcategoryId}`);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async findPartsType(req, res) {
    try {
      const { partype } = req.query;
      const partypeId = Number(partype);
      const result = await makePartsTechGetRequest(`/taxonomy/part-types/${partypeId}`);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
