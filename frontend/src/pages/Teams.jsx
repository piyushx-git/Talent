import React, { useState, useEffect } from 'react';
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
  Alert,
  CircularProgress,
  Autocomplete
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
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/axiosConfig';

const TeamCard = ({ team, onJoinTeam }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" component="div">
          {team.name}
        </Typography>
        <Chip
          label={team.status}
          color={
            team.status === 'approved' ? 'success' :
            team.status === 'pending' ? 'warning' :
            team.status === 'rejected' ? 'error' : 'default'
          }
          size="small"
        />
      </Box>

      <Typography color="text.secondary" gutterBottom>
        <EmojiEvents sx={{ fontSize: 16, mr: 1, verticalAlign: 'text-bottom' }} />
        {team.competition?.title || 'No Competition'}
      </Typography>

      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Team Members ({team.members.length}/{team.maxSize})
        </Typography>
        <AvatarGroup max={4} sx={{ mb: 2 }}>
          {team.members.map((member, index) => (
            <Tooltip title={member.name} key={index}>
              <Avatar>{member.name[0]}</Avatar>
            </Tooltip>
          ))}
        </AvatarGroup>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Required Skills
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {team.requiredSkills.map((skill, index) => (
            <Chip
              key={index}
              label={skill.name}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      </Box>

      {team.members.length < team.maxSize && (
        <Typography variant="body2" color="text.secondary">
          <Group sx={{ fontSize: 16, mr: 1, verticalAlign: 'text-bottom' }} />
          {team.maxSize - team.members.length} open position(s)
        </Typography>
      )}
    </CardContent>
    <CardActions>
      <Button size="small" color="primary">
        View Details
      </Button>
      {team.status === 'approved' && team.members.length < team.maxSize && (
        <Button 
          size="small" 
          color="secondary"
          onClick={() => onJoinTeam(team._id)}
        >
          Join Team
        </Button>
      )}
    </CardActions>
  </Card>
);

const CreateTeamDialog = ({ open, onClose, competitions, availableSkills, onCreateTeam }) => {
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    competition: '',
    requiredSkills: [],
    maxSize: 4
  });
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [error, setError] = useState('');

  const handleCreateTeam = async () => {
    try {
      if (!newTeam.name || !newTeam.description || !newTeam.competition) {
        setError('Please fill in all required fields');
        return;
      }

      await onCreateTeam({
        ...newTeam,
        requiredSkills: selectedSkills.map(skill => ({ name: skill, category: 'Technical' }))
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create team');
    }
  };

  const handleChange = (field) => (event) => {
    setNewTeam(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Team</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error" onClose={() => setError('')}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Team Name"
            value={newTeam.name}
            onChange={handleChange('name')}
            required
          />
          <FormControl fullWidth>
            <InputLabel>Competition</InputLabel>
            <Select 
              value={newTeam.competition}
              label="Competition"
              onChange={handleChange('competition')}
            >
              {competitions.map((comp) => (
                <MenuItem key={comp._id} value={comp._id}>
                  {comp.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Team Description"
            multiline
            rows={4}
            value={newTeam.description}
            onChange={handleChange('description')}
            required
          />
          <Autocomplete
            multiple
            options={availableSkills}
            getOptionLabel={(option) => option.name}
            value={selectedSkills}
            onChange={(event, newValue) => setSelectedSkills(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Required Skills"
                placeholder="Select skills"
              />
            )}
          />
          <TextField
            fullWidth
            label="Maximum Team Size"
            type="number"
            value={newTeam.maxSize}
            onChange={handleChange('maxSize')}
            InputProps={{ inputProps: { min: 2, max: 10 } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleCreateTeam}
          disabled={!newTeam.name || !newTeam.description || !newTeam.competition}
        >
          Create Team
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Teams = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError('');

      const [teamsResponse, competitionsResponse, skillsResponse] = await Promise.all([
        api.get('/teams'),
        api.get('/competitions'),
        api.get('/skills')
      ]);

      setTeams(teamsResponse.data.data || []);
      setCompetitions(competitionsResponse.data.data || []);
      setAvailableSkills(skillsResponse.data.data || []);
    } catch (err) {
      setError('Failed to fetch initial data');
      console.error('Error fetching initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async (teamData) => {
    try {
      setLoading(true);
      setError('');

      const response = await api.post('/teams', teamData);
      setTeams(prevTeams => [...prevTeams, response.data.data]);
      setSuccess('Team created successfully! It is now pending admin approval.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create team');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTeam = async (teamId) => {
    try {
      setLoading(true);
      setError('');

      const response = await api.post(`/teams/${teamId}/join`);
      setTeams(prevTeams => 
        prevTeams.map(team => 
          team._id === teamId ? response.data.data : team
        )
      );
      setSuccess('Successfully joined the team!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to join team');
    } finally {
      setLoading(false);
    }
  };

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.requiredSkills.some(skill => 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesFilter = filter === 'all' || 
      (filter === 'my-teams' && team.members.some(member => member._id === user?._id)) ||
      (filter === 'active' && team.status === 'approved') ||
      (filter === 'recruiting' && team.status === 'approved' && team.members.length < team.maxSize);

    return matchesSearch && matchesFilter;
  });

  return (
    <Box sx={{ py: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

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
                <MenuItem value="my-teams">My Teams</MenuItem>
                <MenuItem value="active">Active Teams</MenuItem>
                <MenuItem value="recruiting">Recruiting</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {/* Teams Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <Grid item xs={12} sm={6} md={4} key={team._id}>
              <TeamCard team={team} onJoinTeam={handleJoinTeam} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" align="center">
              No teams found matching your criteria
            </Typography>
          </Grid>
        )}
      </Grid>

      <CreateTeamDialog
        open={createTeamOpen}
        onClose={() => setCreateTeamOpen(false)}
        competitions={competitions}
        availableSkills={availableSkills}
        onCreateTeam={handleCreateTeam}
      />
    </Box>
  );
};

export default Teams; 