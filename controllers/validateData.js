module.exports = {

    async validateQuotationReq(data) {

        let isExistPart = false;
        let isExistTire = false;

        outerLoop: for (const order of data.orders) {
            for (const part of order.parts) {
                isExistTire ||= part.hasOwnProperty('tireSize');
                isExistPart ||= !part.hasOwnProperty('tireSize');

                if (isExistPart && isExistTire) break outerLoop;
            }
        }

        return isExistPart && !isExistTire ?
            { status: true, type: "part" } :
            !isExistPart && isExistTire ? { status: true, type: "tire" } : { status: false, type: null };
    }
}