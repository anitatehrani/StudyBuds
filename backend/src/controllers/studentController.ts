import { getAllStudent, getStudentById } from '../service/student_service';

export const getAllStudents = async (req,res)=>{
    try {
        const result = await getAllStudent();
        res.status(200).send({
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(err.status || 500);
        res.send(err.message || 'Internal server error');
    }
};

export const getStudent = async (req,res)=>{
    try {
        const result = await getStudentById(req.params.id);
        console.log(result);
        res.status(200).send({
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(err.status || 500);
        res.send(err.message || 'Internal server error');
    }
};
