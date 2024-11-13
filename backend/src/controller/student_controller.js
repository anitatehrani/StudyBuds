const { getAllStudent, getStudentById } = require('../service/student_service')

const getAllStudents = async (req,res)=>{
    try {
        const result = await getAllStudent();
        console.log(result);
        res.status(200).send({
            data: result
        })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
};

const getStudent = async (req,res)=>{
    try {
        const result = await getStudentById(req.params.id);
        console.log(result);
        res.status(200).send({
            data: result
        })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
};

module.exports = {
    getAllStudents,
    getStudent
}
