import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Paper,
} from '@mui/material';
import {
  Group,
  EmojiEvents,
  School,
  Notifications,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.main`, mr: 2 }}>
          {icon}
        </Avatar>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const stats = [
    {
      title: 'Active Teams',
      value: '12',
      icon: <Group />,
      color: 'primary',
    },
    {
      title: 'Competitions',
      value: '5',
      icon: <EmojiEvents />,
      color: 'secondary',
    },
    {
      title: 'Mentors',
      value: '8',
      icon: <School />,
      color: 'success',
    },
    {
      title: 'Notifications',
      value: '3',
      icon: <Notifications />,
      color: 'warning',
    },
  ];

  const recentActivities = [
    {
      title: 'Team Alpha joined Hackathon 2024',
      time: '2 hours ago',
      type: 'team',
    },
    {
      title: 'New mentor assigned: Dr. Smith',
      time: '5 hours ago',
      type: 'mentor',
    },
    {
      title: 'Project milestone completed',
      time: '1 day ago',
      type: 'project',
    },
    {
      title: 'New competition announced',
      time: '2 days ago',
      type: 'competition',
    },
  ];

  const upcomingDeadlines = [
    {
      title: 'Project Proposal Submission',
      date: 'March 25, 2024',
      competition: 'Smart City Challenge',
    },
    {
      title: 'Team Registration Deadline',
      date: 'March 30, 2024',
      competition: 'Hackathon 2024',
    },
    {
      title: 'Mentor Meeting',
      date: 'April 2, 2024',
      competition: 'Drone Design Competition',
    },
  ];

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <StatCard {...stat} />
          </Grid>
        ))}

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={activity.title}
                      secondary={activity.time}
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Upcoming Deadlines */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Upcoming Deadlines
            </Typography>
            <List>
              {upcomingDeadlines.map((deadline, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={deadline.title}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {deadline.date}
                          </Typography>
                          {` — ${deadline.competition}`}
                        </>
                      }
                    />
                  </ListItem>
                  {index < upcomingDeadlines.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 