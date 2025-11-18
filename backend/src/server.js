import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import apiRouter from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 5000;

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:8081",
  "http://127.0.0.1:8081",
  "http://localhost:8082",
  "http://127.0.0.1:8082",
];

const envOrigins =
  process.env.ALLOWED_ORIGIN?.split(",").map((origin) => origin.trim()).filter(Boolean) ?? [];
const allowAllOrigins = envOrigins.includes("*");
const allowedOrigins = allowAllOrigins
  ? []
  : Array.from(new Set([...DEFAULT_ALLOWED_ORIGINS, ...envOrigins]));

const corsOptions = allowAllOrigins
  ? { origin: true, credentials: true }
  : {
      credentials: true,
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} is not allowed by CORS`));
        }
      },
    };

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api", apiRouter);

app.use((err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal server error",
  });
});

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`API ready on http://localhost:${PORT}`));

