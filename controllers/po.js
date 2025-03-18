const moment = require('moment');
const db = require('../config/db');

module.exports = {
  async generatePo(poInfo) {
    try {
      const managerName = 'SM'; // todo: get from login user
      const poLastNumber = poInfo?.dataValues?.poLastNumber || 0;
      const poLastDate = poInfo?.dataValues?.createdAt ? moment(poInfo.dataValues.createdAt).format('YYYY-MM-DD') : null;

      const todayDate = moment().format('YYYY-MM-DD');

      const nextPoNumber = poLastDate === todayDate ? poLastNumber + 1 : 1;

      const paddedPoNumber = String(nextPoNumber).padStart(4, '0');

      const poNumber = `${moment(todayDate).format('YYYYMMDD')}${managerName}${paddedPoNumber}`;

      return poNumber;
    } catch (error) {
      console.error(`Generate PO error: ${error.response?.data || error.message}`);
    }
  },

  async validatePo(poNumber) {
    const data = await db.Quotation.findOne({ where: { poNumber: poNumber } });
    return data ? true : false
  }
};
