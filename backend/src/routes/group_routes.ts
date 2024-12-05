import { Router } from "express";
import {
    basicSearchResult,
    createGroup,
    getAllGroups,
} from "../mockup_controllers/groupController";
import { loadGroupController } from "../utils/group_controller_loader";
import { changeJoinRequestStatus, joinTheGroup } from "../controllers/joinrequest_controller";
import { asyncWrapper } from "../utils/wrapper";

const router: Router = Router();
(async () => {
    try {
        const groupController = await loadGroupController();

        // Destructure the dynamically loaded handlers
        const { basicSearchResult, createGroup, getAllGroups } = groupController;

        // Route to create a group
        router.post("/create", createGroup);

        // Route to fetch all groups
        router.get("/all", getAllGroups);

        // Route for basic search
        router.get("/basic_search/:text/:student_id", basicSearchResult);
    } catch (error) {
        console.error("Failed to load groupController:", error);
    }
})();

// Static routes for join requests
router.post("/join", asyncWrapper(joinTheGroup));
router.post("/respond-join-request", asyncWrapper(changeJoinRequestStatus));

export default router;
