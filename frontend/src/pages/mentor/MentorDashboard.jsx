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
  LinearProgress,
} from '@mui/material';
import {
  Group,
  EmojiEvents,
  School,
  Person,
  CalendarToday,
  Assessment,
  TrendingUp,
  Assignment,
  Add,
} from '@mui/icons-material';

const MentorDashboard = () => {
  // Mock data - replace with actual data from your backend
  const mentoredTeams = [
    { id: 1, name: 'AI Innovators', project: 'Smart City Solutions', progress: 75 },
    { id: 2, name: 'RoboTech', project: 'Autonomous Drone System', progress: 45 },
  ];

  const upcomingSessions = [
    { id: 1, team: 'AI Innovators', date: '2024-03-20', topic: 'Project Planning' },
    { id: 2, team: 'RoboTech', date: '2024-03-22', topic: 'Technical Review' },
  ];

  const competitionSubmissions = [
    { id: 1, team: 'AI Innovators', competition: 'Hackathon 2024', status: 'In Review' },
    { id: 2, team: 'RoboTech', competition: 'Robotics Challenge', status: 'Submitted' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome back, Mentor!
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
                    <CalendarToday />
                  </ListItemIcon>
                  <ListItemText primary="Schedule Session" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <Assessment />
                  </ListItemIcon>
                  <ListItemText primary="Review Submissions" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary="Add New Team" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Mentored Teams */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mentored Teams
              </Typography>
              <List>
                {mentoredTeams.map((team) => (
                  <React.Fragment key={team.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Group />
                      </ListItemIcon>
                      <ListItemText
                        primary={team.name}
                        secondary={
                          <Box sx={{ width: '100%' }}>
                            <Typography variant="body2">{team.project}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={team.progress}
                                sx={{ flexGrow: 1 }}
                              />
                              <Typography variant="body2" color="text.secondary">
                                {team.progress}%
                              </Typography>
                            </Box>
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
                Add New Team
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Sessions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Sessions
              </Typography>
              <List>
                {upcomingSessions.map((session) => (
                  <React.Fragment key={session.id}>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarToday />
                      </ListItemIcon>
                      <ListItemText
                        primary={session.team}
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
                        Start Session
                      </Button>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Competition Submissions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Competition Submissions
              </Typography>
              <List>
                {competitionSubmissions.map((submission) => (
                  <React.Fragment key={submission.id}>
                    <ListItem>
                      <ListItemIcon>
                        <EmojiEvents />
                      </ListItemIcon>
                      <ListItemText
                        primary={submission.team}
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2">{submission.competition}</Typography>
                            <Typography variant="body2">•</Typography>
                            <Chip
                              size="small"
                              label={submission.status}
                              color={submission.status === 'Submitted' ? 'success' : 'warning'}
                            />
                          </Box>
                        }
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Assessment />}
                      >
                        Review
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

export default MentorDashboard; 