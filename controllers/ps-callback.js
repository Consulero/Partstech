const db = require('../config/db');
const { validatePo } = require('./po');
const { validateQuotationReq } = require('./validateData');

module.exports = {
  async submitQuote(req, res) {
    try {
      // console.log("=======>", req.body)
      const data = req.body;
      if (!data) { console.error('Error: unable to get quotation data from partstech'); return; }

      const { status, type } = await validateQuotationReq(data)
      if (!status) { console.error('Error: can not include parts and tire in a single quote on partstech'); return; }

      const poNumber = data.orders[0]?.poNumber;
      const isExistPo = await validatePo(poNumber)
      if (isExistPo) { console.error('Error: requested quote has existing po number'); return; }

      const poLastNumber = poNumber.slice(-4);
      const payload = {
        sessionId: data.sessionId,
        redirectUrl: '',
        orders: data,
        action: data.action,
        status: 'pending',
        orderType: type,
        poNumber: poNumber,
        poLastNumber: parseInt(poLastNumber, 10),
      };
      
      await db.Quotation.create(payload);

      return res.status(200);
    } catch (error) {
      console.error(`Submit Quote error: ${error.response?.data || error.message}`);
    }
  },

  async saveOrder(req, res) {
    try {
      const data = req.body;
      console.log('data=', data);
    } catch (error) {
      console.error(`Submit Quote error: ${error.response?.data || error.message}`);
    }
  },
};
