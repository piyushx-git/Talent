import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, CircularProgress } from '@mui/material';
import theme from './theme/theme';
import MainLayout from './layouts/MainLayout';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// Lazy load pages
const StudentDashboard = React.lazy(() => import('./pages/student/StudentDashboard'));
const MentorDashboard = React.lazy(() => import('./pages/mentor/MentorDashboard'));
const CompetitionOrganizerDashboard = React.lazy(() => import('./pages/organizer/CompetitionOrganizerDashboard'));
const Competitions = React.lazy(() => import('./pages/competitions/Competitions'));
const Teams = React.lazy(() => import('./pages/Teams'));
const Mentorship = React.lazy(() => import('./pages/Mentorship'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Settings = React.lazy(() => import('./pages/Settings'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const StudentProfile = React.lazy(() => import('./pages/student/StudentProfile'));
const TeamFormation = React.lazy(() => import('./pages/student/TeamFormation'));
const MentorAssignment = React.lazy(() => import('./pages/mentor/MentorAssignment'));
const UserManagement = React.lazy(() => import('./pages/admin/UserManagement'));
const MentorProfile = React.lazy(() => import('./pages/mentor/MentorProfile'));
const Evaluations = React.lazy(() => import('./pages/mentor/Evaluations'));
const OrganizerProfile = React.lazy(() => import('./pages/organizer/OrganizerProfile'));
const SDGMapping = React.lazy(() => import('./components/SDGMapping'));
const TeamManagement = React.lazy(() => import('./pages/admin/TeamManagement'));
const CompetitionManagement = React.lazy(() => import('./pages/admin/CompetitionManagement'));
const SystemSettings = React.lazy(() => import('./pages/admin/SystemSettings'));

// Lazy load components
const ChatSystem = React.lazy(() => import('./components/ChatSystem'));
const IndustryPartner = React.lazy(() => import('./components/IndustryPartner'));

// Create AuthContext
export const AuthContext = React.createContext(null);

const LoadingSpinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          {/* Admin Routes */}
          <Route path="admin" element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </RoleBasedRoute>
          } />
          <Route path="admin/users" element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <UserManagement />
            </RoleBasedRoute>
          } />
          <Route path="admin/teams" element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <TeamManagement />
            </RoleBasedRoute>
          } />
          <Route path="admin/competitions" element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <CompetitionManagement />
            </RoleBasedRoute>
          } />
          <Route path="admin/settings" element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <SystemSettings />
            </RoleBasedRoute>
          } />
          
          {/* Student Routes */}
          <Route path="student" element={
            <RoleBasedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </RoleBasedRoute>
          } />
          <Route path="student/profile" element={
            <RoleBasedRoute allowedRoles={['student']}>
              <StudentProfile />
            </RoleBasedRoute>
          } />
          <Route path="student/team-formation" element={
            <RoleBasedRoute allowedRoles={['student']}>
              <TeamFormation />
            </RoleBasedRoute>
          } />
          
          {/* Mentor Routes */}
          <Route path="mentor" element={
            <RoleBasedRoute allowedRoles={['mentor']}>
              <MentorDashboard />
            </RoleBasedRoute>
          } />
          <Route path="mentor/profile" element={
            <RoleBasedRoute allowedRoles={['mentor']}>
              <MentorProfile />
            </RoleBasedRoute>
          } />
          <Route path="mentor/assignments" element={
            <RoleBasedRoute allowedRoles={['mentor']}>
              <MentorAssignment />
            </RoleBasedRoute>
          } />
          <Route path="mentor/evaluations" element={
            <RoleBasedRoute allowedRoles={['mentor']}>
              <Evaluations />
            </RoleBasedRoute>
          } />
          
          {/* Organizer Routes */}
          <Route path="organizer" element={
            <RoleBasedRoute allowedRoles={['organizer']}>
              <CompetitionOrganizerDashboard />
            </RoleBasedRoute>
          } />
          <Route path="organizer/profile" element={
            <RoleBasedRoute allowedRoles={['organizer']}>
              <OrganizerProfile />
            </RoleBasedRoute>
          } />
          
          {/* Common Routes */}
          <Route path="competitions" element={<Competitions />} />
          <Route path="teams" element={<Teams />} />
          <Route path="mentorship" element={<Mentorship />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="sdg-mapping" element={<SDGMapping />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
