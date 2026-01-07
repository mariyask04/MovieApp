import Movie from "../models/Movie.model.js";

// GET /movies (pagination)
export const getMovies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const movies = await Movie.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Movie.countDocuments();

    res.json({
      movies,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /movies/search
export const searchMovies = async (req, res) => {
  try {
    const { q = "", sort = "title", page = 1, limit = 10 } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);

    // Text search
    let query = {};
    if (q) query = { $text: { $search: q } };

    // Sorting
    const sortOptions = {
      title: { title: 1 },
      imdbrating: { imdbrating: -1 },
      released: { released: -1 },
      runtime: { runtime: 1 }
    };

    const movies = await Movie.find(query)
      .sort(sortOptions[sort] || { title: 1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const total = await Movie.countDocuments(query);

    res.json({
      movies,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// GET /movies/sorted
export const getSortedMovies = async (req, res) => {
  try {
    const { by } = req.query;

    const sortOptions = {
      name: { title: 1 },
      rating: { rating: -1 },
      releaseDate: { releaseDate: -1 },
      duration: { duration: 1 }
    };

    const movies = await Movie.find().sort(sortOptions[by]);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /movies (Admin)
export const addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /movies/:id (Admin)
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!movie)
      return res.status(404).json({ message: "Movie not found" });

    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /movies/:id (Admin)
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie)
      return res.status(404).json({ message: "Movie not found" });

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
