import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { Container, Typography, TextField, Button, Stack, MenuItem } from "@mui/material";

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" // default role
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      login(res.data.user, res.data.token); // store user + token
      navigate(res.data.user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} required />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} type="email" required />
          <TextField label="Password" name="password" value={form.password} onChange={handleChange} type="password" required />
          {/* Optional: allow admin to set role */}
          <TextField label="Role" name="role" value={form.role} onChange={handleChange} select>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <Button type="submit" variant="contained">Register</Button>
        </Stack>
      </form>
    </Container>
  );
};

export default RegisterPage;
