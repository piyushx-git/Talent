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
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  School,
  Work,
  EmojiEvents,
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
  Business,
  Star,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MentorProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState({
    name: 'Dr. Sarah Johnson',
    designation: 'Senior Research Scientist',
    department: 'Computer Science',
    email: 'sarah.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    bio: 'Experienced mentor with expertise in AI and Machine Learning. Passionate about guiding students in their research and project development.',
    expertise: ['Machine Learning', 'Artificial Intelligence', 'Deep Learning', 'Computer Vision'],
    experience: [
      {
        company: 'Tech Research Institute',
        position: 'Senior Research Scientist',
        duration: '2018 - Present',
        description: 'Leading research in advanced AI applications and mentoring junior researchers.',
      },
    ],
    certifications: [
      {
        name: 'Advanced Machine Learning',
        issuer: 'Stanford University',
        year: '2020',
      },
    ],
    mentorshipStats: {
      teamsMentored: 12,
      studentsMentored: 48,
      competitionsWon: 5,
      averageRating: 4.8,
    },
    availability: {
      preferredDays: ['Monday', 'Wednesday', 'Friday'],
      preferredTime: '2:00 PM - 5:00 PM',
      maxTeams: 3,
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      github: 'https://github.com/sarahjohnson',
      researchGate: 'https://researchgate.net/sarahjohnson',
    },
    contact: {
      phone: '+1 234 567 8900',
      location: 'San Francisco, CA',
      office: 'Room 301, Computer Science Building',
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

  const handleSave = async () => {
    try {
      // Here you would typically make an API call to update the profile
      // For now, we'll simulate a successful update
      console.log('Updating profile with data:', profileData);
      
      // Show success message
      toast.success('Profile updated successfully!');
      
      // Exit edit mode
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType(null);
  };

  const handleAddExpertise = (expertise) => {
    setProfileData({
      ...profileData,
      expertise: [...profileData.expertise, expertise],
    });
    handleCloseDialog();
  };

  const handleDeleteExpertise = (expertiseToDelete) => {
    setProfileData({
      ...profileData,
      expertise: profileData.expertise.filter((exp) => exp !== expertiseToDelete),
    });
  };

  const handleAddExperience = (newExperience) => {
    setProfileData({
      ...profileData,
      experience: [...profileData.experience, newExperience]
    });
    handleCloseDialog();
  };

  const handleUpdateContact = (field, value) => {
    setProfileData({
      ...profileData,
      contact: {
        ...profileData.contact,
        [field]: value
      }
    });
  };

  const handleUpdateSocialLinks = (platform, value) => {
    setProfileData({
      ...profileData,
      socialLinks: {
        ...profileData.socialLinks,
        [platform]: value
      }
    });
  };

  const handleUpdateAvailability = (field, value) => {
    setProfileData({
      ...profileData,
      availability: {
        ...profileData.availability,
        [field]: value
      }
    });
  };

  const renderDialogContent = () => {
    switch (dialogType) {
      case 'expertise':
        return (
          <TextField
            fullWidth
            label="Add Expertise"
            placeholder="Enter your expertise area"
            variant="outlined"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddExpertise(e.target.value);
              }
            }}
          />
        );
      case 'experience':
        return (
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Company"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Position"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Duration"
              variant="outlined"
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              variant="outlined"
            />
          </Stack>
        );
      default:
        return null;
    }
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

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Experience</Typography>
                {isEditing && (
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog('experience')}
                  >
                    Add Experience
                  </Button>
                )}
              </Box>
              {profileData.experience.map((exp, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {exp.position}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      {exp.company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {exp.duration}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {exp.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
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
                  Mentorship Statistics
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Teams Mentored
                    </Typography>
                    <Typography variant="h6">{profileData.mentorshipStats.teamsMentored}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Students Mentored
                    </Typography>
                    <Typography variant="h6">{profileData.mentorshipStats.studentsMentored}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Competitions Won
                    </Typography>
                    <Typography variant="h6">{profileData.mentorshipStats.competitionsWon}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Average Rating
                    </Typography>
                    <Typography variant="h6">{profileData.mentorshipStats.averageRating}/5.0</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Availability
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Preferred Days
                    </Typography>
                    <Typography variant="body1">
                      {profileData.availability.preferredDays.join(', ')}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Preferred Time
                    </Typography>
                    <Typography variant="body1">
                      {profileData.availability.preferredTime}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Maximum Teams
                    </Typography>
                    <Typography variant="body1">
                      {profileData.availability.maxTeams} teams
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Social Links
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinkedIn color="action" />
                    <Typography>
                      <a
                        href={profileData.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'inherit',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {profileData.socialLinks.linkedin}
                      </a>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <GitHub color="action" />
                    <Typography>
                      <a
                        href={profileData.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'inherit',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {profileData.socialLinks.github}
                      </a>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <School color="action" />
                    <Typography>
                      <a
                        href={profileData.socialLinks.researchGate}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'inherit',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {profileData.socialLinks.researchGate}
                      </a>
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Dialog for adding expertise or experience */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'expertise' ? 'Add Expertise' : 'Add Experience'}
        </DialogTitle>
        <DialogContent>
          {renderDialogContent()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MentorProfile; 