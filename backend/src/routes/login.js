import { Router } from "express";

import { addActivityLog } from "../services/activityStore.js";
import { findUserByEmail } from "../services/userStore.js";
import { buildActivityLog } from "../utils/activity.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { email, password, context = {} } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await findUserByEmail(email);
    const isValid = user && user.password === password;

    const log = buildActivityLog({
      username: email,
      status: isValid ? "success" : "failed",
      context,
      flagReason: isValid ? undefined : "Invalid credentials",
    });

    await addActivityLog(log);

    if (!isValid) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password",
        log,
      });
    }

    return res.json({
      status: "success",
      message: "Login successful",
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
      log,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

