import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Link as MuiLink,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
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
  PersonOutline,
  Save,
  Cancel,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/axiosConfig';

const ProfileSection = ({ title, icon, children }) => (
  <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {icon && React.cloneElement(icon, { sx: { mr: 1, color: 'primary.main' } })}
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
    </Box>
    <Box>
      {children}
    </Box>
  </Paper>
);

const Profile = () => {
  const { user, loading, updateUserData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // New state for adding items
  const [newSkill, setNewSkill] = useState({ name: '', category: '', proficiency: 1 });
  const [newInterest, setNewInterest] = useState('');
  const [newCertification, setNewCertification] = useState({ name: '', issuer: '', date: '', url: '' });
  const [newProject, setNewProject] = useState({ name: '', description: '', technologies: [], url: '' });
  const [newProjectTech, setNewProjectTech] = useState('');
  const [newExpertise, setNewExpertise] = useState('');
  const [newEvent, setNewEvent] = useState('');

  useEffect(() => {
    if (user) {
      setEditedData({
        name: user.name || '',
        email: user.email || '',
        department: user.department || '',
        bio: user.bio || '',
    socialLinks: {
          linkedin: user.socialLinks?.linkedin || '',
          github: user.socialLinks?.github || '',
        },
        ...(user.role === 'student' && {
          student: {
            institution: user.student?.institution || '',
            course: user.student?.course || '',
            year: user.student?.year || '',
            studentId: user.student?.studentId || '',
            skills: user.student?.skills || [],
            interests: user.student?.interests || [],
            certifications: user.student?.certifications || [],
            projects: user.student?.projects || [],
          }
        }),
        ...(user.role === 'mentor' && {
          mentor: {
            organization: user.mentor?.organization || '',
            designation: user.mentor?.designation || '',
            experience: user.mentor?.experience || '',
            expertise: user.mentor?.expertise || [],
            availability: user.mentor?.availability || 'flexible',
            researchGate: user.mentor?.researchGate || '',
          }
        }),
        ...(user.role === 'organizer' && {
          organizer: {
            organization: user.organizer?.organization || '',
            designation: user.organizer?.designation || '',
            contactNumber: user.organizer?.contactNumber || '',
            eventManagementExperience: user.organizer?.eventManagementExperience || '',
            previousEvents: user.organizer?.previousEvents || [],
            website: user.organizer?.website || '',
          }
        }),
      });
    }
  }, [user]);

  const handleChange = (field, value) => {
    setEditedData(prev => {
      const newData = { ...prev };
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        newData[parent] = { ...newData[parent], [child]: value };
      } else {
        newData[field] = value;
      }
      return newData;
    });
  };

  const formatURL = (url) => {
    if (!url) return '';
    return url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`;
  };

  const handleSave = async () => {
    setSaveLoading(true);
    setError('');
    try {
      // Format URLs before saving
      const formattedData = {
        ...editedData,
        socialLinks: {
          ...editedData.socialLinks,
          linkedin: formatURL(editedData.socialLinks?.linkedin),
          github: formatURL(editedData.socialLinks?.github),
        }
      };

      // Add role-specific URLs
      if (user.role === 'mentor' && formattedData.mentor) {
        formattedData.mentor.researchGate = formatURL(formattedData.mentor.researchGate);
      }
      if (user.role === 'organizer' && formattedData.organizer) {
        formattedData.organizer.website = formatURL(formattedData.organizer.website);
      }

      const response = await api.put('/users/profile', formattedData);
      if (response.data) {
        updateUserData(response.data);
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Profile update error:', err);
      setError(
        err.response?.data?.message || 
        err.response?.data?.error || 
        'Failed to update profile. Please try again.'
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({
      name: user.name,
      email: user.email,
      department: user.department,
      bio: user.bio,
      socialLinks: { ...user.socialLinks },
      ...(user.role === 'student' && { student: { ...user.student } }),
      ...(user.role === 'mentor' && { mentor: { ...user.mentor } }),
      ...(user.role === 'organizer' && { organizer: { ...user.organizer } }),
    });
  };

  // New handlers for adding items
  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      setEditedData(prev => ({
        ...prev,
        student: {
          ...prev.student,
          skills: [...(prev.student?.skills || []), newSkill]
        }
      }));
      setNewSkill({ name: '', category: '', proficiency: 1 });
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      setEditedData(prev => ({
        ...prev,
        student: {
          ...prev.student,
          interests: [...(prev.student?.interests || []), newInterest.trim()]
        }
      }));
      setNewInterest('');
    }
  };

  const handleAddCertification = () => {
    if (newCertification.name.trim() && newCertification.issuer.trim()) {
      setEditedData(prev => ({
        ...prev,
        student: {
          ...prev.student,
          certifications: [...(prev.student?.certifications || []), newCertification]
        }
      }));
      setNewCertification({ name: '', issuer: '', date: '', url: '' });
    }
  };

  const handleAddProjectTech = () => {
    if (newProjectTech.trim()) {
      setNewProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, newProjectTech.trim()]
      }));
      setNewProjectTech('');
    }
  };

  const handleAddProject = () => {
    if (newProject.name.trim()) {
      setEditedData(prev => ({
        ...prev,
        student: {
          ...prev.student,
          projects: [...(prev.student?.projects || []), newProject]
        }
      }));
      setNewProject({ name: '', description: '', technologies: [], url: '' });
    }
  };

  const handleAddExpertise = () => {
    if (newExpertise.trim()) {
      setEditedData(prev => ({
        ...prev,
        mentor: {
          ...prev.mentor,
          expertise: [...(prev.mentor?.expertise || []), newExpertise.trim()]
        }
      }));
      setNewExpertise('');
    }
  };

  const handleAddEvent = () => {
    if (newEvent.trim()) {
      setEditedData(prev => ({
        ...prev,
        organizer: {
          ...prev.organizer,
          previousEvents: [...(prev.organizer?.previousEvents || []), newEvent.trim()]
        }
      }));
      setNewEvent('');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Typography>User data not available. Please log in again.</Typography>;
  }

  const renderEditableField = (label, value, field, type = 'text', options = null) => {
    if (!isEditing) {
      return <Typography component="span">{value || '-'}</Typography>;
    }

    if (type === 'select' && options) {
      return (
        <FormControl fullWidth size="small">
          <InputLabel>{label}</InputLabel>
          <Select
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            label={label}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    return (
      <TextField
        fullWidth
        size="small"
        label={label}
        value={value}
        onChange={(e) => handleChange(field, e.target.value)}
        type={type}
        multiline={type === 'multiline'}
        rows={type === 'multiline' ? 3 : 1}
      />
    );
  };

  const renderArrayInputSection = (title, items, renderItem, onAdd, inputComponent, onDelete, fieldName) => (
    <Box sx={{ mt: 3, border: '1px dashed grey', p: 2, borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <List dense>
        {items?.map((item, index) => (
          <ListItem
            key={`${fieldName}-${index}`}
            secondaryAction={
              isEditing && (
                <IconButton edge="end" onClick={() => onDelete(fieldName, index)}>
                  <Delete />
                </IconButton>
              )
            }
          >
            {renderItem(item, index)}
          </ListItem>
        ))}
      </List>
      {isEditing && (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mt: 1 }}>
          {inputComponent}
          <Button variant="outlined" onClick={onAdd} startIcon={<Add />} sx={{ height: 'fit-content', mt: 1 }}>
            Add
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">My Profile</Typography>
        {!isEditing ? (
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={handleSave}
              disabled={saveLoading}
            >
              {saveLoading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Cancel />}
              onClick={handleCancel}
              disabled={saveLoading}
            >
              Cancel
        </Button>
          </Box>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ProfileSection title="Basic Information" icon={<PersonOutline />}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{ width: 120, height: 120, mb: 2, bgcolor: 'primary.main' }}
              >
                {editedData?.name?.charAt(0).toUpperCase()}
              </Avatar>
            </Box>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="Name" 
                  secondary={renderEditableField('Name', editedData?.name, 'name')} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Email" 
                  secondary={renderEditableField('Email', editedData?.email, 'email', 'email')} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Role" 
                  secondary={user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : '-'} 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Department" 
                  secondary={renderEditableField('Department', editedData?.department, 'department')} 
                />
              </ListItem>
              {user.role === 'student' && editedData?.student && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <ListItem>
                    <ListItemText 
                      primary="Institution" 
                      secondary={renderEditableField('Institution', editedData.student.institution, 'student.institution')} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Course" 
                      secondary={renderEditableField('Course', editedData.student.course, 'student.course')} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Year" 
                      secondary={renderEditableField('Year', editedData.student.year, 'student.year')} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Student ID" 
                      secondary={renderEditableField('Student ID', editedData.student.studentId, 'student.studentId')} 
                    />
                  </ListItem>
                </>
              )}
              {user.role === 'mentor' && editedData?.mentor && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <ListItem>
                    <ListItemText 
                      primary="Organization" 
                      secondary={renderEditableField('Organization', editedData.mentor.organization, 'mentor.organization')} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Designation" 
                      secondary={renderEditableField('Designation', editedData.mentor.designation, 'mentor.designation')} 
                    />
                  </ListItem>
                <ListItem>
                    <ListItemText 
                      primary="Experience" 
                      secondary={renderEditableField('Experience', editedData.mentor.experience, 'mentor.experience')} 
                    />
                </ListItem>
                <ListItem>
                    <ListItemText 
                      primary="Availability" 
                      secondary={renderEditableField('Availability', editedData.mentor.availability, 'mentor.availability', 'select', [
                        { value: 'full-time', label: 'Full Time' },
                        { value: 'part-time', label: 'Part Time' },
                        { value: 'flexible', label: 'Flexible' },
                      ])} 
                    />
                  </ListItem>
                </>
              )}
              {user.role === 'organizer' && editedData?.organizer && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <ListItem>
                    <ListItemText 
                      primary="Organization" 
                      secondary={renderEditableField('Organization', editedData.organizer.organization, 'organizer.organization')} 
                    />
                </ListItem>
                <ListItem>
                    <ListItemText 
                      primary="Designation" 
                      secondary={renderEditableField('Designation', editedData.organizer.designation, 'organizer.designation')} 
                    />
                </ListItem>
                <ListItem>
                    <ListItemText 
                      primary="Contact" 
                      secondary={renderEditableField('Contact', editedData.organizer.contactNumber, 'organizer.contactNumber')} 
                    />
                </ListItem>
                </>
              )}
              </List>
          </ProfileSection>

          <ProfileSection title="Social Links" icon={<Work />}>
            <List dense>
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LinkedIn sx={{ mr: 1 }} /> LinkedIn
                    </Box>
                  }
                  secondary={
                    isEditing ? (
                      renderEditableField('LinkedIn URL', editedData?.socialLinks?.linkedin, 'socialLinks.linkedin')
                    ) : (
                      <MuiLink
                        href={editedData?.socialLinks?.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ wordBreak: 'break-all' }}
                      >
                        {editedData?.socialLinks?.linkedin || '-'}
                      </MuiLink>
                    )
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <GitHub sx={{ mr: 1 }} /> GitHub
                    </Box>
                  }
                  secondary={
                    isEditing ? (
                      renderEditableField('GitHub URL', editedData?.socialLinks?.github, 'socialLinks.github')
                    ) : (
                      <MuiLink
                        href={editedData?.socialLinks?.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ wordBreak: 'break-all' }}
                      >
                        {editedData?.socialLinks?.github || '-'}
                      </MuiLink>
                    )
                  }
                />
              </ListItem>
              {user.role === 'mentor' && editedData?.mentor && (
                <ListItem>
                  <ListItemText
                    primary="ResearchGate"
                    secondary={
                      isEditing ? (
                        renderEditableField('ResearchGate URL', editedData.mentor.researchGate, 'mentor.researchGate')
                      ) : (
                        <MuiLink
                          href={editedData.mentor.researchGate}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ wordBreak: 'break-all' }}
                        >
                          {editedData.mentor.researchGate || '-'}
                        </MuiLink>
                      )
                    }
                  />
                </ListItem>
              )}
              {user.role === 'organizer' && editedData?.organizer && (
                <ListItem>
                  <ListItemText
                    primary="Website"
                    secondary={
                      isEditing ? (
                        renderEditableField('Website URL', editedData.organizer.website, 'organizer.website')
                      ) : (
                        <MuiLink
                          href={editedData.organizer.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ wordBreak: 'break-all' }}
                        >
                          {editedData.organizer.website || '-'}
                        </MuiLink>
                      )
                    }
                  />
                </ListItem>
              )}
            </List>
          </ProfileSection>
        </Grid>

        <Grid item xs={12} md={8}>
          <ProfileSection title="About Me" icon={<PersonOutline />}>
            {renderEditableField('Bio', editedData?.bio, 'bio', 'multiline')}
          </ProfileSection>

          {(user.role === 'student' || user.role === 'mentor') && (
            <ProfileSection title="Skills & Expertise" icon={<School />}>
              {user.role === 'student' && (
                renderArrayInputSection(
                  'Student Skills',
                  editedData?.student?.skills,
                  (skill) => (
                    <ListItemText
                      primary={`${skill.name} (${skill.category || '-'})`}
                      secondary={<Rating value={skill.proficiency} readOnly size="small" />}
                    />
                  ),
                  handleAddSkill,
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <TextField
                      label="Skill Name"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      size="small"
                    />
                    <TextField
                      select
                      label="Category"
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                      size="small"
                    >
                      <MenuItem value="Frontend">Frontend</MenuItem>
                      <MenuItem value="Backend">Backend</MenuItem>
                      <MenuItem value="Programming">Programming</MenuItem>
                      <MenuItem value="AI/ML">AI/ML</MenuItem>
                      <MenuItem value="Design">Design</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                    <Rating
                      value={newSkill.proficiency}
                      onChange={(_, value) => setNewSkill({ ...newSkill, proficiency: value ?? 1 })}
                    />
                  </Stack>,
                  (field, index) => {
                    const newSkills = [...editedData.student.skills];
                    newSkills.splice(index, 1);
                    handleChange('student.skills', newSkills);
                  },
                  'skills'
                )
              )}

              {user.role === 'mentor' && (
                renderArrayInputSection(
                  'Mentor Expertise',
                  editedData?.mentor?.expertise,
                  (expertise) => <ListItemText primary={expertise} />,
                  handleAddExpertise,
                  <TextField
                    label="Area of Expertise"
                    value={newExpertise}
                    onChange={(e) => setNewExpertise(e.target.value)}
                    size="small"
                    fullWidth
                  />,
                  (field, index) => {
                    const newExpertise = [...editedData.mentor.expertise];
                    newExpertise.splice(index, 1);
                    handleChange('mentor.expertise', newExpertise);
                  },
                  'expertise'
                )
              )}
          </ProfileSection>
          )}

          {user.role === 'student' && (
            <>
              <ProfileSection title="Interests" icon={<School />}>
                {renderArrayInputSection(
                  'Interests',
                  editedData?.student?.interests,
                  (interest) => <ListItemText primary={interest} />,
                  handleAddInterest,
                  <TextField
                    label="Interest"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    size="small"
                    fullWidth
                  />,
                  (field, index) => {
                    const newInterests = [...editedData.student.interests];
                    newInterests.splice(index, 1);
                    handleChange('student.interests', newInterests);
                  },
                  'interests'
                )}
              </ProfileSection>

              <ProfileSection title="Certifications" icon={<EmojiEvents />}>
                {renderArrayInputSection(
                  'Certifications',
                  editedData?.student?.certifications,
                  (cert) => (
                    <ListItemText
                      primary={cert.name}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="text.primary">
                            {cert.issuer}
                          </Typography>
                          {cert.date && ` - ${cert.date}`}
                        </React.Fragment>
                      }
                    />
                  ),
                  handleAddCertification,
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <TextField
                      label="Certification Name"
                      value={newCertification.name}
                      onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                      size="small"
                    />
                    <TextField
                      label="Issuer"
                      value={newCertification.issuer}
                      onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                      size="small"
                    />
                    <TextField
                      label="Date"
                      type="month"
                      value={newCertification.date}
                      onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Verification URL"
                      value={newCertification.url}
                      onChange={(e) => setNewCertification({ ...newCertification, url: e.target.value })}
                      size="small"
                    />
                  </Stack>,
                  (field, index) => {
                    const newCerts = [...editedData.student.certifications];
                    newCerts.splice(index, 1);
                    handleChange('student.certifications', newCerts);
                  },
                  'certifications'
                )}
          </ProfileSection>

              <ProfileSection title="Projects" icon={<Work />}>
                {renderArrayInputSection(
                  'Projects',
                  editedData?.student?.projects,
                  (project) => (
                    <ListItemText
                      primary={project.name}
                      secondary={
                        <React.Fragment>
                          <Typography variant="body2" component="span" display="block">
                        {project.description}
                          </Typography>
                          <Typography variant="caption" component="span" display="block">
                            Tech: {project.technologies.join(', ')}
                          </Typography>
                          {project.url && (
                            <Typography variant="caption" component="span" display="block">
                              URL: {project.url}
                            </Typography>
                          )}
                        </React.Fragment>
                      }
                    />
                  ),
                  handleAddProject,
                  <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <TextField
                      label="Project Name"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      size="small"
                    />
                    <TextField
                      label="Description"
                      multiline
                      rows={2}
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      size="small"
                    />
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      <TextField
                        label="Technology"
                        value={newProjectTech}
                        onChange={(e) => setNewProjectTech(e.target.value)}
                        size="small"
                        sx={{ flexGrow: 1 }}
                      />
                      <Button onClick={handleAddProjectTech} size="small" variant="outlined">
                        Add Tech
                      </Button>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {newProject.technologies.map((tech, i) => (
                        <Chip
                          key={i}
                          label={tech}
                          size="small"
                          onDelete={() => {
                            const newTechs = [...newProject.technologies];
                            newTechs.splice(i, 1);
                            setNewProject({ ...newProject, technologies: newTechs });
                          }}
                        />
                          ))}
                        </Box>
                    <TextField
                      label="Project URL"
                      value={newProject.url}
                      onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                      size="small"
                    />
                  </Stack>,
                  (field, index) => {
                    const newProjects = [...editedData.student.projects];
                    newProjects.splice(index, 1);
                    handleChange('student.projects', newProjects);
                  },
                  'projects'
                )}
              </ProfileSection>
            </>
          )}

          {user.role === 'organizer' && (
            <ProfileSection title="Previous Events Hosted" icon={<EmojiEvents />}>
              {renderArrayInputSection(
                'Previous Events',
                editedData?.organizer?.previousEvents,
                (event) => <ListItemText primary={event} />,
                handleAddEvent,
                <TextField
                  label="Event Name"
                  value={newEvent}
                  onChange={(e) => setNewEvent(e.target.value)}
                  size="small"
                  fullWidth
                />,
                (field, index) => {
                  const newEvents = [...editedData.organizer.previousEvents];
                  newEvents.splice(index, 1);
                  handleChange('organizer.previousEvents', newEvents);
                },
                'previousEvents'
              )}
          </ProfileSection>
          )}
        </Grid>
      </Grid>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile; 