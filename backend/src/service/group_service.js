const pool = require('../../db');
const { ApiError } = require('../utils/response');

async function getGroupData(id) {
    try {
        const data = await pool.query('select * from study_buds.studentsGroup where id=$1',[id])
        return data.rows;
    } catch (e) {
        console.log(`Failed to get join request error: ${e}`);
        throw new ApiError({code:internalServerErrorCode});
    }
}

module.exports = {
    getGroupData
}