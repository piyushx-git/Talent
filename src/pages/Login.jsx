import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google,
  GitHub,
  LinkedIn,
  School,
  Person,
  Groups,
  AdminPanelSettings,
} from '@mui/icons-material';
import { AuthContext } from '../App';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setFormData((prev) => ({
        ...prev,
        role: newRole,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    login({ ...formData });

    switch (formData.role) {
      case 'student':
        navigate('/student/dashboard');
        break;
      case 'mentor':
        navigate('/mentor/dashboard');
        break;
      case 'organizer':
        navigate('/organizer/dashboard');
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
      default:
        navigate('/student/dashboard');
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <Paper
      elevation={8}
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 2,
        bgcolor: 'rgba(255, 255, 255, 0.95)',
      }}
    >
      <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}>
        Welcome to TalentHunt
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Sign in to continue to your dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Select your role
          </Typography>
          <ToggleButtonGroup value={formData.role} exclusive onChange={handleRoleChange} fullWidth sx={{ mb: 2 }}>
            <ToggleButton value="student" sx={{ py: 1 }}>
              <School sx={{ mr: 1 }} /> Student
            </ToggleButton>
            <ToggleButton value="mentor" sx={{ py: 1 }}>
              <Person sx={{ mr: 1 }} /> Mentor
            </ToggleButton>
            <ToggleButton value="organizer" sx={{ py: 1 }}>
              <Groups sx={{ mr: 1 }} /> Organizer
            </ToggleButton>
            <ToggleButton value="admin" sx={{ py: 1 }}>
              <AdminPanelSettings sx={{ mr: 1 }} /> Admin
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
          error={error.includes('email')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          error={error.includes('password')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem', textTransform: 'none', boxShadow: 2 }}
        >
          Sign In
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Link to="#" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="primary">
              Forgot password?
            </Typography>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="primary">
              Don't have an account? Sign Up
            </Typography>
          </Link>
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <IconButton
            onClick={() => handleSocialLogin('Google')}
            sx={{ border: 1, borderColor: 'divider', '&:hover': { bgcolor: 'action.hover' } }}
          >
            <Google />
          </IconButton>
          <IconButton
            onClick={() => handleSocialLogin('GitHub')}
            sx={{ border: 1, borderColor: 'divider', '&:hover': { bgcolor: 'action.hover' } }}
          >
            <GitHub />
          </IconButton>
          <IconButton
            onClick={() => handleSocialLogin('LinkedIn')}
            sx={{ border: 1, borderColor: 'divider', '&:hover': { bgcolor: 'action.hover' } }}
          >
            <LinkedIn />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default Login;
