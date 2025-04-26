import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
  Stack,
  IconButton,
  Pagination,
} from '@mui/material';
import {
  Search,
  CalendarToday,
  Group,
  EmojiEvents,
  LocationOn,
  Timer,
  Assignment,
  CheckCircle,
  Public,
  Category,
  Add,
  Close,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/axiosConfig';

const CompetitionCard = ({ competition, onViewDetails, onRegister, onUpdate, onDelete, isOrganizer }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
    <CardMedia
      component="img"
      height="140"
      image={competition.image || 'https://source.unsplash.com/random/800x600/?competition'}
      alt={competition.title}
      sx={{ objectFit: 'cover' }}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" component="div">
          {competition.title}
        </Typography>
        <Chip
          label={competition.status}
          color={
            competition.status === 'approved' ? 'success' :
            competition.status === 'pending' ? 'warning' :
            competition.status === 'rejected' ? 'error' : 'default'
          }
          size="small"
        />
      </Box>

      <Typography color="text.secondary" paragraph>
        {competition.description}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CalendarToday sx={{ fontSize: 16, mr: 1 }} />
            <Typography variant="body2">
              {new Date(competition.startDate).toLocaleDateString()}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationOn sx={{ fontSize: 16, mr: 1 }} />
            <Typography variant="body2">
              {competition.location?.type === 'online' ? 'Online' : competition.location?.address}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Group sx={{ fontSize: 16, mr: 1 }} />
            <Typography variant="body2">
              Team Size: {competition.maxParticipants}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
    <CardActions>
      <Button
        size="small"
        color="primary"
        onClick={() => onViewDetails(competition)}
      >
        View Details
      </Button>
      {competition.status === 'approved' && (
        <Button 
          size="small" 
          color="secondary"
          onClick={() => onRegister(competition._id)}
        >
          Register
        </Button>
      )}
      {isOrganizer && (
        <>
          <Button
            size="small"
            color="primary"
            onClick={() => onUpdate(competition._id, { status: 'approved' })}
          >
            Approve
          </Button>
          <Button
            size="small"
            color="warning"
            onClick={() => onUpdate(competition._id, { status: 'pending' })}
          >
            Pending
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => onUpdate(competition._id, { status: 'rejected' })}
          >
            Reject
          </Button>
        </>
      )}
      {isOrganizer && (
        <Button
          size="small"
          color="error"
          onClick={() => onDelete(competition._id)}
        >
          Delete
        </Button>
      )}
    </CardActions>
  </Card>
);

