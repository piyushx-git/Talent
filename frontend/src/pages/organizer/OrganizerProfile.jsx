import React, { useState, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  TextField,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  EmojiEvents,
  Work,
  Business,
  LinkedIn,
  GitHub,
  Email,
  Phone,
  LocationOn,
  CameraAlt,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  Assessment,
  Group,
  Assignment,
} from '@mui/icons-material';

const OrganizerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState({
    name: 'John Smith',
    designation: 'Technical Events Coordinator',
    department: 'Computer Science',
    year: '3rd Year',
    studentId: 'CS2021001',
    email: 'john.smith@university.edu',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate student leader and technical event organizer. Currently serving as the Technical Events Coordinator in the University Student Council. Experienced in organizing hackathons, coding competitions, and technical workshops.',
    expertise: ['Event Management', 'Technical Competitions', 'Team Building', 'Project Management', 'Student Leadership'],
    experience: [
      {
        organization: 'University Student Council',
        position: 'Technical Events Coordinator',
        duration: '2023 - Present',
        description: 'Leading technical events and competitions for the student community.',
      },
      {
        organization: 'Computer Science Society',
        position: 'Events Committee Member',
        duration: '2022 - 2023',
        description: 'Organized coding competitions and technical workshops.',
      },
    ],
    certifications: [
      {
        name: 'Student Leadership Program',
        issuer: 'University Leadership Institute',
        year: '2023',
      },
      {
        name: 'Event Management Workshop',
        issuer: 'Student Affairs Office',
        year: '2022',
      },
    ],
    competitionStats: {
      competitionsOrganized: 15,
      teamsParticipated: 120,
      totalParticipants: 480,
      averageRating: 4.7,
      activeCompetitions: 3,
      upcomingEvents: 2,
    },
    councilInfo: {
      position: 'Technical Events Coordinator',
      council: 'University Student Council',
      term: '2023-2024',
      committee: 'Technical Events Committee',
      responsibilities: [
        'Organizing technical competitions and hackathons',
        'Coordinating with faculty mentors',
        'Managing competition budgets',
        'Liaising with industry partners',
        'Promoting technical events across departments'
      ],
    },
    academicInfo: {
      currentSemester: '6th Semester',
      cgpa: '8.5/10',
      relevantCourses: [
        'Software Engineering',
        'Project Management',
        'Event Management',
        'Leadership Development'
      ],
      achievements: [
        'Best Technical Event Organizer Award 2023',
        'Student Council Excellence Award',
        'Department Topper in Event Management'
      ]
    },
    contact: {
      phone: '+1 234 567 8900',
      location: 'San Francisco, CA',
      office: 'Room 201, Student Council Building',
      socialMedia: {
        linkedin: 'linkedin.com/in/johnsmith',
        github: 'github.com/johnsmith',
        twitter: '@johnsmith'
      }
    },
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={profileImage}
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'primary.main',
                  fontSize: '2.5rem',
                  border: '3px solid',
                  borderColor: 'primary.main',
                }}
              >
                {!profileImage && profileData.name[0]}
              </Avatar>
              {isEditing && (
                <Tooltip title="Change Photo">
                  <IconButton
                    onClick={handleImageClick}
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                  >
                    <CameraAlt />
                  </IconButton>
                </Tooltip>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </Box>
            <Box>
              <Typography variant="h4" gutterBottom>
                {profileData.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {profileData.designation}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {profileData.department}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={isEditing ? null : <EditIcon />}
            onClick={isEditing ? handleSave : handleEdit}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  About Me
                </Typography>
                {isEditing ? (
                  <Box>
                    <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                      <Tooltip title="Bold">
                        <IconButton size="small">
                          <FormatBold />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Italic">
                        <IconButton size="small">
                          <FormatItalic />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Bullet List">
                        <IconButton size="small">
                          <FormatListBulleted />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Numbered List">
                        <IconButton size="small">
                          <FormatListNumbered />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      label="Bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      variant="outlined"
                      placeholder="Tell us about yourself..."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'background.paper',
                        },
                      }}
                    />
                  </Box>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.8,
                      color: 'text.secondary',
                    }}
                  >
                    {profileData.bio}
                  </Typography>
                )}
              </CardContent>
            </Card>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Expertise</Typography>
                {isEditing && (
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog('expertise')}
                  >
                    Add Expertise
                  </Button>
                )}
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {profileData.expertise.map((exp) => (
                  <Chip
                    key={exp}
                    label={exp}
                    onDelete={isEditing ? () => handleDeleteExpertise(exp) : undefined}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Box>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Academic Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Current Semester
                    </Typography>
                    <Typography variant="body1">
                      {profileData.academicInfo.currentSemester}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      CGPA
                    </Typography>
                    <Typography variant="body1">
                      {profileData.academicInfo.cgpa}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Relevant Courses
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                      {profileData.academicInfo.relevantCourses.map((course) => (
                        <Chip key={course} label={course} variant="outlined" size="small" />
                      ))}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Academic Achievements
                    </Typography>
                    <List>
                      {profileData.academicInfo.achievements.map((achievement, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <EmojiEvents color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={achievement} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Council Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Position
                    </Typography>
                    <Typography variant="body1">
                      {profileData.councilInfo.position}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Council
                    </Typography>
                    <Typography variant="body1">
                      {profileData.councilInfo.council}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Term
                    </Typography>
                    <Typography variant="body1">
                      {profileData.councilInfo.term}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Committee
                    </Typography>
                    <Typography variant="body1">
                      {profileData.councilInfo.committee}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Key Responsibilities
                    </Typography>
                    <List>
                      {profileData.councilInfo.responsibilities.map((responsibility, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <Assignment color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={responsibility} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Email color="action" />
                    <Typography>{profileData.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Phone color="action" />
                    <Typography>{profileData.phone}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn color="action" />
                    <Typography>{profileData.contact.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Business color="action" />
                    <Typography>{profileData.contact.office}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Competition Statistics
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Competitions Organized
                    </Typography>
                    <Typography variant="h6">{profileData.competitionStats.competitionsOrganized}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Teams Participated
                    </Typography>
                    <Typography variant="h6">{profileData.competitionStats.teamsParticipated}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Participants
                    </Typography>
                    <Typography variant="h6">{profileData.competitionStats.totalParticipants}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Active Competitions
                    </Typography>
                    <Typography variant="h6">{profileData.competitionStats.activeCompetitions}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Upcoming Events
                    </Typography>
                    <Typography variant="h6">{profileData.competitionStats.upcomingEvents}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Average Rating
                    </Typography>
                    <Typography variant="h6">{profileData.competitionStats.averageRating}/5.0</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Social Media
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinkedIn color="primary" />
                    <Typography
                      component="a"
                      href={`https://${profileData.contact.socialMedia.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ textDecoration: 'none' }}
                    >
                      LinkedIn Profile
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <GitHub color="primary" />
                    <Typography
                      component="a"
                      href={`https://${profileData.contact.socialMedia.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ textDecoration: 'none' }}
                    >
                      GitHub Profile
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default OrganizerProfile; 