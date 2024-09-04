import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import indexRoutes from "./routes/index.js";
import { logger } from "./middleware/logger.js";
import sequelize from "./database/config.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);
app.use("/", indexRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
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
