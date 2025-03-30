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
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Group,
  PersonAdd,
  CheckCircle,
  Cancel,
  Search,
  FilterList,
} from '@mui/icons-material';

const TeamFormation = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  // Mock data for demonstration
  const suggestedTeams = [
    {
      id: 1,
      name: 'AI Innovation Team',
      members: [
        { name: 'John Doe', skills: ['Python', 'Machine Learning'], department: 'CS' },
        { name: 'Jane Smith', skills: ['Data Science', 'AI'], department: 'CS' },
        { name: 'Mike Johnson', skills: ['UI/UX', 'Frontend'], department: 'Design' },
      ],
      requiredSkills: ['Python', 'Machine Learning', 'UI/UX'],
      status: 'pending',
    },
    {
      id: 2,
      name: 'Robotics Team',
      members: [
        { name: 'Alice Brown', skills: ['Robotics', 'C++'], department: 'Mechanical' },
        { name: 'Bob Wilson', skills: ['Electronics', 'Arduino'], department: 'ECE' },
      ],
      requiredSkills: ['Robotics', 'Electronics', 'Programming'],
      status: 'open',
    },
  ];

  const availableStudents = [
    {
      id: 1,
      name: 'Sarah Davis',
      skills: ['Python', 'Data Science'],
      department: 'CS',
      experience: '2 years',
    },
    {
      id: 2,
      name: 'Tom Wilson',
      skills: ['UI/UX', 'Frontend'],
      department: 'Design',
      experience: '1 year',
    },
    // Add more students as needed
  ];

  const handleCreateTeam = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSkillChange = (event) => {
    setSelectedSkills(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        Team Formation
      </Typography>

      {/* Search and Filter Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Search by name or skills"
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={selectedDepartment}
                  label="Department"
                  onChange={handleDepartmentChange}
                >
                  <MenuItem value="CS">Computer Science</MenuItem>
                  <MenuItem value="ECE">Electronics</MenuItem>
                  <MenuItem value="Mechanical">Mechanical</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Skills</InputLabel>
                <Select
                  multiple
                  value={selectedSkills}
                  label="Skills"
                  onChange={handleSkillChange}
                >
                  <MenuItem value="Python">Python</MenuItem>
                  <MenuItem value="Machine Learning">Machine Learning</MenuItem>
                  <MenuItem value="UI/UX">UI/UX</MenuItem>
                  <MenuItem value="Frontend">Frontend</MenuItem>
                  <MenuItem value="Backend">Backend</MenuItem>
                  <MenuItem value="Data Science">Data Science</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Suggested Teams */}
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Suggested Teams
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {suggestedTeams.map((team) => (
          <Grid item xs={12} md={6} key={team.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">{team.name}</Typography>
                  <Chip
                    label={team.status === 'pending' ? 'Pending' : 'Open'}
                    color={team.status === 'pending' ? 'warning' : 'success'}
                    size="small"
                  />
                </Box>
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
                            <Box sx={{ mt: 1 }}>
                              {member.skills.map((skill, skillIndex) => (
                                <Chip
                                  key={skillIndex}
                                  label={skill}
                                  size="small"
                                  sx={{ mr: 1 }}
                                />
                              ))}
                            </Box>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Required Skills:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {team.requiredSkills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={<PersonAdd />}
                    size="small"
                  >
                    Join Team
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CheckCircle />}
                    size="small"
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Cancel />}
                    size="small"
                  >
                    Decline
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create New Team Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          startIcon={<Group />}
          onClick={handleCreateTeam}
          sx={{ mb: 4 }}
        >
          Create New Team
        </Button>
      </Box>

      {/* Create Team Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Team</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Team Name"
            margin="normal"
            variant="outlined"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Required Skills</InputLabel>
            <Select
              multiple
              label="Required Skills"
              value={[]}
              onChange={() => {}}
            >
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="Machine Learning">Machine Learning</MenuItem>
              <MenuItem value="UI/UX">UI/UX</MenuItem>
              <MenuItem value="Frontend">Frontend</MenuItem>
              <MenuItem value="Backend">Backend</MenuItem>
              <MenuItem value="Data Science">Data Science</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Team Description"
            margin="normal"
            multiline
            rows={4}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleDialogClose}>
            Create Team
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeamFormation;