import express from "express";
import { createShortURL } from "../controllers/create.js";
import { redirectShortenURLs } from "../controllers/redirect.js";
import { updateShortURL } from "../controllers/update.js";
import { deleteShortURL } from "../controllers/delete.js";
import { statsURL } from "../controllers/stats.js";

const router = express.Router();

router.post("/shorten", createShortURL);

router.put("/shorten/update", updateShortURL);

router.get("/shorten/:code/stats", statsURL);

router.delete("/shorten/delete", deleteShortURL);

router.get("/shorten/*", redirectShortenURLs);

export default router;
