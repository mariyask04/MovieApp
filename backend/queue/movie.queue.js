import Movie from "../models/Movie.model.js";

const movieQueue = [];

// Add movie to queue
export const enqueueMovie = (movie) => {
  movieQueue.push(movie);
};

setInterval(async () => {
  if (movieQueue.length > 0) {
    const movie = movieQueue.shift();
    try {
      await Movie.create(movie);
      console.log(`Inserted: ${movie.title}`);
    } catch (err) {
      console.error("Queue insert error:", err.message);
    }
  }
}, 2000);