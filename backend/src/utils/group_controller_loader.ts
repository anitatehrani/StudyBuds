// Importing types from Express for handler signatures
import { Request, Response } from "express";

// Define the shape of the GroupController module
export interface GroupController {
    basicSearchResult: (req: Request, res: Response) => void;
    createGroup: (req: Request, res: Response) => void;
    getAllGroups: (req: Request, res: Response) => void;
}

// Dynamically load the groupController module based on MOCK_DATA
export async function loadGroupController(): Promise<GroupController> {
    if (process.env.MOCK_DATA === "true") {
        return import("../mockup_controllers/groupController");
    } else {
        return import("../controllers/group_controller");
    }
}
