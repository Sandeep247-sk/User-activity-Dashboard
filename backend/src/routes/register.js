import { Router } from "express";

import { addUser, findUserByEmail } from "../services/userStore.js";
import { addActivityLog } from "../services/activityStore.js";
import { buildActivityLog } from "../utils/activity.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "An account with that email already exists" });
    }

    const newUser = await addUser({
      name,
      email,
      password,
    });

    const log = buildActivityLog({
      username: email,
      status: "success",
      context: {
        location: "Self-service registration",
      },
    });

    await addActivityLog(log);

    return res.status(201).json({
      message: "Account created. You can now sign in.",
      user: {
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;

