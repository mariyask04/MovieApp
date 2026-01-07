import { useEffect, useState } from "react";
import API from "../api/axios";
import MovieCard from "../components/MovieCard";
import MovieForm from "../components/MovieForm";
import { Container, Typography, Grid, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

const AdminPage = () => {
  const [movies, setMovies] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMovie, setEditMovie] = useState(null);

  const fetchMovies = async () => {
    try {
      const res = await API.get("/movies?page=1&limit=50");
      setMovies(res.data.movies || []);
    } catch (err) {
      console.error(err);
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/movies/${id}`);
      fetchMovies();
    }
  };

  const handleEdit = (movie) => {
    setEditMovie(movie);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditMovie(null);
    setOpen(true);
  };

  const handleSubmit = async (data) => {
    if (editMovie) {
      await API.put(`/movies/${editMovie._id}`, data);
    } else {
      await API.post("/movies", data);
    }
    setOpen(false);
    fetchMovies();
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>Admin Dashboard</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleAdd}>Add Movie</Button>
      <Grid container>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onEdit={() => handleEdit(movie)}
            onDelete={() => handleDelete(movie._id)}
          />
        ))}
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editMovie ? "Edit Movie" : "Add Movie"}</DialogTitle>
        <DialogContent>
          <MovieForm initialData={editMovie} onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AdminPage;
