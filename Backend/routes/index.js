import express from "express";
import { createShortURL } from "../controllers/create.js";
import { redirectShortenURLs } from "../controllers/redirect.js";
import { updateShortURL } from "../controllers/update.js";
import { statsURL } from "../controllers/stats.js";

const router = express.Router();

router.post("/shorten", createShortURL);
router.get("/shorten/*", redirectShortenURLs);
router.put("/shorten/*", updateShortURL);
router.get("/shorten/:code/stats", statsURL);
router.delete("/shorten/*", updateShortURL);

export default router;
