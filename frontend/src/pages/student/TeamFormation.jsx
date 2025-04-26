import React, { useState, useEffect } from 'react';
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
  Alert,
  Snackbar,
  CircularProgress,
  Autocomplete
} from '@mui/material';
import {
  Group,
  PersonAdd,
  CheckCircle,
  Cancel,
  Search,
  FilterList,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../utils/axiosConfig';

const TeamFormation = () => {
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [teams, setTeams] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    competition: '',
    requiredSkills: [],
    maxSize: 4
  });

  // Fetch initial data
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch all required data in parallel
      const [teamsResponse, competitionsResponse, skillsResponse] = await Promise.all([
        api.get('/teams'),
        api.get('/competitions'),
        api.get('/skills') // Assuming you have a skills endpoint
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

  const handleCreateTeam = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.post('/teams', {
        ...newTeam,
        requiredSkills: selectedSkills.map(skill => ({ name: skill, category: 'Technical' }))
      });

      setTeams(prevTeams => [...prevTeams, response.data.data]);
      setSuccess('Team created successfully! It is now pending admin approval.');
      setOpenDialog(false);
      setNewTeam({
        name: '',
        description: '',
        competition: '',
        requiredSkills: [],
        maxSize: 4
      });
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

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewTeam({
      name: '',
      description: '',
      competition: '',
      requiredSkills: [],
      maxSize: 4
    });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSkillChange = (event, newValue) => {
    setSelectedSkills(newValue);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleNewTeamChange = (field) => (event) => {
    setNewTeam(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  // Filter teams based on search and filters
  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.requiredSkills.some(skill => 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesDepartment = !selectedDepartment || 
      team.members.some(member => member.department === selectedDepartment);

    const matchesSkills = selectedSkills.length === 0 ||
      selectedSkills.every(skill => 
        team.requiredSkills.some(requiredSkill => requiredSkill.name === skill)
      );

    return matchesSearch && matchesDepartment && matchesSkills;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        Team Formation
      </Typography>

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
                  <MenuItem value="">All Departments</MenuItem>
                  <MenuItem value="CS">Computer Science</MenuItem>
                  <MenuItem value="ECE">Electronics</MenuItem>
                  <MenuItem value="Mechanical">Mechanical</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <Autocomplete
                  multiple
                  options={availableSkills}
                  getOptionLabel={(option) => option.name}
                  value={selectedSkills}
                  onChange={handleSkillChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Skills"
                      placeholder="Select skills"
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Create Team Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<Group />}
          onClick={() => setOpenDialog(true)}
        >
          Create New Team
        </Button>
      </Box>

      {/* Teams List */}
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Available Teams
      </Typography>
      <Grid container spacing={3}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <Grid item xs={12} md={6} key={team._id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">{team.name}</Typography>
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
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {team.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Required Skills:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {team.members.length} / {team.maxSize} members
                    </Typography>
                    {team.status === 'approved' && !team.members.some(member => member._id === user?._id) && (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleJoinTeam(team._id)}
                        disabled={team.members.length >= team.maxSize}
                      >
                        Join Team
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
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

      {/* Create Team Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Team</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Team Name"
              value={newTeam.name}
              onChange={handleNewTeamChange('name')}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={newTeam.description}
              onChange={handleNewTeamChange('description')}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Competition</InputLabel>
              <Select
                value={newTeam.competition}
                label="Competition"
                onChange={handleNewTeamChange('competition')}
              >
                {competitions.map((comp) => (
                  <MenuItem key={comp._id} value={comp._id}>
                    {comp.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Autocomplete
              multiple
              options={availableSkills}
              getOptionLabel={(option) => option.name}
              value={selectedSkills}
              onChange={handleSkillChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Required Skills"
                  placeholder="Select skills"
                />
              )}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              label="Maximum Team Size"
              value={newTeam.maxSize}
              onChange={handleNewTeamChange('maxSize')}
              inputProps={{ min: 2, max: 10 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            onClick={handleCreateTeam} 
            variant="contained"
            disabled={!newTeam.name || !newTeam.description || !newTeam.competition}
          >
            Create Team
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeamFormation;