const pool = require('../../db');
const { ApiError } = require('../utils/response');

async function getCustomersAllNotification(customerId) {
    try {
        const data = await pool.query('select * from study_buds.notification where student_id=$1',[customerId])
        return data.rows;
    } catch (e) {
        console.log(`Failed to get customers notification error: ${e}`);
        throw new ApiError({code:internalServerErrorCode});
    }
}

module.exports = {
    getCustomersAllNotification
}