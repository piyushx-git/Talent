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
  Avatar,
  Divider,
} from '@mui/material';
import {
  Group,
  EmojiEvents,
  School,
  Person,
  Search,
  Add,
  TrendingUp,
  Assignment,
} from '@mui/icons-material';

const StudentDashboard = () => {
  // Mock data - replace with actual data from your backend
  const activeTeams = [
    { id: 1, name: 'AI Innovators', project: 'Smart City Solutions', members: 4 },
    { id: 2, name: 'RoboTech', project: 'Autonomous Drone System', members: 3 },
  ];

  const upcomingCompetitions = [
    { id: 1, name: 'Hackathon 2024', date: '2024-04-15', category: 'Programming' },
    { id: 2, name: 'Robotics Challenge', date: '2024-05-01', category: 'Robotics' },
  ];

  const mentorSessions = [
    { id: 1, mentor: 'Dr. Sarah Johnson', date: '2024-03-20', topic: 'Project Planning' },
    { id: 2, mentor: 'Prof. Michael Chen', date: '2024-03-22', topic: 'Technical Review' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome back, Student!
      </Typography>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <Search />
                  </ListItemIcon>
                  <ListItemText primary="Find Team Members" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary="Create New Team" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <EmojiEvents />
                  </ListItemIcon>
                  <ListItemText primary="Browse Competitions" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Teams */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Teams
              </Typography>
              <List>
                {activeTeams.map((team) => (
                  <React.Fragment key={team.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Group />
                      </ListItemIcon>
                      <ListItemText
                        primary={team.name}
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2">{team.project}</Typography>
                            <Chip
                              size="small"
                              label={`${team.members} members`}
                              color="primary"
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Button
                startIcon={<Add />}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              >
                Join New Team
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Competitions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Competitions
              </Typography>
              <List>
                {upcomingCompetitions.map((competition) => (
                  <React.Fragment key={competition.id}>
                    <ListItem>
                      <ListItemIcon>
                        <EmojiEvents />
                      </ListItemIcon>
                      <ListItemText
                        primary={competition.name}
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2">{competition.date}</Typography>
                            <Chip
                              size="small"
                              label={competition.category}
                              color="secondary"
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Button
                startIcon={<TrendingUp />}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              >
                View All Competitions
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Mentor Sessions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Mentor Sessions
              </Typography>
              <List>
                {mentorSessions.map((session) => (
                  <React.Fragment key={session.id}>
                    <ListItem>
                      <ListItemIcon>
                        <School />
                      </ListItemIcon>
                      <ListItemText
                        primary={session.mentor}
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2">{session.topic}</Typography>
                            <Typography variant="body2">•</Typography>
                            <Typography variant="body2">{session.date}</Typography>
                          </Box>
                        }
                      />
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<Assignment />}
                      >
                        Join Session
                      </Button>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard; 