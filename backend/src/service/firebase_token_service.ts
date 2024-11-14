import { pool } from 'pg';
import { ApiError, errorCodes } from '../utils/response';

async function getStudentToke(student_id) {
    try {
        const data = await pool.query('select * from study_buds.fbToken where student_id=$1',[student_id])
        return data.rows;
    } catch (e) {
        console.log(`Failed to get student's groups request error: ${e}`);
        throw new ApiError({code: errorCodes.internalServerErrorCode});
    }
}
