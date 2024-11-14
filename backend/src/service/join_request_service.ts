import { pool } from 'pg';
import { ApiError, errorCodes } from '../utils/response';

async function getJoinRequest(id) {
    try {
        const data = await pool.query('select * from study_buds.joinRequest where join_request_id=$1',[id])
        return data.rows;
    } catch (e) {
        console.log(`Failed to get join request error: ${e}`);
        throw new ApiError({code: errorCodes.internalServerErrorCode});
    }
}