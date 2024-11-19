import { Request, Response } from 'express';
import StudentService from '../service/student_service';

export const getAllStudents = async (req: Request, res: Response): Promise<void> => {
    try {
        const students = await StudentService.getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        console.error('Error in getAllStudents:', error);
        res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
    }
};

export const getStudent = async (req: Request, res: Response): Promise<void> => {
    try {
        const studentId = parseInt(req.params.id, 10);
        if (isNaN(studentId)) {
            res.status(400).json({ message: 'Invalid student ID' });
            return;
        }

        const student = await StudentService.getStudentById(studentId);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }

        res.status(200).json(student);
    } catch (error) {
        console.error('Error in getStudent:', error);
        res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
    }
};
