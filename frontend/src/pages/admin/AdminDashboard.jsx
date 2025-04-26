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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Stack
} from '@mui/material';
import {
  People as PeopleIcon,
  EmojiEvents as EmojiEventsIcon,
  School as SchoolIcon,
  Assessment,
  Settings as SettingsIcon,
  Group as GroupIcon,
  TrendingUp,
  Notifications,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add,
  Visibility as ViewIcon,
  Block
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/axiosConfig';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeCompetitions: 0,
    registeredTeams: 0,
    mentorSessions: 0,
    pendingTeams: 0,
    activeMentors: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentTeams, setRecentTeams] = useState([]);
  const [recentCompetitions, setRecentCompetitions] = useState([]);

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

      // Fetch all data in parallel
      const [usersResponse, teamsResponse, competitionsResponse] = await Promise.all([
        api.get('/users'),
        api.get('/teams'),
        api.get('/competitions')
      ]);

      // Calculate statistics
      const users = usersResponse.data.data;
      const teams = teamsResponse.data.data;
      const competitions = competitionsResponse.data.data;

      const totalUsers = users.length;
      const activeCompetitions = competitions.filter(comp => comp.status === 'active').length;
      const registeredTeams = teams.length;
      const pendingTeams = teams.filter(team => team.status === 'pending').length;
      const activeMentors = users.filter(user => user.role === 'mentor' && user.isActive).length;

      setStats({
        totalUsers,
        activeCompetitions,
        registeredTeams,
        pendingTeams,
        activeMentors,
        mentorSessions: 0 // This would need a separate endpoint
      });

      // Get recent users (last 5)
      const recentUsers = users
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentUsers(recentUsers);

      // Get recent teams (last 5)
      const recentTeams = teams
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentTeams(recentTeams);

      // Get recent competitions (last 5)
      const recentCompetitions = competitions
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentCompetitions(recentCompetitions);

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewUser = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  const handleViewTeam = (teamId) => {
    navigate(`/admin/teams/${teamId}`);
  };

  const handleViewCompetition = (competitionId) => {
    navigate(`/admin/competitions/${competitionId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

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
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        Admin Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PeopleIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6" color="textSecondary">
                    Total Users
                  </Typography>
                  <Typography variant="h4">{stats.totalUsers}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <EmojiEventsIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6" color="textSecondary">
                    Active Competitions
                  </Typography>
                  <Typography variant="h4">{stats.activeCompetitions}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <GroupIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6" color="textSecondary">
                    Registered Teams
                  </Typography>
                  <Typography variant="h4">{stats.registeredTeams}</Typography>
                  {stats.pendingTeams > 0 && (
                    <Typography variant="caption" color="warning.main">
                      {stats.pendingTeams} pending approval
                    </Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <SchoolIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6" color="textSecondary">
                    Active Mentors
                  </Typography>
                  <Typography variant="h4">{stats.activeMentors}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<EmojiEventsIcon />}
                component={Link}
                to="/admin/competitions"
                sx={{ height: '100%' }}
              >
                Manage Competitions
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<PeopleIcon />}
                component={Link}
                to="/admin/users"
                sx={{ height: '100%' }}
              >
                User Management
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GroupIcon />}
                component={Link}
                to="/admin/teams"
                sx={{ height: '100%' }}
              >
                Team Management
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<SettingsIcon />}
                component={Link}
                to="/admin/settings"
                sx={{ height: '100%' }}
              >
                System Settings
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Users
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>
                          <Chip
                            label={user.role}
                            color={user.role === 'admin' ? 'primary' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.isActive ? 'Active' : 'Inactive'}
                            color={user.isActive ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip title="View">
                            <IconButton
                              size="small"
                              onClick={() => handleViewUser(user._id)}
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Teams
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Team Name</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Members</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentTeams.map((team) => (
                      <TableRow key={team._id}>
                        <TableCell>{team.name}</TableCell>
                        <TableCell>
                          <Chip
                            label={team.status}
                            color={getStatusColor(team.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{team.members?.length || 0}</TableCell>
                        <TableCell>
                          <Tooltip title="View">
                            <IconButton
                              size="small"
                              onClick={() => handleViewTeam(team._id)}
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Competitions
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Teams</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentCompetitions.map((competition) => (
                      <TableRow key={competition._id}>
                        <TableCell>{competition.title}</TableCell>
                        <TableCell>
                          <Chip
                            label={competition.status}
                            color={getStatusColor(competition.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{competition.teams?.length || 0}</TableCell>
                        <TableCell>
                          <Tooltip title="View">
                            <IconButton
                              size="small"
                              onClick={() => handleViewCompetition(competition._id)}
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard; 