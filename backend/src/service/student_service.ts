import Student from '../models/Student';

export const getAllStudents = async () => {
    return await Student.findAll({
        attributes: ['studentId', 'telegramAccount'],
    });
};

export const getStudentById = async (studentId: number) => {
    return await Student.findByPk(studentId, {
        attributes: ['studentId', 'telegramAccount'],
    });
};

export default {
    getAllStudents,
    getStudentById,
};
