import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import api from '../../utils/axiosConfig';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StudentDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState({
    teams: [],
    competitions: [],
    mentors: [],
    skills: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch all required data in parallel
      const [teamsResponse, competitionsResponse, mentorsResponse] = await Promise.all([
        api.get('/teams'),
        api.get('/competitions'),
        api.get('/mentors')
      ]);

      setDashboardData({
        teams: teamsResponse.data.data || [],
        competitions: competitionsResponse.data.data || [],
        mentors: mentorsResponse.data.data || [],
        skills: user?.student?.skills || []
      });
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h4" gutterBottom>
              Welcome, {user?.name}!
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Student Dashboard
            </Typography>
          </StyledPaper>
        </Grid>

        {/* Profile Summary */}
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{ width: 100, height: 100, mb: 2 }}
                  alt={user?.name}
                  src={user?.profilePicture}
                />
                <Typography variant="h6">{user?.name}</Typography>
                <Typography color="text.secondary">{user?.email}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Student Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Institution: {user?.student?.institution || 'Not specified'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Course: {user?.student?.course || 'Not specified'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Year: {user?.student?.year || 'Not specified'}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Teams
                  </Typography>
                  <Typography variant="h4">
                    {dashboardData.teams.filter(team => 
                      team.members.some(member => member._id === user?._id)
                    ).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Teams
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Competitions
                  </Typography>
                  <Typography variant="h4">
                    {dashboardData.competitions.filter(comp => 
                      comp.participants.some(participant => participant._id === user?._id)
                    ).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Participating
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Skills
                  </Typography>
                  <Typography variant="h4">
                    {dashboardData.skills.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Listed Skills
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Mentors
                  </Typography>
                  <Typography variant="h4">
                    {dashboardData.mentors.filter(mentor => 
                      mentor.students.some(student => student._id === user?._id)
                    ).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Assigned Mentors
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentDashboard; 