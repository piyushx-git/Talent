import React from 'react';
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
} from '@mui/material';
import {
  People,
  EmojiEvents,
  School,
  Assessment,
  Settings,
  Group,
  TrendingUp,
  Notifications,
} from '@mui/icons-material';

const AdminDashboard = () => {
  // Mock data for demonstration
  const stats = [
    { title: 'Total Users', value: '1,234', icon: <People />, color: '#1976d2' },
    { title: 'Active Competitions', value: '12', icon: <EmojiEvents />, color: '#2e7d32' },
    { title: 'Registered Teams', value: '89', icon: <Group />, color: '#ed6c02' },
    { title: 'Mentor Sessions', value: '156', icon: <School />, color: '#9c27b0' },
  ];

  const recentActivities = [
    { text: 'New competition "AI Hackathon 2024" created', time: '2 hours ago' },
    { text: 'Team "Tech Innovators" registered for Web Development Challenge', time: '3 hours ago' },
    { text: 'Mentor session scheduled between Team Alpha and John Doe', time: '4 hours ago' },
    { text: 'New user registration: Sarah Wilson (Mentor)', time: '5 hours ago' },
  ];

  const systemStatus = [
    { name: 'Server Load', value: 65 },
    { name: 'Database Usage', value: 45 },
    { name: 'API Response Time', value: 85 },
    { name: 'Storage Usage', value: 30 },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        Admin Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      backgroundColor: `${stat.color}15`,
                      borderRadius: '50%',
                      p: 1,
                      mr: 2,
                    }}
                  >
                    {React.cloneElement(stat.icon, { sx: { color: stat.color } })}
                  </Box>
                  <Typography variant="h6" component="div">
                    {stat.value}
                  </Typography>
                </Box>
                <Typography color="text.secondary" variant="body2">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
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
                startIcon={<EmojiEvents />}
                sx={{ height: '100%' }}
              >
                Manage Competitions
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<People />}
                sx={{ height: '100%' }}
              >
                User Management
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Assessment />}
                sx={{ height: '100%' }}
              >
                Reports
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Settings />}
                sx={{ height: '100%' }}
              >
                System Settings
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Recent Activities and System Status */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        <Notifications color="action" />
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.text}
                        secondary={activity.time}
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Status
              </Typography>
              {systemStatus.map((status, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{status.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {status.value}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={status.value}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard; 