const db = require('../config/db');

module.exports = {
  async submitQuote(req, res) {
    try {
      const data = req.body;
      if (!req.body) {
        console.error('Unable to get submitQuote data');
        return;
      }

      const poNumber = data.orders[0]?.poNumber;
      const poLastNumber = poNumber.slice(-4);
      const payload = {
        sessionId: data.sessionId,
        redirectUrl: '',
        orders: JSON.stringify(data),
        action: data.action,
        status: 'pending',
        poNumber: poNumber,
        poLastNumber: parseInt(poLastNumber, 10),
      };
      await db.Quotation.create(payload);
      return;
    } catch (error) {
      console.error(`Submit Quote error: ${error.response?.data || error.message}`);
    }
  },
};
