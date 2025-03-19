import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Typography, Box, Paper, Avatar, Link as MuiLink } from '@mui/material';
import { WbCloudyOutlined } from '@mui/icons-material';
import { signUpSchema, SignUpFormData } from './../core/validationSchemas';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      await axios.post(`${BASE_URL}/api/auth/signup`, data)
        .then((response) => {
          console.log(response.data);
          alert('User registered successfully');
        })
        .catch((error) => console.error('Error:', error));
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <WbCloudyOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
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
            label="Name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
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
            Sign Up
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <MuiLink component={Link} to="/signin" variant="body2">
              Do you have account? Login
            </MuiLink>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUp;