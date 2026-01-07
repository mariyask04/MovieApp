import express from "express";
import {
    getMovies,
    searchMovies,
    getSortedMovies,
    addMovie,
    updateMovie,
    deleteMovie
} from "../controllers/movie.controller.js";

import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/search", searchMovies);
router.get("/sorted", getSortedMovies);

router.post("/", protect, adminOnly, addMovie);
router.put("/:id", protect, adminOnly, updateMovie);
router.delete("/:id", protect, adminOnly, deleteMovie);

export default router;
