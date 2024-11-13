const pool = require('../../db');
const { ApiError } = require('../utils/response');

async function getAllStudent() {
    try {
        const data = await pool.query('select * from study_buds.student')
        return data.rows;
    } catch (e) {
        console.log(`Failed to get all students information error: ${e}`);
        throw new DbException();
    }
}


async function getStudentById(id) {
    try {
        const data = await pool.query('select * from study_buds.student where student_id = $1', [id])
        if (data.rowCount == 0)
            throw new ApiError({code:notFoundErrorCode});
        return data.rows[0];
    } catch (e) {
        console.log(`Failed to get student information, id: ${id}, error: ${e}`);
        throw new ApiError({code:internalServerErrorCode});
    }
}


module.exports = {
    getAllStudent,
    getStudentById
}