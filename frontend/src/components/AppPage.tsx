import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

const AppPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/signin'); // Redirect to the sign-in page
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Application
        </Typography>
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default AppPage;