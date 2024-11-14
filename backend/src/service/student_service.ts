import { pool } from 'pg';
import { ApiError, errorCodes } from '../utils/response';

export async function getAllStudent() {
    try {
        const data = await pool.query('select * from studybuds.student')
        return data.rows;
    } catch (e) {
        console.log(`Failed to get all students information error: ${e}`);
        throw new ApiError({code: errorCodes.internalServerErrorCode});
    }
}


export async function getStudentById(id) {
    try {
        const data = await pool.query('select * from studybuds.student where student_id = $1', [id])
        if (data.rowCount == 0)
            throw new ApiError({code:errorCodes.notFoundErrorCode});
        return data.rows[0];
    } catch (e) {
        if (e instanceof ApiError)
            throw e;
        console.log(`Failed to get student information, id: ${id}, error: ${e}`);
        throw new ApiError({code:errorCodes.internalServerErrorCode});
    }
}
