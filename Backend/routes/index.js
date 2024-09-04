import express from "express";
import { createShortURL } from "../controllers/create.js";

const router = express.Router();

router.get("/", createShortURL);

export default router;
