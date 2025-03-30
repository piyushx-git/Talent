import React, { useState } from 'react';
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

// Mock data
const activeCompetitions = [
  {
    id: 1,
    name: 'AI Innovation Challenge',
    teams: 12,
    submissions: 8,
    deadline: '2024-04-15',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Web Development Hackathon',
    teams: 15,
    submissions: 10,
    deadline: '2024-04-20',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Data Science Competition',
    teams: 8,
    submissions: 5,
    deadline: '2024-04-25',
    status: 'Active',
  },
];

const recentSubmissions = [
  {
    id: 1,
    team: 'Tech Innovators',
    competition: 'AI Innovation Challenge',
    submittedAt: '2024-03-20',
    status: 'Pending Review',
  },
  {
    id: 2,
    team: 'Code Warriors',
    competition: 'Web Development Hackathon',
    submittedAt: '2024-03-19',
    status: 'Reviewed',
  },
  {
    id: 3,
    team: 'Data Masters',
    competition: 'Data Science Competition',
    submittedAt: '2024-03-18',
    status: 'Pending Review',
  },
];

const CompetitionOrganizerDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

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

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome back, Organizer!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Here's what's happening with your competitions
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ textTransform: 'none' }}
          >
            Create Competition
          </Button>
          <Button
            variant="outlined"
            startIcon={<Assessment />}
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
            value="35"
            icon={<Group />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Competitions"
            value="3"
            icon={<EmojiEvents />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Reviews"
            value="13"
            icon={<PendingActions />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Upcoming Events"
            value="2"
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
                  sx={{ textTransform: 'none' }}
                >
                  New Competition
                </Button>
              </Box>
              <List>
                {activeCompetitions.map((competition) => (
                  <React.Fragment key={competition.id}>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="more">
                          <MoreVert />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <EmojiEvents color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={competition.name}
                        secondary={
                          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                            <Chip
                              size="small"
                              label={`${competition.teams} Teams`}
                              color="primary"
                              variant="outlined"
                            />
                            <Chip
                              size="small"
                              label={`${competition.submissions} Submissions`}
                              color="success"
                              variant="outlined"
                            />
                            <Chip
                              size="small"
                              label={`Deadline: ${competition.deadline}`}
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
              <List>
                {recentSubmissions.map((submission) => (
                  <React.Fragment key={submission.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Assignment color={submission.status === 'Reviewed' ? 'success' : 'warning'} />
                      </ListItemIcon>
                      <ListItemText
                        primary={submission.team}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {submission.competition}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <Chip
                                size="small"
                                label={submission.status}
                                color={submission.status === 'Reviewed' ? 'success' : 'warning'}
                                sx={{ mr: 1 }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {submission.submittedAt}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 2, textTransform: 'none' }}
              >
                View All Submissions
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompetitionOrganizerDashboard; 