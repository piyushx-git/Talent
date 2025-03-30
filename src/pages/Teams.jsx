import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  AvatarGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from '@mui/material';
import {
  Search,
  Add,
  FilterList,
  Group,
  EmojiEvents,
  School,
  Close as CloseIcon,
} from '@mui/icons-material';

const TeamCard = ({ team }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" component="div">
          {team.name}
        </Typography>
        <Chip
          label={team.status}
          color={team.status === 'active' ? 'success' : 'warning'}
          size="small"
        />
      </Box>

      <Typography color="text.secondary" gutterBottom>
        <EmojiEvents sx={{ fontSize: 16, mr: 1, verticalAlign: 'text-bottom' }} />
        {team.competition}
      </Typography>

      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Team Members
        </Typography>
        <AvatarGroup max={4} sx={{ mb: 2 }}>
          {team.members.map((member, index) => (
            <Tooltip title={member.name} key={index}>
              <Avatar src={member.avatar}>{member.name[0]}</Avatar>
            </Tooltip>
          ))}
        </AvatarGroup>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Required Skills
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {team.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      </Box>

      {team.openPositions > 0 && (
        <Typography variant="body2" color="text.secondary">
          <Group sx={{ fontSize: 16, mr: 1, verticalAlign: 'text-bottom' }} />
          {team.openPositions} open position(s)
        </Typography>
      )}
    </CardContent>
    <CardActions>
      <Button size="small" color="primary">
        View Details
      </Button>
      {team.status === 'recruiting' && (
        <Button size="small" color="secondary">
          Apply to Join
        </Button>
      )}
    </CardActions>
  </Card>
);

const CreateTeamDialog = ({ open, onClose }) => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Team</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Team Name"
            required
          />
          <FormControl fullWidth>
            <InputLabel>Competition</InputLabel>
            <Select label="Competition">
              <MenuItem value="hackathon">Hackathon 2024</MenuItem>
              <MenuItem value="drone">Drone Design Competition</MenuItem>
              <MenuItem value="smart-city">Smart City Challenge</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Team Description"
            multiline
            rows={4}
          />
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Required Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
              {skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() => handleRemoveSkill(skill)}
                  size="small"
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                label="Add Skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <Button variant="outlined" onClick={handleAddSkill}>
                Add
              </Button>
            </Box>
          </Box>
          <TextField
            fullWidth
            label="Maximum Team Size"
            type="number"
            InputProps={{ inputProps: { min: 2, max: 10 } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onClose}>
          Create Team
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Teams = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [createTeamOpen, setCreateTeamOpen] = useState(false);

  // Mock team data
  const teams = [
    {
      id: 1,
      name: 'Team Alpha',
      competition: 'Hackathon 2024',
      members: [
        { name: 'John Doe', avatar: '/avatars/1.jpg' },
        { name: 'Jane Smith', avatar: '/avatars/2.jpg' },
        { name: 'Mike Johnson', avatar: '/avatars/3.jpg' },
      ],
      skills: ['React', 'Node.js', 'AI/ML'],
      status: 'active',
      openPositions: 2,
    },
    {
      id: 2,
      name: 'Drone Masters',
      competition: 'Drone Design Competition',
      members: [
        { name: 'Alice Brown', avatar: '/avatars/4.jpg' },
        { name: 'Bob Wilson', avatar: '/avatars/5.jpg' },
      ],
      skills: ['Mechanical Design', 'Electronics', 'Control Systems'],
      status: 'recruiting',
      openPositions: 3,
    },
  ];

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Teams</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setCreateTeamOpen(true)}
        >
          Create Team
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Search and Filter Section */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Filter</InputLabel>
              <Select
                value={filter}
                label="Filter"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="all">All Teams</MenuItem>
                <MenuItem value="active">Active Teams</MenuItem>
                <MenuItem value="recruiting">Recruiting</MenuItem>
                <MenuItem value="my-teams">My Teams</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {/* Teams Grid */}
        {teams.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            <TeamCard team={team} />
          </Grid>
        ))}
      </Grid>

      <CreateTeamDialog
        open={createTeamOpen}
        onClose={() => setCreateTeamOpen(false)}
      />
    </Box>
  );
};

export default Teams; 