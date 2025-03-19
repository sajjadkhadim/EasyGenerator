import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Typography, Box, Paper, Avatar, Link as MuiLink, } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { signInSchema, SignInFormData } from './../core/validationSchemas';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      await axios.post(`${BASE_URL}/api/auth/signin`, data)
        .then((response) => {
          console.log(response.data)
          localStorage.setItem('token', response.data.token);
          alert('Signed in successfully');
          navigate('/app');
        })
        .catch((error) => console.error('Error:', error));
    } catch (error) {
      alert('Error signing in');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <MuiLink component={Link} to="/signup" variant="body2">
              Don't have an account? Register
            </MuiLink>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignIn;