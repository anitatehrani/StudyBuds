import { Request, Response } from 'express';
import StudentService from '../service/student_service';
import { validateInt } from '../utils/validation_error';
import { NotFoundError } from '../utils/api_error';

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
    const studentId = validateInt(req.params, "id");


    const student = await StudentService.getStudentById(studentId);
    if (student === null) {
        throw new NotFoundError('Student not found');
    }
    res.json(student);
};

export const editTelegramId = async (req: Request, res: Response): Promise<void> => {
    const studentId = validateInt(req.params, "id");
    const telegramId = validateInt(req.params, "telegram_id");
    const student = await StudentService.editTelegramIdService(studentId, telegramId);
    res.json(student);
};


