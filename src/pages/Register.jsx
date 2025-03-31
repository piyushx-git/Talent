import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  School,
  Work,
  Groups,
  AdminPanelSettings,
} from '@mui/icons-material';
import { AuthContext } from '../App';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student', // Default role
    institution: '',
    skills: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setFormData(prev => ({
        ...prev,
        role: newRole
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Set success state
      setSuccess(true);

      // Login with credentials and selected role
      login({ 
        ...formData,
        uid: userCredential.user.uid
      });

      // Navigate based on role
      switch(formData.role) {
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
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: 'primary.main',
          mb: 3,
        }}
      >
        Create Account
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Join TalentHunt to start your journey
      </Typography>

      {error && (
        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
          Account created successfully! Redirecting to dashboard...
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
        {/* Role Selection */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Select your role
          </Typography>
          <ToggleButtonGroup
            value={formData.role}
            exclusive
            onChange={handleRoleChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            <ToggleButton value="student" sx={{ py: 1 }}>
              <School sx={{ mr: 1 }} />
              Student
            </ToggleButton>
            <ToggleButton value="mentor" sx={{ py: 1 }}>
              <Person sx={{ mr: 1 }} />
              Mentor
            </ToggleButton>
            <ToggleButton value="organizer" sx={{ py: 1 }}>
              <Groups sx={{ mr: 1 }} />
              Organizer
            </ToggleButton>
            <ToggleButton value="admin" sx={{ py: 1 }}>
              <AdminPanelSettings sx={{ mr: 1 }} />
              Admin
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Full Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={formData.name}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
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
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          margin="normal"
          fullWidth
          id="institution"
          label="Institution/Organization"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <School color="action" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          margin="normal"
          fullWidth
          id="skills"
          label="Skills (comma-separated)"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Work color="action" />
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            py: 1.5,
            fontSize: '1rem',
            textTransform: 'none',
            boxShadow: 2,
          }}
        >
          Create Account
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="primary">
              Already have an account? Sign In
            </Typography>
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};

export default Register; 