import { config } from "dotenv";
import logger from "./loggers/logger";

const main = async () => {
  config();
  const { StartServer } = await import("./app");
  await StartServer();
}

main().catch((err) => {
  console.error("Error starting the server:", err);
  process.exit(1);
});

process.on("SIGINT", () => {
  logger.info("Server shutting down");
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});

process.on("SIGTERM", () => {
  logger.info(`Server shutting down`);
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});