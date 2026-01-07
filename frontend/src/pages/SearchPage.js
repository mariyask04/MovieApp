import { useEffect, useState } from "react";
import API from "../api/axios";
import MovieCard from "../components/MovieCard";
import { Grid, Container, TextField, MenuItem, Button, Stack, Typography, Pagination } from "@mui/material";

const sortOptions = [
    { value: "title", label: "Name" },
    { value: "imdbrating", label: "Rating" },
    { value: "released", label: "Release Date" },
    { value: "runtime", label: "Duration" },
];

const SearchPage = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("title");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchMovies = async () => {
        try {
            const res = await API.get("/movies/search", { params: { q: query, sort, page, limit: 10 } });
            setMovies(res.data.movies || []);
            setTotalPages(res.data.pages || 1);
        } catch (err) {
            console.error(err);
            setMovies([]);
            setTotalPages(1);
        }
    };

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleSearch = () => {
        setPage(1);
        fetchMovies();
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>Search & Sort Movies</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
                <TextField label="Search" value={query} onChange={(e) => setQuery(e.target.value)} fullWidth />
                <TextField select label="Sort by" value={sort} onChange={(e) => setSort(e.target.value)}>
                    {sortOptions.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
                </TextField>
                <Button variant="contained" onClick={handleSearch}>Search</Button>
            </Stack>
            <Grid container>
                {movies && movies.length > 0 ? (
                    movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
                ) : (
                    <Typography sx={{ m: 2 }}>No movies found.</Typography>
                )}
            </Grid>
            <Pagination count={totalPages} page={page} onChange={(e, v) => setPage(v)} sx={{ mt: 2, mb: 4 }} />
        </Container>
    );
};

export default SearchPage;
