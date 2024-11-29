import { Request, Response } from 'express';
import Group from '../models/Group';
import Student from '../models/Student';
import GroupService from '../service/group_service';

// Function to create a group
export async function createGroup(req: Request, res: Response): Promise<void> {
    const { name, description, course, isPublic, membersLimit, telegramLink, studentId } = req.body;

    // Validate if the student exists
    const student = await Student.findByPk(studentId);
    if (!student) {
        res.status(404).json({ message: 'Student not found' });
        return;
    }


    // Check if the telegramLink already exists
    const existingGroup = await Group.findOne({ where: { telegramLink } });
    if (existingGroup) {
        res.status(400).json({ message: "This Telegram link already exists" });
        return;
    }

    // Create the group using GroupService
    const group = await GroupService.createGroup({
        name,
        description,
        course,
        isPublic,
        membersLimit,
        telegramLink,
        adminId: studentId, // Maps studentId to adminId
    });

    res.status(201).json({ message: 'Group created successfully', group });
};

// Function to get all groups
export async function getAllGroups(req: Request, res: Response): Promise<void> {
    const groups = await Group.findAll();
    res.json(groups);
};

export async function basicSearchResult(req:Request,res: Response){
    const result = await GroupService.basicSearch(req.params['text'], req.params['student_id']);
    res.send(
        result
    )
};


export default {
    createGroup,
    getAllGroups,
};
