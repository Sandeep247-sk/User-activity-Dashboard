import { Router } from "express";

import activityRouter from "./activity.js";
import loginRouter from "./login.js";
import registerRouter from "./register.js";

const router = Router();

router.use("/activity", activityRouter);
router.use("/login", loginRouter);
router.use("/register", registerRouter);

export default router;

