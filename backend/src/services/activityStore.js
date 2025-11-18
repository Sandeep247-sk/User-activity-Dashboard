import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, "../../data");
const ACTIVITY_FILE = path.join(DATA_DIR, "activityLogs.json");
const MAX_LOGS = 500;

const ensureStore = async () => {
  await fs.ensureDir(DATA_DIR);
  const exists = await fs.pathExists(ACTIVITY_FILE);
  if (!exists) {
    await fs.writeJson(ACTIVITY_FILE, [], { spaces: 2 });
  }
};

export const getActivityLogs = async () => {
  await ensureStore();
  const logs = await fs.readJson(ACTIVITY_FILE);

  return logs.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
};

export const addActivityLog = async (log) => {
  await ensureStore();
  const logs = await fs.readJson(ACTIVITY_FILE);
  const nextLogs = [log, ...logs].slice(0, MAX_LOGS);
  await fs.writeJson(ACTIVITY_FILE, nextLogs, { spaces: 2 });
  return log;
};

