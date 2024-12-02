import { Request, Response } from "express";
import Group from "../models/Group";
import Student from "../models/Student";
import GroupService from "../service/group_service";
import { GroupMock } from "../mockup_data/groups";
import { mockGroups } from "../mockup_data/groups";
import { Op } from 'sequelize';

// Function to create a group
export const createGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        
        res.status(200);
    } catch (error) {
        console.error("Error in createGroup:", error);
        res.status(500).json({ message: "An error occurred", error: (error as Error).message });
    }
};

export const basicSearchResult = async (req, res) => {
    try {
        console.log("Using mock data");
        await mockGroups();
        const mockGroup = await GroupMock.findOne({ where: {  [Op.like]: `%${req.params.text}%` } });
        res.status(200).json(mockGroup);
        } 
        catch (err) {
            console.error("Error in basicSearchResult:", err);
            res.status(err.status || 500).send(err.message || "Internal server error");
        }
    // try {
    //         console.log("Using mock data");
    //         const SequelizeMock = require("sequelize-mock");
    //         const dbMock = new SequelizeMock();

    //         // const GroupMock = dbMock.define("Group", {
    //         //     name: "Group A",
    //         //     course: "CSE",
    //         //     description: "This is a group for CSE students",
    //         //     members: 5,
    //         //     isPublic: true,
    //         // });

    //         const GroupMock = dbMock.define("Group", {
    //             name: "Group A",
    //             course: "CSE",
    //             description: "This is a group for CSE students",
    //             members: 5,
    //             isPublic: true,
    //         });
    //         const GroupMock2 = dbMock.define("Group", {
    //             name: "Group B",
    //             course: "ECE",
    //             description: "This is a group for ECE students",
    //             members: 10,
    //             isPublic: false,
    //         });
 
    //         const GroupMock3 = dbMock.define("Group", {
    //             name: "Group C",
    //             course: "ME",
    //             description: "This is a group for ME students",
    //             members: 8,
    //             isPublic: true,
    //         });
 
    //         await GroupMock3.bulkCreate([
    //             { name: "Group A", course: "CSE", description: "This is a group for CSE students", members: 5, isPublic: true },
    //             { name: "Group B", course: "ECE", description: "This is a group for ECE students", members: 10, isPublic: false },
    //             { name: "Group C", course: "ME", description: "This is a group for ME students", members: 8, isPublic: true },
    //         ]);

    //         const mockGroup = await GroupMock.findOne({ where: { name: "Group A" } });
    //         res.status(200).json(mockGroup);
    // } catch (err) {
    //     console.log(err);
    //     res.status(err.status || 500);
    //     res.send(err.message || "Internal server error");
    // }
};

// Function to get all groups
export const getAllGroups = async (req: Request, res: Response): Promise<void> => {
    try {
        
        res.status(200);
    } catch (error) {
        console.error("Error fetching groups:", error);
        res.status(500).json({ message: "An error occurred", error: (error as Error).message });
    }
};


export default {
    createGroup,
    getAllGroups,
};