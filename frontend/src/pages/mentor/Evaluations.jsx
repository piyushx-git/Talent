import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  EmojiEvents,
  Group,
  School,
  Assessment,
  Add as AddIcon,
} from '@mui/icons-material';

const Evaluations = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Mock data for teams
  const teams = [
    {
      id: 1,
      name: 'Team Alpha',
      competition: 'AI Innovation Challenge',
      members: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      progress: 75,
      status: 'In Progress',
      lastEvaluation: '2024-02-15',
      evaluations: [
        {
          date: '2024-02-15',
          rating: 4,
          feedback: 'Great progress on the AI model implementation. Need to focus more on documentation.',
          areas: ['Technical Skills', 'Teamwork', 'Documentation'],
        },
      ],
    },
    {
      id: 2,
      name: 'Team Beta',
      competition: 'Web Development Hackathon',
      members: ['Alice Brown', 'Bob Wilson', 'Carol Davis'],
      progress: 60,
      status: 'In Progress',
      lastEvaluation: '2024-02-10',
      evaluations: [
        {
          date: '2024-02-10',
          rating: 3.5,
          feedback: 'Good UI implementation but needs improvement in backend architecture.',
          areas: ['Frontend', 'Backend', 'Architecture'],
        },
      ],
    },
  ];

  const handleOpenDialog = (team) => {
    setSelectedTeam(team);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTeam(null);
  };

  const handleSubmitEvaluation = () => {
    // Here you would typically make an API call to save the evaluation
    console.log('Submitting evaluation for team:', selectedTeam);
    handleCloseDialog();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Team Evaluations
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog(null)}
        >
          New Evaluation
        </Button>
      </Box>

      <Grid container spacing={3}>
        {teams.map((team) => (
          <Grid item xs={12} md={6} key={team.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {team.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {team.competition}
                    </Typography>
                  </Box>
                  <Chip
                    label={team.status}
                    color={team.status === 'In Progress' ? 'primary' : 'success'}
                    size="small"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Team Members
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {team.members.map((member, index) => (
                      <Chip key={index} label={member} size="small" />
                    ))}
                  </Stack>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Progress
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={team.progress}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {team.progress}% Complete
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Last Evaluation
                  </Typography>
                  <Typography variant="body2">
                    {new Date(team.lastEvaluation).toLocaleDateString()}
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  startIcon={<Assessment />}
                  onClick={() => handleOpenDialog(team)}
                  fullWidth
                >
                  Submit Evaluation
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Evaluation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedTeam ? `Evaluate ${selectedTeam.name}` : 'New Team Evaluation'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {!selectedTeam && (
              <FormControl fullWidth>
                <InputLabel>Select Team</InputLabel>
                <Select label="Select Team">
                  {teams.map((team) => (
                    <MenuItem key={team.id} value={team.id}>
                      {team.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Overall Rating
              </Typography>
              <Rating defaultValue={0} precision={0.5} size="large" />
            </Box>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Feedback"
              placeholder="Provide detailed feedback on the team's progress..."
              variant="outlined"
            />

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Areas of Focus
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {['Technical Skills', 'Teamwork', 'Documentation', 'Innovation', 'Problem Solving'].map((area) => (
                  <Chip
                    key={area}
                    label={area}
                    onClick={() => {}}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Box>

            <TextField
              fullWidth
              label="Next Steps"
              placeholder="Outline the next steps and recommendations..."
              multiline
              rows={3}
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitEvaluation}>
            Submit Evaluation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Evaluations; 