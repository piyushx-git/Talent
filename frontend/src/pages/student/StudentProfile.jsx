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
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
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
  CardMembership,
  Business,
} from '@mui/icons-material';

const StudentProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'skill', 'project', 'achievement', 'certificate', 'experience'
  const [profileImage, setProfileImage] = useState('https://media.istockphoto.com/id/1562983249/photo/portrait-of-happy-and-successful-businessman-indian-man-smiling-and-looking-at-camera.jpg?s=612x612&w=0&k=20&c=tfBv6taG9nTidFwENcrvEEvRHABN5gDAmg-K1G1Etnc=');
  const fileInputRef = useRef(null);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    department: 'Computer Science',
    year: '3rd Year',
    bio: 'Passionate about technology and innovation. Looking forward to participating in technical competitions.',
    skills: ['React', 'Node.js', 'Python', 'Machine Learning'],
    projects: [
      {
        title: 'AI Chatbot',
        description: 'Built a chatbot using Python and TensorFlow',
        technologies: ['Python', 'TensorFlow', 'NLP'],
      },
    ],
    certificates: [
      {
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        date: '2023-06-15',
        credentialId: 'AWS-123456',
        link: 'https://aws.amazon.com/certification/',
      },
      {
        name: 'Google Cloud Professional Developer',
        issuer: 'Google',
        date: '2023-08-20',
        credentialId: 'GCP-789012',
        link: 'https://cloud.google.com/certification/',
      },
    ],
    experiences: [
      {
        company: 'Tech Corp',
        position: 'Software Development Intern',
        duration: 'June 2023 - August 2023',
        location: 'San Francisco, CA',
        description: 'Worked on developing and maintaining web applications using React and Node.js',
        technologies: ['React', 'Node.js', 'MongoDB'],
      },
      {
        company: 'StartUpX',
        position: 'Frontend Developer Intern',
        duration: 'January 2023 - March 2023',
        location: 'Remote',
        description: 'Developed responsive web interfaces and implemented new features',
        technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      },
    ],
    achievements: [
      'First Place - University Hackathon 2023',
      'Best Project Award - Innovation Fair 2023',
      'Dean\'s List - Fall 2023',
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
    },
    contact: {
      phone: '+1 234 567 8900',
      location: 'New York, USA',
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
    setEditMode(!editMode);
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType('');
  };

  const handleSave = () => {
    setEditMode(false);
    // Implement save logic here
  };

  const renderDialogContent = () => {
    switch (dialogType) {
      case 'skill':
        return (
          <TextField
            fullWidth
            label="Add New Skill"
            margin="normal"
            variant="outlined"
          />
        );
      case 'project':
        return (
          <>
            <TextField
              fullWidth
              label="Project Title"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              multiline
              rows={4}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Technologies (comma-separated)"
              margin="normal"
              variant="outlined"
            />
          </>
        );
      case 'achievement':
        return (
          <TextField
            fullWidth
            label="Add Achievement"
            margin="normal"
            variant="outlined"
          />
        );
      case 'certificate':
        return (
          <>
            <TextField
              fullWidth
              label="Certificate Name"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Issuing Organization"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Date"
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Credential ID"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Certificate Link"
              margin="normal"
              variant="outlined"
            />
          </>
        );
      case 'experience':
        return (
          <>
            <TextField
              fullWidth
              label="Company Name"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Position"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Duration"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Location"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              multiline
              rows={4}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Technologies (comma-separated)"
              margin="normal"
              variant="outlined"
            />
          </>
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
              {editMode && (
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
                {profileData.department} • {profileData.year}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            startIcon={editMode ? null : <EditIcon />}
            onClick={editMode ? handleSave : handleEdit}
          >
            {editMode ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  About Me
                </Typography>
                {editMode ? (
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
                <Typography variant="h6">Skills</Typography>
                {editMode && (
                  <IconButton onClick={() => handleOpenDialog('skill')} color="primary">
                    <AddIcon />
                  </IconButton>
                )}
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {profileData.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={editMode ? () => {} : undefined}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Stack>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Projects</Typography>
                {editMode && (
                  <IconButton onClick={() => handleOpenDialog('project')} color="primary">
                    <AddIcon />
                  </IconButton>
                )}
              </Box>
              {profileData.projects.map((project, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {project.description}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                      {project.technologies.map((tech, techIndex) => (
                        <Chip key={techIndex} label={tech} size="small" />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Certificates Section */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Certificates</Typography>
                {editMode && (
                  <IconButton onClick={() => handleOpenDialog('certificate')} color="primary">
                    <AddIcon />
                  </IconButton>
                )}
              </Box>
              {profileData.certificates.map((cert, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {cert.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                          {cert.issuer}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Issued: {cert.date} • ID: {cert.credentialId}
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Certificate
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Experiences Section */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Experiences</Typography>
                {editMode && (
                  <IconButton onClick={() => handleOpenDialog('experience')} color="primary">
                    <AddIcon />
                  </IconButton>
                )}
              </Box>
              {profileData.experiences.map((exp, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {exp.position}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      {exp.company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {exp.duration} • {exp.location}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {exp.description}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                      {exp.technologies.map((tech, techIndex) => (
                        <Chip key={techIndex} label={tech} size="small" />
                      ))}
                    </Stack>
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
                    <Typography>{profileData.contact.phone}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn color="action" />
                    <Typography>{profileData.contact.location}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
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
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Achievements</Typography>
                  {editMode && (
                    <IconButton onClick={() => handleOpenDialog('achievement')} color="primary">
                      <AddIcon />
                    </IconButton>
                  )}
                </Box>
                <Stack spacing={2}>
                  {profileData.achievements.map((achievement, index) => (
                    <Box 
                      key={index} 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        cursor: 'pointer',
                        '&:hover': {
                          opacity: 0.8,
                        },
                      }}
                      onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(achievement)}`, '_blank')}
                    >
                      <EmojiEvents color="primary" />
                      <Typography>{achievement}</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'skill' && 'Add New Skill'}
          {dialogType === 'project' && 'Add New Project'}
          {dialogType === 'achievement' && 'Add New Achievement'}
          {dialogType === 'certificate' && 'Add New Certificate'}
          {dialogType === 'experience' && 'Add New Experience'}
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

export default StudentProfile; 