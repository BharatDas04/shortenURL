import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const shortenURL = sequelize.define("shortenURL", {
  id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default shortenURL;
