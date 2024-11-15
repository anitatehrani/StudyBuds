import Student from '../models/Student';
import { getCurrentMemberList } from '../service/group_member';
import { getGroupById } from '../service/group_service';
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

export const joinTheGroup = async (req,res)=>{
    try {
        const { studentId, groupId } = req.body
        const student = await getStudentById(studentId)
        if (student)
            // Todo notFound exception
            console.log('')
        if (student.telegramAccount)
            // Todo throw validatiopn error
            console.log('')
        const group = await getGroupById(groupId)
        if (group)
            // Todo throw NotFound error
            console.log('')
        const result = await getCurrentMemberList(groupId)
        // console.log(result);
        res.status(200).send('')
    } catch (err) {
        console.log(err)
        res.status(err.status || 500);
        res.send(err.message || 'Internal server error');
    }
};