const CompetitionDetailsDialog = ({ competition, open, onClose, onRegister, onUpdate, onDelete, isOrganizer }) => {
  if (!competition) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmojiEvents color="primary" />
          {competition.title}
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CardMedia
              component="img"
              height="200"
              image={competition.image || 'https://source.unsplash.com/random/800x600/?competition'}
              alt={competition.title}
              sx={{ borderRadius: 1, mb: 2 }}
            />
            <Typography variant="body1" paragraph>
              {competition.description}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Key Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CalendarToday />
                </ListItemIcon>
                <ListItemText
                  primary="Duration"
                  secondary={`${new Date(competition.startDate).toLocaleDateString()} - ${new Date(competition.endDate).toLocaleDateString()}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOn />
                </ListItemIcon>
                <ListItemText
                  primary="Location"
                  secondary={competition.location?.type === 'online' ? 'Online' : competition.location?.address}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText
                  primary="Team Size"
                  secondary={competition.maxParticipants}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Category />
                </ListItemIcon>
                <ListItemText
                  primary="Categories"
                  secondary={competition.categories?.join(', ') || 'N/A'}
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Prizes
            </Typography>
            <List>
              {competition.prizes?.map((prize, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <EmojiEvents />
                  </ListItemIcon>
                  <ListItemText 
                    primary={`${prize.position}${prize.position === 1 ? 'st' : prize.position === 2 ? 'nd' : 'rd'} Place`}
                    secondary={prize.description}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Requirements
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {competition.requirements?.split(',').map((req, index) => (
                <Chip key={index} label={req.trim()} variant="outlined" />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Important Milestones
            </Typography>
            <List>
              {competition.milestones?.map((milestone, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Timer />
                  </ListItemIcon>
                  <ListItemText primary={milestone} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {competition.status === 'approved' && (
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              onRegister(competition._id);
              onClose();
            }}
          >
            Register Now
          </Button>
        )}
        {isOrganizer && (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onUpdate(competition._id, { status: 'approved' })}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => onUpdate(competition._id, { status: 'pending' })}
            >
              Pending
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => onUpdate(competition._id, { status: 'rejected' })}
            >
              Reject
            </Button>
          </>
        )}
        {isOrganizer && (
          <Button
            variant="contained"
            color="error"
            onClick={() => onDelete(competition._id)}
          >
            Delete
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

const CreateCompetitionDialog = ({ open, onClose, onCreateCompetition }) => {
  const [newCompetition, setNewCompetition] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    maxParticipants: 4,
    location: {
      type: 'online',
      address: ''
    },
    categories: [],
    requirements: '',
    prizes: [
      { position: 1, description: '' },
      { position: 2, description: '' },
      { position: 3, description: '' }
    ],
    milestones: []
  });
  const [error, setError] = useState('');

  const handleCreateCompetition = async () => {
    try {
      if (!newCompetition.title || !newCompetition.description || 
          !newCompetition.startDate || !newCompetition.endDate || 
          !newCompetition.registrationDeadline) {
        setError('Please fill in all required fields');
        return;
      }

      await onCreateCompetition(newCompetition);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create competition');
    }
  };

  const handleChange = (field) => (event) => {
    if (field === 'location') {
      setNewCompetition(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [event.target.name]: event.target.value
        }
      }));
    } else {
      setNewCompetition(prev => ({
        ...prev,
        [field]: event.target.value
      }));
    }
  };

  const handleAddMilestone = () => {
    setNewCompetition(prev => ({
      ...prev,
      milestones: [...prev.milestones, '']
    }));
  };

  const handleMilestoneChange = (index) => (event) => {
    const newMilestones = [...newCompetition.milestones];
    newMilestones[index] = event.target.value;
    setNewCompetition(prev => ({
      ...prev,
      milestones: newMilestones
    }));
  };

  const handleRemoveMilestone = (index) => () => {
    const newMilestones = newCompetition.milestones.filter((_, i) => i !== index);
    setNewCompetition(prev => ({
      ...prev,
      milestones: newMilestones
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Competition</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error" onClose={() => setError('')}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Competition Title"
            value={newCompetition.title}
            onChange={handleChange('title')}
            required
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={newCompetition.description}
            onChange={handleChange('description')}
            required
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={newCompetition.startDate}
                onChange={handleChange('startDate')}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                value={newCompetition.endDate}
                onChange={handleChange('endDate')}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Registration Deadline"
            type="date"
            value={newCompetition.registrationDeadline}
            onChange={handleChange('registrationDeadline')}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Maximum Participants"
            type="number"
            value={newCompetition.maxParticipants}
            onChange={handleChange('maxParticipants')}
            InputProps={{ inputProps: { min: 1 } }}
            required
          />
          <FormControl fullWidth>
            <InputLabel>Location Type</InputLabel>
            <Select
              value={newCompetition.location.type}
              label="Location Type"
              onChange={handleChange('location')}
              name="type"
            >
              <MenuItem value="online">Online</MenuItem>
              <MenuItem value="physical">Physical</MenuItem>
            </Select>
          </FormControl>
          {newCompetition.location.type === 'physical' && (
            <TextField
              fullWidth
              label="Address"
              value={newCompetition.location.address}
              onChange={handleChange('location')}
              name="address"
              required
            />
          )}
          <TextField
            fullWidth
            label="Categories (comma-separated)"
            value={newCompetition.categories.join(', ')}
            onChange={(e) => setNewCompetition(prev => ({
              ...prev,
              categories: e.target.value.split(',').map(cat => cat.trim())
            }))}
            helperText="Enter categories separated by commas"
          />
          <TextField
            fullWidth
            label="Requirements (comma-separated)"
            value={newCompetition.requirements}
            onChange={handleChange('requirements')}
            helperText="Enter requirements separated by commas"
          />
          <Typography variant="subtitle1">Prizes</Typography>
          {newCompetition.prizes.map((prize, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={`${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : 'rd'} Place Prize`}
                  value={prize.description}
                  onChange={(e) => {
                    const newPrizes = [...newCompetition.prizes];
                    newPrizes[index] = { ...prize, description: e.target.value };
                    setNewCompetition(prev => ({
                      ...prev,
                      prizes: newPrizes
                    }));
                  }}
                />
              </Grid>
            </Grid>
          ))}
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Important Milestones
            </Typography>
            {newCompetition.milestones.map((milestone, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  label={`Milestone ${index + 1}`}
                  value={milestone}
                  onChange={handleMilestoneChange(index)}
                />
                <IconButton onClick={handleRemoveMilestone(index)}>
                  <Close />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<Add />}
              onClick={handleAddMilestone}
              sx={{ mt: 1 }}
            >
              Add Milestone
            </Button>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleCreateCompetition}
          disabled={!newCompetition.title || !newCompetition.description || 
                   !newCompetition.startDate || !newCompetition.endDate || 
                   !newCompetition.registrationDeadline}
        >
          Create Competition
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Competitions = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('startDate');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchCompetitions();
  }, [page, sortBy, sortOrder]);

  const fetchCompetitions = async () => {
    try {
      setLoading(true);
      setError('');

      const params = {
        page,
        limit: 9,
        sortBy,
        sortOrder,
        search: searchQuery,
        filter
      };

      const response = await api.get('/competitions', { params });
      setCompetitions(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      setError('Failed to fetch competitions');
      console.error('Error fetching competitions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Debounce the search
    const timeoutId = setTimeout(() => {
      fetchCompetitions();
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(1); // Reset to first page when filter changes
    fetchCompetitions();
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCreateCompetition = async (competitionData) => {
    try {
      setLoading(true);
      setError('');

      const response = await api.post('/competitions', competitionData);
      setCompetitions(prev => [response.data.data, ...prev]);
      setSuccess('Competition created successfully! It is now pending admin approval.');
      setCreateDialogOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create competition');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (competitionId) => {
    try {
      setLoading(true);
      setError('');

      await api.post(`/competitions/${competitionId}/register`);
      setSuccess('Successfully registered for the competition!');
      fetchCompetitions(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register for competition');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCompetition = async (competitionId, updates) => {
    try {
      setLoading(true);
      setError('');

      const response = await api.patch(`/competitions/${competitionId}`, updates);
      setCompetitions(prev => 
        prev.map(comp => 
          comp._id === competitionId ? response.data.data : comp
        )
      );
      setSuccess('Competition updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update competition');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCompetition = async (competitionId) => {
    try {
      setLoading(true);
      setError('');

      await api.delete(`/competitions/${competitionId}`);
      setCompetitions(prev => prev.filter(comp => comp._id !== competitionId));
      setSuccess('Competition deleted successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete competition');
    } finally {
      setLoading(false);
    }
  };

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
        <Typography variant="h4">Competitions</Typography>
        {user?.role === 'organizer' && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setCreateDialogOpen(true)}
          >
            Create Competition
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Search and Filter Section */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              placeholder="Search competitions..."
              value={searchQuery}
              onChange={handleSearch}
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
                onChange={handleFilterChange}
              >
                <MenuItem value="all">All Competitions</MenuItem>
                <MenuItem value="my-competitions">My Competitions</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="past">Past</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => handleSort(e.target.value)}
              >
                <MenuItem value="startDate">Start Date</MenuItem>
                <MenuItem value="endDate">End Date</MenuItem>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="maxParticipants">Participants</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {/* Competitions Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : competitions.length > 0 ? (
          <>
            {competitions.map((competition) => (
              <Grid item xs={12} sm={6} md={4} key={competition._id}>
                <CompetitionCard
                  competition={competition}
                  onViewDetails={setSelectedCompetition}
                  onRegister={handleRegister}
                  onUpdate={handleUpdateCompetition}
                  onDelete={handleDeleteCompetition}
                  isOrganizer={user?.role === 'organizer'}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" align="center">
              No competitions found matching your criteria
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Competition Details Dialog */}
      <CompetitionDetailsDialog
        competition={selectedCompetition}
        open={Boolean(selectedCompetition)}
        onClose={() => setSelectedCompetition(null)}
        onRegister={handleRegister}
        onUpdate={handleUpdateCompetition}
        onDelete={handleDeleteCompetition}
        isOrganizer={user?.role === 'organizer'}
      />

      {/* Create Competition Dialog */}
      <CreateCompetitionDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onCreateCompetition={handleCreateCompetition}
      />
    </Box>
  );
};

export default Competitions; 