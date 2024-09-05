import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const shortenURL = sequelize.define(
  "ShortenURL",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accessCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    tableName: "shortenURLs",
  }
);
export default shortenURL;
