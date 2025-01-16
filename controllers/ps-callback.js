module.exports = {
  async submitQuote(req, res) {
    try {
      console.log('SUBMIT Data ==>', req.body);
    } catch (error) {
      console.log(error);
    }
  },
};
