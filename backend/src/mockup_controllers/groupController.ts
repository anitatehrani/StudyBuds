import { Request, Response } from "express";
import { findAllGroups, findGroupsByNameContains } from "../mockup_data/index";

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
        console.log(req.params.text);
        const groups = await findGroupsByNameContains(req.params.text);
        const resJson = groups.map((group) => group.dataValues);
        res.status(200).json(resJson);
    } catch (err) {
        console.error("Error in basicSearchResult:", err);
        res.status(err.status || 500).send(err.message || "Internal server error");
    }
};

// Function to get all groups
export const getAllGroups = async (req: Request, res: Response): Promise<void> => {
    try {
        const groups = await findAllGroups();
        const resJson = groups.map((group) => group.dataValues);
        res.status(200).json(resJson);
    } catch (error) {
        console.error("Error fetching groups:", error);
        res.status(500).json({ message: "An error occurred", error: (error as Error).message });
    }
};

export default {
    createGroup,
    getAllGroups,
};
