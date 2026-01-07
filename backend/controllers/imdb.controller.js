import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { enqueueMovie } from "../queue/movie.queue.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadIMDbMovies = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../data/imdbTop250.json");

    const data = fs.readFileSync(filePath, "utf-8");
    const imdbMovies = JSON.parse(data);

    imdbMovies.forEach(movie => enqueueMovie(movie));

    res.json({
      message: "IMDb movies added to queue for lazy insertion",
      total: imdbMovies.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
