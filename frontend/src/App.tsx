import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AppPage from './components/AppPage';
import { Container, CssBaseline } from '@mui/material';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline /> {/* Normalize CSS */}
      <Container maxWidth="sm" sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<AppPage />} />
          </Route>
        </Routes>
      </Container>
    </Router>
  );
};

export default App;