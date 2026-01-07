import express from "express";
import { loadIMDbMovies } from "../controllers/imdb.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/load", protect, adminOnly, loadIMDbMovies);

export default router;
