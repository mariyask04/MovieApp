import { useEffect, useState } from "react";
import API from "../api/axios";
import MovieCard from "../components/MovieCard";
import { Grid, Pagination, Container, Typography } from "@mui/material";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (pageNum) => {
    const res = await API.get(`/movies?page=${pageNum}&limit=10`);
    setMovies(res.data.movies);
    setTotalPages(res.data.pages);
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>Movies</Typography>
      <Grid container>
        {movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)}
      </Grid>
      <Pagination count={totalPages} page={page} onChange={(e, v) => setPage(v)} sx={{ mt: 2 }} />
    </Container>
  );
};

export default HomePage;
