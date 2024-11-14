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
        // await getStudentById(req.params.id);
        console.log(result);
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(err.status || 500);
        res.send(err.message || 'Internal server error');
    }
};
