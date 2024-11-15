import FbToken from '../models/FbToken';

// async function getStudentToke(student_id) {
//     try {
//         const data = await pool.query('select * from study_buds.fbToken where student_id=$1',[student_id])
//         return data.rows;
//     } catch (e) {
//         console.log(`Failed to get student's groups request error: ${e}`);
//         throw new ApiError({code: errorCodes.internalServerErrorCode});
//     }
// }

export async function saveFbToken(studentId, token) {
    const result = await FbToken.create({
        studentId: studentId,
        token: token
    })
    return result;
}