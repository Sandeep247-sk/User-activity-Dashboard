import { v4 as uuid } from "uuid";

const buildUserId = (username) => {
  if (!username) return "ANON";
  return username.split("@")[0]?.toUpperCase() || "ANON";
};

export const buildActivityLog = ({
  username,
  status,
  context = {},
  flagReason,
}) => {
  const timezone = context.timezone || "UTC";
  const location = context.location || `Local Session • ${timezone}`;

  return {
    id: context.id || uuid(),
    timestamp: new Date().toISOString(),
    userId: buildUserId(username),
    username,
    status,
    ipAddress: context.ipAddress || "127.0.0.1",
    location,
    device: context.device || "Desktop",
    os: context.os || "Unknown OS",
    browser: context.browser || "Unknown Browser",
    sessionDuration: status === "success" ? "Active" : undefined,
    flagReason:
      flagReason ||
      (status === "suspicious" ? "Automated risk alert" : undefined),
  };
};

