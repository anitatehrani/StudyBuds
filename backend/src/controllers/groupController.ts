import { Request, Response } from 'express';
import Group from '../models/Group';
import Student from '../models/Student';
import GroupService from '../service/group_service';

// Function to create a group
export const createGroup = async (req: Request, res: Response): Promise<void> => {
    try {
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
    } catch (error) {
        console.error('Error in createGroup:', error);
        res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
    }
};

// Function to get all groups
export const getAllGroups = async (req: Request, res: Response): Promise<void> => {
    try {
        const groups = await Group.findAll();
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
    }
};

export const basicSearchResult = async (req,res)=>{
    try {
        const result = await GroupService.basicSearch(req.params.text, req.params.student_id);
        res.status(200).send({
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(err.status || 500);
        res.send(err.message || 'Internal server error');
    }
};


export default {
    createGroup,
    getAllGroups,
};
