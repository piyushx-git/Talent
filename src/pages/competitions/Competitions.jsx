import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  Search,
  EmojiEvents,
  CalendarToday,
  Group,
  Add,
  FilterList,
} from '@mui/icons-material';

const Competitions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - replace with actual data from your backend
  const competitions = [
    {
      id: 1,
      name: 'Hackathon 2024',
      category: 'Programming',
      date: '2024-04-15',
      deadline: '2024-04-10',
      maxTeamSize: 4,
      description: 'Build innovative solutions for smart cities using AI and IoT.',
      status: 'Open',
      skills: ['AI', 'IoT', 'Web Development'],
    },
    {
      id: 2,
      name: 'Robotics Challenge',
      category: 'Robotics',
      date: '2024-05-01',
      deadline: '2024-04-25',
      maxTeamSize: 3,
      description: 'Design and build an autonomous robot for warehouse automation.',
      status: 'Open',
      skills: ['Robotics', 'AI', 'Mechanical Engineering'],
    },
    {
      id: 3,
      name: 'Drone Design Competition',
      category: 'Aviation',
      date: '2024-06-15',
      deadline: '2024-06-01',
      maxTeamSize: 4,
      description: 'Create an efficient and sustainable drone design.',
      status: 'Upcoming',
      skills: ['Aerospace', 'Design', 'Engineering'],
    },
  ];

  const categories = ['all', 'Programming', 'Robotics', 'Aviation', 'AI/ML'];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const filteredCompetitions = competitions.filter(competition => {
    const matchesSearch = competition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         competition.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || competition.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Competitions</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenDialog}
        >
          Create Competition
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search competitions..."
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
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
      >
        <Tab label="All" />
        <Tab label="Open" />
        <Tab label="Upcoming" />
        <Tab label="Past" />
      </Tabs>

      <Grid container spacing={3}>
        {filteredCompetitions.map((competition) => (
          <Grid item xs={12} md={6} lg={4} key={competition.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {competition.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={competition.category}
                    color="primary"
                    size="small"
                  />
                  <Chip
                    label={competition.status}
                    color={competition.status === 'Open' ? 'success' : 'default'}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {competition.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CalendarToday fontSize="small" />
                  <Typography variant="body2">
                    {competition.date}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Group fontSize="small" />
                  <Typography variant="body2">
                    Max Team Size: {competition.maxTeamSize}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {competition.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<EmojiEvents />}
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create Competition Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Competition</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Competition Name"
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select label="Category">
                {categories.slice(1).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
            />
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Registration Deadline"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Maximum Team Size"
              type="number"
              fullWidth
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            Create Competition
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Competitions; 