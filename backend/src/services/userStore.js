import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, "../../data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

const ensureUsers = async () => {
  await fs.ensureDir(DATA_DIR);
  const exists = await fs.pathExists(USERS_FILE);
  if (!exists) {
    await fs.writeJson(USERS_FILE, [], { spaces: 2 });
  }
};

const readUsers = async () => {
  await ensureUsers();
  return fs.readJson(USERS_FILE);
};

const writeUsers = async (users) => fs.writeJson(USERS_FILE, users, { spaces: 2 });

const normalizeEmail = (email = "") => email.trim().toLowerCase();

export const findUserByEmail = async (email) => {
  const users = await readUsers();
  return users.find((user) => normalizeEmail(user.email) === normalizeEmail(email));
};

export const addUser = async ({ name, email, password, role = "User" }) => {
  const users = await readUsers();
  const normalizedEmail = normalizeEmail(email);

  if (users.some((user) => normalizeEmail(user.email) === normalizedEmail)) {
    const error = new Error("An account with that email already exists.");
    error.status = 409;
    throw error;
  }

  const nextUser = {
    id: `USR-${Date.now()}`,
    name: name?.trim() || "New User",
    email: email.trim(),
    role,
    password,
  };

  users.push(nextUser);
  await writeUsers(users);
  return nextUser;
};

