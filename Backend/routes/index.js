import express from "express";
import { createShortURL } from "../controllers/create.js";
import { redirectShortenURLs } from "../controllers/redirect.js";
import { updateShortURL } from "../controllers/update.js";
import { deleteShortURL } from "../controllers/delete.js";
import { statsURL } from "../controllers/stats.js";

const router = express.Router();

router.post("/shorten", createShortURL);

// GET route to get stats for a specific short code
router.get("/shorten/:code/stats", statsURL);

// PUT route to update a short URL
router.put("/shorten/:code", updateShortURL);

// DELETE route to delete a specific short URL
router.delete("/shorten/:code", deleteShortURL);

// Catch-all route for redirects based on short code
router.get("/shorten/*", redirectShortenURLs);

export default router;
