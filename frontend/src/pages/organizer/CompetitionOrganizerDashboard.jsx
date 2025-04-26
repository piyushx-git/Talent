import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
  Divider,
  IconButton,
  Tooltip,
  Paper,
  Avatar,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  EmojiEvents,
  Group,
  Assignment,
  Event,
  Add,
  CheckCircle,
  PendingActions,
  TrendingUp,
  CalendarToday,
  MoreVert,
  Assessment,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axiosConfig';
import { useAuth } from '../../contexts/AuthContext';

const CompetitionOrganizerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalTeams: 0,
    activeCompetitions: 0,
    pendingReviews: 0,
    upcomingEvents: 0
  });
  const [competitions, setCompetitions] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    // Set up polling for real-time updates
    const interval = setInterval(fetchDashboardData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch competitions organized by the current user
      const competitionsResponse = await api.get('/competitions/organizer');
      const competitionsData = competitionsResponse.data.data;

      // Calculate statistics
      const activeCompetitions = competitionsData.filter(comp => comp.status === 'active').length;
      const upcomingEvents = competitionsData.filter(comp => new Date(comp.startDate) > new Date()).length;
      
      // Fetch teams for all competitions
      const teamsResponse = await api.get('/teams');
      const teamsData = teamsResponse.data.data;
      const totalTeams = teamsData.length;

      // Fetch submissions
      const submissionsResponse = await api.get('/submissions');
      const submissionsData = submissionsResponse.data.data;
      const pendingReviews = submissionsData.filter(sub => sub.status === 'pending').length;

      setStats({
        totalTeams,
        activeCompetitions,
        pendingReviews,
        upcomingEvents
      });

      // Set competitions and submissions
      setCompetitions(competitionsData);
      setSubmissions(submissionsData);

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCompetition = () => {
    navigate('/organizer/competitions/create');
  };

  const handleViewCompetition = (competitionId) => {
    navigate(`/organizer/competitions/${competitionId}`);
  };

  const handleViewReports = () => {
    navigate('/organizer/reports');
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: `${color}.lighter`, mr: 2 }}>
            {icon}
          </Avatar>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
      </CardContent>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          bgcolor: `${color}.main`,
          opacity: 0.8,
        }}
      />
    </Card>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome back, {user?.name}!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Here's what's happening with your competitions
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateCompetition}
            sx={{ textTransform: 'none' }}
          >
            Create Competition
          </Button>
          <Button
            variant="outlined"
            startIcon={<Assessment />}
            onClick={handleViewReports}
            sx={{ textTransform: 'none' }}
          >
            View Reports
          </Button>
        </Stack>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Teams"
            value={stats.totalTeams}
            icon={<Group />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Competitions"
            value={stats.activeCompetitions}
            icon={<EmojiEvents />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Reviews"
            value={stats.pendingReviews}
            icon={<PendingActions />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Upcoming Events"
            value={stats.upcomingEvents}
            icon={<CalendarToday />}
            color="info"
          />
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Active Competitions */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Active Competitions</Typography>
                <Button
                  variant="text"
                  startIcon={<Add />}
                  onClick={handleCreateCompetition}
                  sx={{ textTransform: 'none' }}
                >
                  New Competition
                </Button>
              </Box>
              {competitions.length === 0 ? (
                <Typography color="text.secondary" align="center">
                  No active competitions found
                </Typography>
              ) : (
                <List>
                  {competitions.map((competition) => (
                    <React.Fragment key={competition._id}>
                      <ListItem
                        secondaryAction={
                          <IconButton 
                            edge="end" 
                            aria-label="more"
                            onClick={() => handleViewCompetition(competition._id)}
                          >
                            <MoreVert />
                          </IconButton>
                        }
                      >
                        <ListItemIcon>
                          <EmojiEvents color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={competition.title}
                          secondary={
                            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                              <Chip
                                size="small"
                                label={`${competition.teams?.length || 0} Teams`}
                                color="primary"
                                variant="outlined"
                              />
                              <Chip
                                size="small"
                                label={`${competition.submissions?.length || 0} Submissions`}
                                color="success"
                                variant="outlined"
                              />
                              <Chip
                                size="small"
                                label={`Deadline: ${new Date(competition.endDate).toLocaleDateString()}`}
                                color="warning"
                                variant="outlined"
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Submissions */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Submissions
              </Typography>
              {submissions.length === 0 ? (
                <Typography color="text.secondary" align="center">
                  No recent submissions
                </Typography>
              ) : (
                <List>
                  {submissions.slice(0, 5).map((submission) => (
                    <React.Fragment key={submission._id}>
                      <ListItem>
                        <ListItemIcon>
                          <Assignment color={submission.status === 'pending' ? 'warning' : 'success'} />
                        </ListItemIcon>
                        <ListItemText
                          primary={submission.team?.name || 'Unknown Team'}
                          secondary={
                            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                              <Chip
                                size="small"
                                label={submission.competition?.title || 'Unknown Competition'}
                                color="primary"
                                variant="outlined"
                              />
                              <Chip
                                size="small"
                                label={submission.status}
                                color={submission.status === 'pending' ? 'warning' : 'success'}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompetitionOrganizerDashboard; 