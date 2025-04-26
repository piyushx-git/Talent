import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Avatar,
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
  Rating,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Stack,
} from '@mui/material';
import {
  Search,
  School,
  Star,
  Schedule,
  Email,
  LinkedIn,
  CalendarToday,
  Assignment,
  WorkspacePremium,
  Message,
} from '@mui/icons-material';

const MentorCard = ({ mentor, onViewProfile, onRequestMentorship }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          component="img"
          src={mentor.photo}
          alt={mentor.name}
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid',
            borderColor: 'primary.main',
            mr: 2,
          }}
        />
        <Box>
          <Typography variant="h6" component="div">
            {mentor.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mentor.title}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Rating value={mentor.rating} precision={0.1} readOnly size="small" />
        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
          ({mentor.reviews} reviews)
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Expertise
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {mentor.expertise.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Schedule sx={{ fontSize: 16, mr: 1 }} />
        <Typography variant="body2">
          Available: {mentor.availability}
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary">
        Mentees: {mentor.currentMentees}/{mentor.maxMentees}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        size="small"
        color="primary"
        onClick={() => onViewProfile(mentor)}
      >
        View Profile
      </Button>
      <Button
        size="small"
        color="secondary"
        onClick={() => onRequestMentorship(mentor)}
        disabled={mentor.currentMentees >= mentor.maxMentees}
      >
        Request Mentorship
      </Button>
    </CardActions>
  </Card>
);

