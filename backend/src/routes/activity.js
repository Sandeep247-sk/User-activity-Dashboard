import { Router } from "express";

import { addActivityLog, getActivityLogs } from "../services/activityStore.js";
import { buildActivityLog } from "../utils/activity.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const logs = await getActivityLogs();
    res.json(logs);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { username, status, context = {} } = req.body || {};

    if (!username || !status) {
      return res.status(400).json({ message: "username and status are required" });
    }

    const log = buildActivityLog({
      username,
      status,
      context,
    });

    await addActivityLog(log);
    res.status(201).json(log);
  } catch (error) {
    next(error);
  }
});

export default router;

