import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import indexRoutes from "./routes/index.js";
import { logger } from "./middleware/logger.js";
import sequelize from "./database/config.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cron from "node-cron";
import { exec } from "child_process";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);
app.use("/", indexRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// Schedule a restart at 2 AM every day
cron.schedule("0 2 * * *", () => {
  console.log("Restarting server...");
  exec("pm2 restart server", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error restarting server: ${err}`);
      return;
    }
    console.log(`Server restarted: ${stdout}`);
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }
  });
});

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync({ force: true });
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