const MentorDetailsDialog = ({ mentor, open, onClose, onRequestMentorship }) => {
  if (!mentor) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={mentor.photo}
            sx={{ width: 64, height: 64 }}
          />
          <Box>
            <Typography variant="h6">{mentor.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {mentor.title}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body1" paragraph>
              {mentor.bio}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Expertise & Experience
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                {mentor.expertise.map((skill, index) => (
                  <Chip key={index} label={skill} />
                ))}
              </Box>
              <Typography variant="body2">
                Experience: {mentor.experience}
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom>
              Achievements
            </Typography>
            <List>
              {mentor.achievements.map((achievement, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                      <WorkspacePremium />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={achievement} />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Past Projects
            </Typography>
            <List>
              {mentor.projects.map((project, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'secondary.light' }}>
                      <Assignment />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={project} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onRequestMentorship(mentor);
            onClose();
          }}
          disabled={mentor.currentMentees >= mentor.maxMentees}
        >
          Request Mentorship
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const MentorshipRequestDialog = ({ mentor, open, onClose }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Add mentorship request logic here
    onClose();
  };

  if (!mentor) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Request Mentorship</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Requesting mentorship from {mentor.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please provide details about your goals and what you hope to learn
              from this mentorship.
            </Typography>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Message to Mentor"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Explain your goals, interests, and why you'd like to work with this mentor..."
          />
          <FormControl fullWidth>
            <InputLabel>Preferred Meeting Schedule</InputLabel>
            <Select
              label="Preferred Meeting Schedule"
              value=""
            >
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="biweekly">Bi-weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Specific Areas of Interest"
            placeholder="List specific topics or skills you want to focus on"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!message.trim()}
        >
          Send Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Mentorship = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [requestDialog, setRequestDialog] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

  // Mock mentor data
  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'AI Research Scientist',
      photo: 'https://xsgames.co/randomusers/assets/avatars/female/1.jpg',
      expertise: ['Machine Learning', 'Deep Learning', 'Computer Vision'],
      rating: 4.8,
      reviews: 24,
      availability: 'Mon, Wed, Fri',
      experience: '10+ years',
      bio: 'Leading AI researcher with expertise in machine learning and computer vision. Published in top conferences and journals.',
      currentMentees: 3,
      maxMentees: 5,
      achievements: [
        'Best Paper Award - ICML 2023',
        'IEEE Fellow',
        '20+ Patents'
      ],
      projects: [
        'Autonomous Vehicle Vision Systems',
        'Medical Image Analysis',
        'Robotics AI'
      ],
      contact: {
        email: 'sarah.johnson@university.edu',
        linkedin: 'linkedin.com/in/sarahjohnson'
      }
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      title: 'Software Architecture Expert',
      photo: 'https://xsgames.co/randomusers/assets/avatars/male/1.jpg',
      expertise: ['System Design', 'Cloud Architecture', 'Microservices'],
      rating: 4.9,
      reviews: 18,
      availability: 'Tue, Thu, Sat',
      experience: '15+ years',
      bio: 'Senior software architect with extensive experience in building scalable systems. Former tech lead at major tech companies.',
      currentMentees: 2,
      maxMentees: 4,
      achievements: [
        'Distinguished Engineer Award',
        'Cloud Certified Expert',
        'Tech Conference Speaker'
      ],
      projects: [
        'Cloud Migration Framework',
        'Enterprise Architecture Design',
        'Scalable E-commerce Platform'
      ],
      contact: {
        email: 'michael.chen@university.edu',
        linkedin: 'linkedin.com/in/michaelchen'
      }
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      title: 'Cybersecurity Specialist',
      photo: 'https://xsgames.co/randomusers/assets/avatars/female/2.jpg',
      expertise: ['Network Security', 'Ethical Hacking', 'Security Architecture'],
      rating: 4.7,
      reviews: 12,
      availability: 'Mon, Wed, Fri',
      experience: '8+ years',
      bio: 'Cybersecurity expert specializing in network security and ethical hacking. Regular contributor to security conferences.',
      currentMentees: 1,
      maxMentees: 3,
      achievements: [
        'CISSP Certification',
        'Security Research Awards',
        'Published Security Author'
      ],
      projects: [
        'Enterprise Security Framework',
        'Penetration Testing Tools',
        'Security Awareness Program'
      ],
      contact: {
        email: 'emily.rodriguez@university.edu',
        linkedin: 'linkedin.com/in/emilyrodriguez'
      }
    }
  ];

  const handleRequestMentorship = (mentor) => {
    setSelectedMentor(mentor);
    setRequestDialog(true);
  };

  const handleSendRequest = () => {
    // Here you would typically send the request to the backend
    console.log('Sending request to:', selectedMentor.name, 'Message:', requestMessage);
    setRequestDialog(false);
    setRequestMessage('');
    setSelectedMentor(null);
  };

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Find a Mentor
      </Typography>

      <Grid container spacing={3}>
        {/* Search and Filter Section */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              placeholder="Search mentors by name or expertise..."
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
                <MenuItem value="all">All Mentors</MenuItem>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="computer-science">Computer Science</MenuItem>
                <MenuItem value="engineering">Engineering</MenuItem>
                <MenuItem value="my-mentors">My Mentors</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {/* Mentors Grid */}
        {mentors.map((mentor) => (
          <Grid item xs={12} sm={6} md={4} key={mentor.id}>
            <MentorCard
              mentor={mentor}
              onViewProfile={setSelectedMentor}
              onRequestMentorship={handleRequestMentorship}
            />
          </Grid>
        ))}
      </Grid>

      {/* Mentor Details Dialog */}
      <MentorDetailsDialog
        mentor={selectedMentor}
        open={Boolean(selectedMentor) && !requestDialog}
        onClose={() => setSelectedMentor(null)}
        onRequestMentorship={handleRequestMentorship}
      />

      {/* Mentorship Request Dialog */}
      <Dialog open={requestDialog} onClose={() => setRequestDialog(false)}>
        <DialogTitle>Request Mentorship</DialogTitle>
        <DialogContent>
          {selectedMentor && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">
                Sending request to {selectedMentor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please describe your goals and what you'd like to learn
              </Typography>
            </Box>
          )}
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            label="Your Message"
            value={requestMessage}
            onChange={(e) => setRequestMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRequestDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSendRequest}
            variant="contained"
            disabled={!requestMessage.trim()}
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Mentorship; 