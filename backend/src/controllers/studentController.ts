import Student from '../models/Student';
import { getStudentById } from '../service/student_service';

export const getAllStudents = async (req,res)=>{
    try {
        const result = await Student.findAll()
        res.status(200).send(
            result
        )
    } catch (err) {
        console.log(err)
        res.status(err.status || 500);
        res.send(err.message || 'Internal server error');
    }
};

export const getStudent = async (req,res)=>{
    try {
        const result = await getStudentById(req.params.id)
        console.log(result);
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(err.status || 500);
        res.send(err.message || 'Internal server error');
    }
};

// export const joinTheGroup = async (req,res, next: NextFunction)=>{
//     try {
//         const { studentId, groupId } = req.body
//         const student = await getStudentById(studentId)
//         if (student) {
//             console.log('student not found')
//             return next(new NotFoundError('Student not found'))
//         }
//         if (student.telegramAccount) {
//             console.log('Student does not link telegram account')
//             return next(new ValidationError('You should connect telegram account'))
//         }
//         const group = await getGroupById(groupId)
//         if (group) {
//             console.log('Could not find group information')
//             return next(new NotFoundError('Group not found'))
//         }
//         const result = await getCurrentMemberList(groupId)
//         // console.log(result);
//         res.status(200).send('')
//     } catch (err) {
//         console.log(err)
//         res.status(err.status || 500);
//         res.send(err.message || 'Internal server error');
//     }
// };
