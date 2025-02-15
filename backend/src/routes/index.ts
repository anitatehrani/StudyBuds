import { Request, Response, Router } from "express";
import authMiddleware from "../middlewares/auth_middleware";
import courseRoutes from "./course_routes";
import groupRoutes from "./group_routes";
import loginRoutes from "./login_routes";
import notification from "./notification_routes";
import profileRoutes from "./profile_routes";
import studentRoutes from "./student_routes";

export const router: Router = Router();

export const loginRouter: Router = Router();

function favicon(req: Request, res: Response) {
  res.status(204).end(); // No Content
}

// Handle favicon requests to prevent unnecessary processing
router.get("/favicon.ico", favicon);

function welcome(req: Request, res: Response) {
  res.send("Welcome to the StudyBuds API!");
}


loginRouter.use("/login", loginRoutes);

router.use(authMiddleware);
// Root route
router.get("/", welcome);

router.use("/profile", profileRoutes);

// Mount student routes under "/students"
router.use("/students", studentRoutes);

// Mount group routes under "/groups"
router.use("/groups", groupRoutes);


// Mount course routes under "/courses"
router.use("/courses", courseRoutes);

// Mount course routes under "/notification"
router.use("/notification", notification);

