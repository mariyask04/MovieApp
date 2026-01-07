import { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";

const MovieForm = ({ initialData = {}, onSubmit }) => {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: "",
    releaseDate: "",
    duration: "",
    poster: ""
  });

  useEffect(() => {
    if (initialData) setMovie(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(movie);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField label="Title" name="title" value={movie.title} onChange={handleChange} required />
        <TextField label="Description" name="description" value={movie.description} onChange={handleChange} multiline rows={3} required />
        <TextField label="Rating" name="rating" type="number" value={movie.rating} onChange={handleChange} required />
        <TextField label="Release Date" name="releaseDate" type="date" value={movie.releaseDate?.split("T")[0] || ""} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
        <TextField label="Duration (min)" name="duration" type="number" value={movie.duration} onChange={handleChange} required />
        <TextField label="Poster URL" name="poster" value={movie.poster} onChange={handleChange} />
        <Button type="submit" variant="contained">Submit</Button>
      </Stack>
    </form>
  );
};

export default MovieForm;
