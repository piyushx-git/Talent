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
  TextField,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Rating,
  Stack,
  MenuItem,
} from '@mui/material';
import {
  Edit,
  Add,
  Delete,
  School,
  Work,
  EmojiEvents,
  GitHub,
  LinkedIn,
  Assessment,
  Group,
  Badge,
} from '@mui/icons-material';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [skillDialogOpen, setSkillDialogOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', category: '', proficiency: 1 });
  const [certDialogOpen, setCertDialogOpen] = useState(false);
  const [newCert, setNewCert] = useState({ name: '', issuer: '', date: '', url: '' });

  // Mock user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@university.edu',
    department: 'Computer Science',
    year: '3rd Year',
    avatar: '/avatars/user.jpg',
    bio: 'Passionate about technology and innovation. Experienced in web development and machine learning.',
    skills: [
      { name: 'React', category: 'Frontend', proficiency: 4 },
      { name: 'Node.js', category: 'Backend', proficiency: 3 },
      { name: 'Python', category: 'Programming', proficiency: 4 },
      { name: 'Machine Learning', category: 'AI/ML', proficiency: 3 },
      { name: 'UI/UX Design', category: 'Design', proficiency: 4 },
    ],
    certifications: [
      {
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        date: '2023-12',
        url: 'https://aws.amazon.com/certification',
      },
      {
        name: 'Machine Learning Specialization',
        issuer: 'Coursera',
        date: '2023-10',
        url: 'https://coursera.org/verify',
      },
    ],
    education: [
      {
        degree: 'Bachelor of Technology',
        institution: 'University of Technology',
        year: '2021-Present',
      },
    ],
    experience: [
      {
        title: 'Software Development Intern',
        company: 'Tech Solutions Inc.',
        duration: 'Summer 2023',
        description: 'Worked on developing full-stack web applications using React and Node.js.',
      },
    ],
    projects: [
      {
        name: 'AI-Powered Chat Application',
        description: 'Developed a real-time chat application with AI-driven response suggestions.',
        technologies: ['React', 'Node.js', 'Socket.io', 'OpenAI API'],
        url: 'https://github.com/johndoe/ai-chat',
      },
      {
        name: 'Smart Home Automation System',
        description: 'Built an IoT-based home automation system using Raspberry Pi.',
        technologies: ['Python', 'MQTT', 'React Native', 'MongoDB'],
        url: 'https://github.com/johndoe/smart-home',
      },
    ],
    achievements: [
      'First Place - University Hackathon 2023',
      'Best Project Award - Innovation Fair 2023',
      'Dean\'s List - Fall 2023',
    ],
    socialLinks: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
    },
  });

  // Mock AI team suggestions
  const teamSuggestions = [
    {
      competitionName: 'Smart City Hackathon 2024',
      role: 'Frontend Developer',
      matchScore: 92,
      requiredSkills: ['React', 'UI/UX Design'],
      teamName: 'Urban Innovators',
    },
    {
      competitionName: 'AI/ML Challenge 2024',
      role: 'ML Engineer',
      matchScore: 85,
      requiredSkills: ['Python', 'Machine Learning'],
      teamName: 'DataMinds',
    },
  ];

  const handleSkillAdd = () => {
    if (newSkill.name.trim() && !userData.skills.find(s => s.name === newSkill.name.trim())) {
      setUserData({
        ...userData,
        skills: [...userData.skills, { ...newSkill, name: newSkill.name.trim() }],
      });
      setNewSkill({ name: '', category: '', proficiency: 1 });
      setSkillDialogOpen(false);
    }
  };

  const handleSkillDelete = (skillName) => {
    setUserData({
      ...userData,
      skills: userData.skills.filter((skill) => skill.name !== skillName),
    });
  };

  const handleCertAdd = () => {
    if (newCert.name.trim() && newCert.issuer.trim()) {
      setUserData({
        ...userData,
        certifications: [...userData.certifications, { ...newCert, name: newCert.name.trim() }],
      });
      setNewCert({ name: '', issuer: '', date: '', url: '' });
      setCertDialogOpen(false);
    }
  };

  const ProfileSection = ({ title, children }) => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {children}
    </Paper>
  );

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">My Profile</Typography>
        <Button
          variant="contained"
          startIcon={editMode ? null : <Edit />}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid item xs={12} md={4}>
          <ProfileSection title="Basic Information">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                src={userData.avatar}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              {editMode && (
                <Button variant="outlined" size="small">
                  Change Photo
                </Button>
              )}
            </Box>
            {editMode ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Full Name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
                <TextField
                  label="Email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
                <TextField
                  label="Department"
                  value={userData.department}
                  onChange={(e) => setUserData({ ...userData, department: e.target.value })}
                />
                <TextField
                  label="Year"
                  value={userData.year}
                  onChange={(e) => setUserData({ ...userData, year: e.target.value })}
                />
              </Box>
            ) : (
              <List>
                <ListItem>
                  <ListItemText primary="Name" secondary={userData.name} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Email" secondary={userData.email} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Department" secondary={userData.department} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Year" secondary={userData.year} />
                </ListItem>
              </List>
            )}
          </ProfileSection>

          <ProfileSection title="Social Links">
            <List>
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <GitHub sx={{ mr: 1 }} />
                      GitHub
                    </Box>
                  }
                  secondary={
                    editMode ? (
                      <TextField
                        fullWidth
                        size="small"
                        value={userData.socialLinks.github}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            socialLinks: { ...userData.socialLinks, github: e.target.value },
                          })
                        }
                      />
                    ) : (
                      <a href={userData.socialLinks.github} target="_blank" rel="noopener noreferrer">
                        {userData.socialLinks.github}
                      </a>
                    )
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LinkedIn sx={{ mr: 1 }} />
                      LinkedIn
                    </Box>
                  }
                  secondary={
                    editMode ? (
                      <TextField
                        fullWidth
                        size="small"
                        value={userData.socialLinks.linkedin}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            socialLinks: { ...userData.socialLinks, linkedin: e.target.value },
                          })
                        }
                      />
                    ) : (
                      <a href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        {userData.socialLinks.linkedin}
                      </a>
                    )
                  }
                />
              </ListItem>
            </List>
          </ProfileSection>
        </Grid>

        {/* Skills and Experience */}
        <Grid item xs={12} md={8}>
          <ProfileSection title="About Me">
            {editMode ? (
              <TextField
                fullWidth
                multiline
                rows={4}
                value={userData.bio}
                onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
              />
            ) : (
              <Typography variant="body1">{userData.bio}</Typography>
            )}
          </ProfileSection>

          <ProfileSection title="Skills & Proficiency">
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1">Technical Skills</Typography>
                {editMode && (
                  <Button
                    startIcon={<Add />}
                    onClick={() => setSkillDialogOpen(true)}
                    variant="outlined"
                    size="small"
                  >
                    Add Skill
                  </Button>
                )}
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {userData.skills.map((skill) => (
                  <Chip
                    key={skill.name}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {skill.name}
                        <Rating value={skill.proficiency} readOnly size="small" />
                      </Box>
                    }
                    onDelete={editMode ? () => handleSkillDelete(skill.name) : undefined}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          </ProfileSection>

          <ProfileSection title="Certifications">
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1">Professional Certifications</Typography>
                {editMode && (
                  <Button
                    startIcon={<Add />}
                    onClick={() => setCertDialogOpen(true)}
                    variant="outlined"
                    size="small"
                  >
                    Add Certification
                  </Button>
                )}
              </Box>
              <List>
                {userData.certifications.map((cert, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={cert.name}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="text.primary">
                            {cert.issuer}
                          </Typography>
                          {` - ${cert.date}`}
                        </React.Fragment>
                      }
                    />
                    {cert.url && (
                      <Button size="small" href={cert.url} target="_blank">
                        Verify
                      </Button>
                    )}
                  </ListItem>
                ))}
              </List>
            </Box>
          </ProfileSection>

          <ProfileSection title="Projects">
            <Grid container spacing={2}>
              {userData.projects.map((project, index) => (
                <Grid item xs={12} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {project.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {project.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                        {project.technologies.map((tech, i) => (
                          <Chip key={i} label={tech} size="small" />
                        ))}
                      </Box>
                      <Button size="small" href={project.url} target="_blank">
                        View Project
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </ProfileSection>

          <ProfileSection title="AI Team Suggestions">
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Based on your skills and experience, here are some team matches for upcoming competitions:
              </Typography>
              <Grid container spacing={2}>
                {teamSuggestions.map((suggestion, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {suggestion.teamName}
                        </Typography>
                        <Typography variant="subtitle2" color="primary">
                          {suggestion.competitionName}
                        </Typography>
                        <Box sx={{ my: 1 }}>
                          <Typography variant="body2" gutterBottom>
                            Role: {suggestion.role}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Match Score: {suggestion.matchScore}%
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {suggestion.requiredSkills.map((skill, i) => (
                            <Chip key={i} label={skill} size="small" variant="outlined" />
                          ))}
                        </Box>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          View Team
                        </Button>
                        <Button size="small" color="secondary">
                          Apply
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </ProfileSection>
        </Grid>
      </Grid>

      {/* Skill Dialog */}
      <Dialog open={skillDialogOpen} onClose={() => setSkillDialogOpen(false)}>
        <DialogTitle>Add New Skill</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Skill Name"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Category"
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              fullWidth
              select
            >
              <MenuItem value="Frontend">Frontend</MenuItem>
              <MenuItem value="Backend">Backend</MenuItem>
              <MenuItem value="Programming">Programming</MenuItem>
              <MenuItem value="AI/ML">AI/ML</MenuItem>
              <MenuItem value="Design">Design</MenuItem>
            </TextField>
            <Box>
              <Typography gutterBottom>Proficiency Level</Typography>
              <Rating
                value={newSkill.proficiency}
                onChange={(_, value) => setNewSkill({ ...newSkill, proficiency: value })}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSkillDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSkillAdd} variant="contained">
            Add Skill
          </Button>
        </DialogActions>
      </Dialog>

      {/* Certification Dialog */}
      <Dialog open={certDialogOpen} onClose={() => setCertDialogOpen(false)}>
        <DialogTitle>Add New Certification</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Certification Name"
              value={newCert.name}
              onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Issuing Organization"
              value={newCert.issuer}
              onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
              fullWidth
            />
            <TextField
              label="Date"
              type="month"
              value={newCert.date}
              onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
              fullWidth
            />
            <TextField
              label="Verification URL"
              value={newCert.url}
              onChange={(e) => setNewCert({ ...newCert, url: e.target.value })}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCertDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCertAdd} variant="contained">
            Add Certification
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile; 