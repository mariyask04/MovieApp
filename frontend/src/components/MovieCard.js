import { Card, CardContent, Typography, CardMedia, Button } from "@mui/material";

const MovieCard = ({ movie, onEdit, onDelete }) => {
  return (
    <Card sx={{ maxWidth: 250, m: 1 }}>
      {movie.poster && (
        <CardMedia component="img" height="350" image={movie.poster} alt={movie.title} />
      )}
      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2">{movie.plot}</Typography>
        <Typography variant="subtitle2">Rating: ⭐{movie.imdbrating}</Typography>
        {onEdit && <Button onClick={onEdit} sx={{ mt: 1 }}>Edit</Button>}
        {onDelete && <Button onClick={onDelete} color="error" sx={{ mt: 1 }}>Delete</Button>}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
