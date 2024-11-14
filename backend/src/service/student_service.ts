import Student from '../models/Student';


export async function getStudentById(id) {
    const data = await Student.findOne(
        {
            where: {
                studentId: id
            }
        }
    )
    return data ? data.get() : null;
}
