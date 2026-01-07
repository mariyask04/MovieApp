import { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";

const MovieForm = ({ initialData = {}, onSubmit }) => {
  const [movie, setMovie] = useState({
    title: "",
    plot: "",
    imdbrating: "",
    released: "",
    runtime: "",
    poster: ""
  });

  useEffect(() => {
    if (initialData) {
      setMovie({
        title: initialData.title || "",
        plot: initialData.plot || "",
        imdbrating: initialData.imdbrating || "",
        released: initialData.released || "",
        runtime: initialData.runtime || "",
        poster: initialData.poster || ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: movie.title || "",
      plot: movie.plot || "",
      imdbrating: Number(movie.imdbrating) || 0,
      released: movie.released ? new Date(movie.released) : null,
      runtime: Number(movie.runtime) || 0,
      poster: movie.poster || ""
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField label="Title" name="title" value={movie.title} onChange={handleChange} required />
        <TextField label="Plot" name="plot" value={movie.plot} onChange={handleChange} multiline rows={3} required />
        <TextField label="IMDB Rating" name="imdbrating" type="number" value={movie.imdbrating} onChange={handleChange} required />
        <TextField label="Release Date" name="released" type="date" value={movie.released?.split("T")[0] || ""} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
        <TextField label="Runtime (min)" name="runtime" type="number" value={movie.runtime} onChange={handleChange} required />
        <TextField label="Poster URL" name="poster" value={movie.poster} onChange={handleChange} />
        <Button type="submit" variant="contained">Submit</Button>
      </Stack>
    </form>
  );
};

export default MovieForm;
