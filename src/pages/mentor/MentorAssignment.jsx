import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  School,
  Assignment,
  CheckCircle,
  Cancel,
  Schedule,
  Message,
  Assessment,
} from '@mui/icons-material';

const MentorAssignment = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Mock data for demonstration
  const assignedTeams = [
    {
      id: 1,
      name: 'AI Innovation Team',
      competition: 'AI Hackathon 2024',
      members: [
        { name: 'John Doe', department: 'CS', role: 'Team Lead' },
        { name: 'Jane Smith', department: 'CS', role: 'Member' },
        { name: 'Mike Johnson', department: 'Design', role: 'Member' },
      ],
      progress: 75,
      status: 'active',
      nextSession: '2024-03-20 14:00',
    },
    {
      id: 2,
      name: 'Robotics Team',
      competition: 'Robotics Challenge 2024',
      members: [
        { name: 'Alice Brown', department: 'Mechanical', role: 'Team Lead' },
        { name: 'Bob Wilson', department: 'ECE', role: 'Member' },
      ],
      progress: 45,
      status: 'active',
      nextSession: '2024-03-22 15:00',
    },
  ];

  const handleScheduleSession = (team) => {
    setSelectedTeam(team);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedTeam(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        Mentor Assignment
      </Typography>

      {/* Assigned Teams */}
      <Grid container spacing={3}>
        {assignedTeams.map((team) => (
          <Grid item xs={12} md={6} key={team.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">{team.name}</Typography>
                  <Chip
                    label={team.status}
                    color={team.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </Box>

                <Typography color="text.secondary" gutterBottom>
                  Competition: {team.competition}
                </Typography>

                {/* Progress Bar */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Progress</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {team.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={team.progress}
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

                {/* Team Members */}
                <List>
                  {team.members.map((member, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar>{member.name[0]}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={member.name}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              {member.department}
                            </Typography>
                            <Chip
                              label={member.role}
                              size="small"
                              sx={{ ml: 1 }}
                            />
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>

                {/* Next Session */}
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Next Session:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {team.nextSession}
                  </Typography>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={<Schedule />}
                    size="small"
                    onClick={() => handleScheduleSession(team)}
                  >
                    Schedule Session
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Message />}
                    size="small"
                  >
                    Message Team
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Assessment />}
                    size="small"
                  >
                    Submit Evaluation
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Schedule Session Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule Mentorship Session</DialogTitle>
        <DialogContent>
          {selectedTeam && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Team: {selectedTeam.name}
              </Typography>
              <TextField
                fullWidth
                label="Session Date"
                type="date"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Session Time"
                type="time"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Session Topic"
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Agenda"
                margin="normal"
                multiline
                rows={4}
                variant="outlined"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleDialogClose}>
            Schedule Session
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MentorAssignment; 