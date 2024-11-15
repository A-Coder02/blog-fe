import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if username and password are correct (for simplicity, you can replace this with your logic)
    if (username === "admin" && password === "admin") {
      // Save login status in localStorage
      localStorage.setItem("isLoggedIn", "true");
      navigate("/admin"); // Redirect to Admin Dashboard
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 400, margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Admin Login
      </Typography>
      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        type="password"
      />
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
