const { Router} =  require('express');
const router = Router();

const { getAllStudents, getStudent } = require('../controller/student_controller');

router.get('/',getAllStudents);
router.get('/:id', getStudent);

module.exports = router;