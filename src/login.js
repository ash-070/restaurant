import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);
      
      if (response.data.status === 'success' || response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (err) {
      setError('password or email not correct');
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Card sx={{ maxWidth: 400, width: '100%', p: 2, backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom textAlign="center" sx={{ fontWeight: 'bold' }}>
            login
          </Typography>
          
          {error && (
            <Typography color="error" variant="body2" textAlign="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleLogin}>
            <TextField fullWidth  label="email"  name="email" type="email"  variant="outlined" margin="normal" value={credentials.email} onChange={handleChange} required/>
            <TextField fullWidth label="password" name="password" type="password" variant="outlined" margin="normal" value={credentials.password} onChange={handleChange} required/>
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2, py: 1.5 }}>
            enter
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}