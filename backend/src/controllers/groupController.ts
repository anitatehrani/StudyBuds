
import { Request, Response } from 'express';
import GroupService from '../service/group_service';
import Student from '../models/Student';

export const createGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, course, isPublic, membersLimit, telegramLink, studentId } = req.body;

        // Step 1: Validate if the student exists
        const student = await Student.findByPk(studentId);
        if (!student) {
            res.status(404).json({ message: "Student not found" });
            return;
        }

        // Step 2: Create the group using the GroupService
        const group = await GroupService.createGroup({
            name,
            description,
            course,
            isPublic,
            membersLimit,
            telegramLink,
            studentId,
        });

        // Respond with the created group
        res.status(201).json({ message: "Group created successfully", group });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred", error: (error as Error).message });
    }
};
