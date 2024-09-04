import express from "express";
import { createShortURL } from "../controllers/create.js";
import { redirectShortenURLs } from "../controllers/redirect.js";

const router = express.Router();

router.get("/", createShortURL);
router.get("/shorten/*", redirectShortenURLs);

export default router;
