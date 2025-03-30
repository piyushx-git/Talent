import React, { useState } from 'react';
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
} from '@mui/icons-material';

const CompetitionCard = ({ competition, onViewDetails }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
    <CardMedia
      component="img"
      height="140"
      image={competition.image}
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
          color={competition.status === 'upcoming' ? 'primary' : 'success'}
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
            <Typography variant="body2">{competition.location}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Group sx={{ fontSize: 16, mr: 1 }} />
            <Typography variant="body2">Team Size: {competition.teamSize}</Typography>
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
      <Button size="small" color="secondary">
        Register Team
      </Button>
    </CardActions>
  </Card>
);

const CompetitionDetailsDialog = ({ competition, open, onClose }) => {
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
              image={competition.image}
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
                  secondary={competition.location}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText
                  primary="Team Size"
                  secondary={competition.teamSize}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Category />
                </ListItemIcon>
                <ListItemText
                  primary="Category"
                  secondary={competition.type}
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Prizes
            </Typography>
            <List>
              {competition.prizes.map((prize, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <EmojiEvents />
                  </ListItemIcon>
                  <ListItemText primary={prize} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Requirements
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {competition.requirements.map((req, index) => (
                <Chip key={index} label={req} variant="outlined" />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Important Milestones
            </Typography>
            <List>
              {competition.milestones.map((milestone, index) => (
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
        <Button variant="contained" color="primary">
          Register Team
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Competitions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  // Mock competition data
  const competitions = [
    {
      id: 1,
      title: 'Smart City Hackathon 2024',
      image: 'https://img.freepik.com/free-vector/hackathon-doodle-hand-drawing-team-programmers-web-developers-managers-graphic-designers-deve_88138-1348.jpg',
      description: 'Develop innovative solutions for smart city challenges using IoT and AI.',
      startDate: '2024-04-15',
      endDate: '2024-04-17',
      location: 'Virtual',
      teamSize: '3-5',
      status: 'upcoming',
      type: 'Hackathon',
      prizes: ['$5000 First Prize', '$3000 Second Prize', '$1000 Third Prize'],
      requirements: [
        'IoT experience',
        'AI/ML knowledge',
        'Web development skills',
      ],
      milestones: [
        'Team Registration - March 30',
        'Project Proposal - April 5',
        'Development Phase - April 15-17',
        'Final Submission - April 17',
      ],
    },
    {
      id: 2,
      title: 'Drone Design Competition',
      image: 'https://images.squarespace-cdn.com/content/v1/5e6542d2ae16460bb741a9eb/1603318636443-A846ACUKNYUBA0RPLJ94/marvin-meyer-SYTO3xs06fU-unsplash.jpg',
      description: 'Design and build an autonomous drone for agricultural monitoring.',
      startDate: '2024-05-01',
      endDate: '2024-06-30',
      location: 'On-campus',
      teamSize: '4-6',
      status: 'open',
      type: 'Engineering',
      prizes: ['$10000 First Prize', '$5000 Second Prize', '$2000 Third Prize'],
      requirements: [
        'Mechanical engineering',
        'Electronics',
        'Programming skills',
      ],
      milestones: [
        'Design Submission - May 15',
        'Prototype Development - June 1',
        'Testing Phase - June 15',
        'Final Demonstration - June 30',
      ],
    },
  ];

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Competitions
      </Typography>

      <Grid container spacing={3}>
        {/* Search and Filter Section */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2 }}>
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
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Filter</InputLabel>
              <Select
                value={filter}
                label="Filter"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="all">All Competitions</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="open">Open for Registration</MenuItem>
                <MenuItem value="ongoing">Ongoing</MenuItem>
                <MenuItem value="past">Past</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {/* Competitions Grid */}
        {competitions.map((competition) => (
          <Grid item xs={12} sm={6} md={4} key={competition.id}>
            <CompetitionCard
              competition={competition}
              onViewDetails={setSelectedCompetition}
            />
          </Grid>
        ))}
      </Grid>

      {/* Competition Details Dialog */}
      <CompetitionDetailsDialog
        competition={selectedCompetition}
        open={Boolean(selectedCompetition)}
        onClose={() => setSelectedCompetition(null)}
      />
    </Box>
  );
};

export default Competitions; 