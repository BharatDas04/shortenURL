import sequelize from "../database/config.js";
import shortenURL from "../database/models/shortenURLs.js";

export const createShortURL = (req, res) => {
  res.send({ message: "Welcome to EXPRESS API" });
};
