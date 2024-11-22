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

export const editTelegramIdService = async (studentId: number, new_telegram_id: number) => {
    // Fetch the student by their primary key
    const student = await Student.findByPk(studentId);

    // Handle case where student does not exist
    if (!student) {
        throw new Error(`Student with ID ${studentId} not found`);
    }

    // Update the `telegramAccount` field with the new value
    student.telegramAccount = new_telegram_id;

    // Save the changes to the database
    await student.save();

    // Return the updated student object
    return student;
};



export default {
    getAllStudents,
    getStudentById,
    editTelegramIdService
};
