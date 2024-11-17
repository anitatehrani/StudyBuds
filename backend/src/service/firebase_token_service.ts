import FbToken from '../models/FbToken';

export async function saveFbToken(studentId, token) {
    const result = await FbToken.create({
        studentId: studentId,
        token: token
    })
    return result;
}

export async function getStudentFirebaseToken(studentId) {
    return await FbToken.findOne({
        where:{
            studentId: studentId
        }
    });
}