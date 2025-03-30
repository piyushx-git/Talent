import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme/theme';
import MainLayout from './layouts/MainLayout';
import { Box, Container } from '@mui/material';

// Lazy load pages
import React, { Suspense, useState } from 'react';
const StudentDashboard = React.lazy(() => import('./pages/student/StudentDashboard'));
const MentorDashboard = React.lazy(() => import('./pages/mentor/MentorDashboard'));
const CompetitionOrganizerDashboard = React.lazy(() => import('./pages/organizer/CompetitionOrganizerDashboard'));
const Competitions = React.lazy(() => import('./pages/competitions/Competitions'));
const Teams = React.lazy(() => import('./pages/Teams'));
const Mentorship = React.lazy(() => import('./pages/Mentorship'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const StudentProfile = React.lazy(() => import('./pages/student/StudentProfile'));
const TeamFormation = React.lazy(() => import('./pages/student/TeamFormation'));
const MentorAssignment = React.lazy(() => import('./pages/mentor/MentorAssignment'));
const UserManagement = React.lazy(() => import('./pages/admin/UserManagement'));
const MentorProfile = React.lazy(() => import('./pages/mentor/MentorProfile'));
const Evaluations = React.lazy(() => import('./pages/mentor/Evaluations'));
const OrganizerProfile = React.lazy(() => import('./pages/organizer/OrganizerProfile'));
const SDGMapping = React.lazy(() => import('./components/SDGMapping'));

// Lazy load components
const ChatSystem = React.lazy(() => import('./components/ChatSystem'));
const IndustryPartner = React.lazy(() => import('./components/IndustryPartner'));

// Create AuthContext
export const AuthContext = React.createContext(null);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const login = (credentials) => {
    // Set the role from the credentials
    setUserRole(credentials.role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  // Role-based route protection
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      // Redirect to the appropriate dashboard based on user role
      return <Navigate to={`/${userRole}/dashboard`} replace />;
    }
    return children;
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

    // Determine role based on email
    const role = formData.email.includes('mentor') ? 'mentor' :
                 formData.email.includes('organizer') ? 'organizer' :
                 formData.email.includes('admin') ? 'admin' : 'student';

    // Login with credentials and role
    login({ ...formData, role });

    // Navigate based on role
    switch(role) {
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

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Public routes */}
              <Route
                path="/login"
                element={
                  !isAuthenticated ? (
                    <Box
                      sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(246, 246, 248) 100%)',
                        py: 3,
                      }}
                    >
                      <Container maxWidth="sm">
                        <Login />
                      </Container>
                    </Box>
                  ) : (
                    <Navigate to={`/${userRole}/dashboard`} replace />
                  )
                }
              />
              <Route
                path="/register"
                element={
                  !isAuthenticated ? (
                    <Box
                      sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(246, 246, 248) 100%)',
                        py: 3,
                      }}
                    >
                      <Container maxWidth="sm">
                        <Register />
                      </Container>
                    </Box>
                  ) : (
                    <Navigate to={`/${userRole}/dashboard`} replace />
                  )
                }
              />
              
              {/* Student Routes */}
              <Route
                path="/student/*"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="teams" element={<TeamFormation />} />
                <Route path="competitions" element={<Competitions />} />
                <Route path="mentorship" element={<Mentorship />} />
                <Route path="settings" element={<Settings />} />
                <Route path="chat/:teamId" element={<ChatSystem userRole="student" />} />
                <Route path="sdg-mapping" element={<SDGMapping userRole="student" entityType="student" />} />
              </Route>

              {/* Mentor Routes */}
              <Route
                path="/mentor/*"
                element={
                  <ProtectedRoute allowedRoles={['mentor']}>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<MentorDashboard />} />
                <Route path="profile" element={<MentorProfile />} />
                <Route path="teams" element={<MentorAssignment />} />
                <Route path="mentorship" element={<Mentorship />} />
                <Route path="evaluations" element={<Evaluations />} />
                <Route path="settings" element={<Settings />} />
                <Route path="chat/:teamId" element={<ChatSystem userRole="mentor" />} />
                <Route path="sdg-mapping" element={<SDGMapping userRole="mentor" entityType="mentor" />} />
              </Route>

              {/* Competition Organizer Routes */}
              <Route
                path="/organizer/*"
                element={
                  <ProtectedRoute allowedRoles={['organizer']}>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<CompetitionOrganizerDashboard />} />
                <Route path="profile" element={<OrganizerProfile />} />
                <Route path="competitions" element={<Competitions />} />
                <Route path="teams" element={<Teams />} />
                <Route path="mentorship" element={<Mentorship />} />
                <Route path="sdg-mapping" element={<SDGMapping userRole="organizer" entityType="competition" />} />
              </Route>

              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="competitions" element={<Competitions />} />
                <Route path="mentorship" element={<Mentorship />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="industry-partners" element={<IndustryPartner />} />
                <Route path="sdg-mapping" element={<SDGMapping userRole="admin" entityType="system" />} />
              </Route>

              {/* Default redirect */}
              <Route
                path="*"
                element={
                  isAuthenticated ? (
                    <Navigate to={`/${userRole}/dashboard`} replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
