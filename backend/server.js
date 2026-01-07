import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.config.js";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.routes.js";
import imdbRoutes from "./routes/imdb.route.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/imdb", imdbRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
