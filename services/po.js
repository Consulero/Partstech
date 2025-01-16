const moment = require('moment');

module.exports = {
  async generatePo(poInfo) {
    try {
      const poLastNumber = poInfo?.dataValues?.poLastNumber || 1;
      const poLastDate = poInfo?.dataValues?.poLastDate ? moment(poInfo.dataValues.poLastDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');

      const todayDate = moment().format('YYYY-MM-DD');

      const nextPoNumber = moment(todayDate).isAfter(poLastDate) ? 1 : poLastNumber + 1;

      const paddedPoNumber = String(nextPoNumber).padStart(5, '0');

      const hubName = 'HUB_NAME';
      const poNumber = `${hubName}_${todayDate}_${paddedPoNumber}`;

      return poNumber;
    } catch (error) {
      console.error(`Generate po error: ${error.response?.data || error.message}`);
    }
  },
};
