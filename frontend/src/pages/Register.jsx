import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Grid,
  Link,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Input,
  Alert,
  Snackbar,
  CircularProgress,
  Rating,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Card,
  CardContent,
  Stack,
  InputAdornment
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
  Psychology as PsychologyIcon,
  Star as StarIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  EmojiEvents as EmojiEventsIcon,
  Code as CodeIcon,
  Description as DescriptionIcon,
  Link as LinkIconIcon,
  DateRange as DateRangeIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosConfig';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    // Common fields
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    department: '',
    bio: '',
    linkedin: '',
    github: '',
    // Student specific
    institution: '',
    course: '',
    year: '',
    studentId: '',
    skills: [],
    interests: [],
    certifications: [],
    projects: [],
    // Mentor specific
    expertise: [],
    experience: '',
    mentorOrganization: '',
    designation: '',
    officeLocation: '',
    availability: 'flexible',
    preferredDays: [], // Consider adding input for this
    preferredTime: '',
    maxTeams: 3,
    researchGate: '',
    // Organizer specific
    organizerOrganization: '',
    organizerDesignation: '',
    contactNumber: '',
    eventManagementExperience: '',
    previousEvents: [],
    website: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  // Temporary state for array inputs
  const [skillInput, setSkillInput] = useState({ name: '', category: '', proficiency: 1 });
  const [interestInput, setInterestInput] = useState('');
  const [certInput, setCertInput] = useState({ name: '', issuer: '', date: '', url: '' });
  const [projectInput, setProjectInput] = useState({ name: '', description: '', technologies: [], url: '' });
  const [projectTechInput, setProjectTechInput] = useState('');
  const [expertiseInput, setExpertiseInput] = useState('');
  const [previousEventsInput, setPreviousEventsInput] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- Handlers for SIMPLE top-level and nested fields --- 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- Handlers for adding items to arrays --- 
  const addSkill = () => {
    if (skillInput.name.trim() && !formData.skills.find(s => s.name === skillInput.name.trim())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skillInput] }));
      setSkillInput({ name: '', category: '', proficiency: 1 }); // Reset temporary state
    }
  };

  const addInterest = () => {
    if (interestInput.trim() && !formData.interests.includes(interestInput.trim())) {
      setFormData(prev => ({ ...prev, interests: [...prev.interests, interestInput.trim()] }));
      setInterestInput(''); // Reset temporary state
    }
  };
  
  const addCertification = () => {
    if (certInput.name.trim() && certInput.issuer.trim()) {
       setFormData(prev => ({ ...prev, certifications: [...prev.certifications, certInput] }));
       setCertInput({ name: '', issuer: '', date: '', url: '' }); // Reset temporary state
    }
  };

  const addProject = () => {
    if (projectInput.name.trim()) {
       // Add the current projectInput state (which includes its own technologies array)
       setFormData(prev => ({ ...prev, projects: [...prev.projects, projectInput] }));
       // Reset temporary project state (including technologies)
       setProjectInput({ name: '', description: '', technologies: [], url: '' }); 
       setProjectTechInput(''); // Reset the technology input field as well
    }
  };
  
  // Handler ONLY for adding a technology to the CURRENT temporary projectInput state
  const addProjectTechnology = () => {
    if (projectTechInput.trim() && !projectInput.technologies.includes(projectTechInput.trim())) {
      // Update ONLY the temporary project state
      setProjectInput(prev => ({ ...prev, technologies: [...prev.technologies, projectTechInput.trim()] }));
      setProjectTechInput(''); // Reset technology input field
    }
  };

  // Handler ONLY for deleting a technology from the CURRENT temporary projectInput state
  const deleteProjectTechnology = (indexToDelete) => {
     setProjectInput(prev => ({
      ...prev,
         technologies: prev.technologies.filter((_, index) => index !== indexToDelete)
    }));
  };

  const addExpertise = () => {
    if (expertiseInput.trim() && !formData.expertise.includes(expertiseInput.trim())) {
      setFormData(prev => ({ ...prev, expertise: [...prev.expertise, expertiseInput.trim()] }));
      setExpertiseInput(''); // Reset temporary state
    }
  };

  const addPreviousEvent = () => {
    if (previousEventsInput.trim() && !formData.previousEvents.includes(previousEventsInput.trim())) {
      setFormData(prev => ({ ...prev, previousEvents: [...prev.previousEvents, previousEventsInput.trim()] }));
      setPreviousEventsInput(''); // Reset temporary state
    }
  };

  // --- Handler for deleting items from MAIN formData arrays --- 
  const handleDeleteArrayItem = (field, index) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  // --- Form Submission --- 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Basic validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Prepare the data to send
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        department: formData.department,
        bio: formData.bio,
        socialLinks: {
          linkedin: formData.linkedin,
          github: formData.github
        }
      };

      // Add role-specific data
      if (formData.role === 'student') {
        if (!formData.institution || !formData.course || !formData.year || !formData.studentId) {
          throw new Error('Please fill in all required student fields: Institution, Course, Year, Student ID');
        }
        registrationData.student = {
          institution: formData.institution,
          course: formData.course,
          year: formData.year,
          studentId: formData.studentId,
          skills: formData.skills,
          interests: formData.interests,
          certifications: formData.certifications,
          projects: formData.projects
        };
      } else if (formData.role === 'mentor') {
        if (!formData.experience || !formData.mentorOrganization || !formData.designation || !formData.availability) {
          throw new Error('Please fill in all required mentor fields: Experience, Organization, Designation, Availability');
        }
        registrationData.mentor = {
          experience: formData.experience,
          organization: formData.mentorOrganization,
          designation: formData.designation,
          availability: formData.availability,
          expertise: formData.expertise,
          officeLocation: formData.officeLocation,
          preferredDays: formData.preferredDays,
          preferredTime: formData.preferredTime,
          maxTeams: formData.maxTeams,
          researchGate: formData.researchGate
        };
      } else if (formData.role === 'organizer') {
        if (!formData.organizerOrganization || !formData.organizerDesignation || !formData.contactNumber || !formData.eventManagementExperience) {
          throw new Error('Please fill in all required organizer fields: Organization, Designation, Contact Number, Event Management Experience');
        }
        registrationData.organizer = {
          organization: formData.organizerOrganization,
          designation: formData.organizerDesignation,
          contactNumber: formData.contactNumber,
          eventManagementExperience: formData.eventManagementExperience,
          previousEvents: formData.previousEvents,
          website: formData.website
        };
      }

      await register(registrationData);
      setShowWelcome(true);
      setWelcomeMessage(`Welcome ${formData.name}! Your ${formData.role} account has been created successfully.`);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // Helper component for array inputs
  const ArrayInputSection = ({ title, items, renderItem, onAdd, inputComponent, deleteHandler, fieldName }) => (
    <Box sx={{ mt: 3, border: '1px dashed grey', p: 2, borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      {/* List displays items from the main formData state */}
      <List dense>
        {items.map((item, index) => (
          <ListItem key={`${fieldName}-${index}`} /* Use stable key */ 
            secondaryAction={deleteHandler && (
            <IconButton edge="end" aria-label="delete" onClick={() => deleteHandler(fieldName, index)}>
              <DeleteIcon />
            </IconButton>
          )}>
            {renderItem(item, index)}
          </ListItem>
        ))}
      </List>
      {/* Input section uses the temporary input state */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mt: 1 }}>
        {inputComponent} 
        <Button variant="outlined" onClick={onAdd} startIcon={<AddIcon />} sx={{ height: 'fit-content', mt: 1 }}>Add</Button>
      </Box>
    </Box>
  );

  // Specific render functions for arrays
  const renderSkillItem = (skill) => <ListItemText primary={`${skill.name} (${skill.category || '-'})`} secondary={<Rating value={skill.proficiency} readOnly size="small" />} />;
  const renderInterestItem = (interest) => <ListItemText primary={interest} />;
  const renderCertItem = (cert) => <ListItemText primary={`${cert.name} (${cert.issuer})`} secondary={`${cert.date || '-'} - ${cert.url || 'No URL'}`} />;
  const renderProjectItem = (project) => (
    <ListItemText 
      primary={project.name} 
      secondary={
          <>
            <Typography variant="body2" component="span" display="block">{project.description || '-'}</Typography>
            <Typography variant="caption" component="span" display="block">Tech: {project.technologies.join(', ') || '-'}</Typography>
            <Typography variant="caption" component="span" display="block">URL: {project.url || '-'}</Typography>
         </>
      }
    />
  );
   const renderExpertiseItem = (item) => <ListItemText primary={item} />;
   const renderEventItem = (item) => <ListItemText primary={item} />;

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
        case 'student':
        return (
          <Grid container spacing={2} sx={{mt: 1}}>
            {/* Student basic info - Use regular handleChange */}
            <Grid item xs={12} sm={6}><TextField required fullWidth name="institution" label="Institution" value={formData.institution} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField required fullWidth name="course" label="Course" value={formData.course} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField required fullWidth name="year" label="Year" value={formData.year} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField required fullWidth name="studentId" label="Student ID" value={formData.studentId} onChange={handleChange} /></Grid>
            
            {/* Student Skills Array Input */}
            <Grid item xs={12}>
              <ArrayInputSection 
                title="Skills" 
                items={formData.skills} 
                renderItem={renderSkillItem} 
                onAdd={addSkill} 
                deleteHandler={handleDeleteArrayItem}
                fieldName="skills"
                inputComponent={
                    <Stack spacing={1} sx={{flexGrow: 1}}>
                      {/* These inputs update the temporary skillInput state */}
            <TextField
                        label="Skill Name" 
                        value={skillInput.name} 
                        onChange={(e) => setSkillInput({...skillInput, name: e.target.value})} 
                        size="small"/>
            <TextField
                        select 
                        label="Category" 
                        value={skillInput.category} 
                        onChange={(e) => setSkillInput({...skillInput, category: e.target.value})} 
                        size="small">
                          <MenuItem value="Frontend">Frontend</MenuItem>
                          <MenuItem value="Backend">Backend</MenuItem>
                          <MenuItem value="Programming">Programming</MenuItem>
                          <MenuItem value="AI/ML">AI/ML</MenuItem>
                          <MenuItem value="Design">Design</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                      </TextField>
                      <Rating 
                        value={skillInput.proficiency} 
                        onChange={(_, value) => setSkillInput({...skillInput, proficiency: value ?? 1})} /* Handle null value */
                      />
                   </Stack>
                }
              />
            </Grid>

            {/* Student Interests Array Input */}
            <Grid item xs={12}>
                <ArrayInputSection 
                  title="Interests" 
                  items={formData.interests} 
                  renderItem={renderInterestItem} 
                  onAdd={addInterest} 
                  deleteHandler={handleDeleteArrayItem}
                  fieldName="interests"
                  inputComponent={
              <TextField
                        label="Interest" 
                value={interestInput}
                        onChange={(e) => setInterestInput(e.target.value)} /* Updates only temporary state */
                        size="small" 
                        fullWidth/>
                  }
                />
            </Grid>

            {/* Student Certifications Array Input */}
            <Grid item xs={12}>
                <ArrayInputSection 
                    title="Certifications" 
                    items={formData.certifications} 
                    renderItem={renderCertItem} 
                    onAdd={addCertification} 
                    deleteHandler={handleDeleteArrayItem}
                    fieldName="certifications"
                    inputComponent={
                       <Stack spacing={1} sx={{flexGrow: 1}}>
                            {/* These inputs update the temporary certInput state */}
                            <TextField label="Certification Name" value={certInput.name} onChange={(e) => setCertInput({...certInput, name: e.target.value})} size="small"/>
                            <TextField label="Issuer" value={certInput.issuer} onChange={(e) => setCertInput({...certInput, issuer: e.target.value})} size="small"/>
                            <TextField label="Date" type="month" value={certInput.date} onChange={(e) => setCertInput({...certInput, date: e.target.value})} size="small" InputLabelProps={{ shrink: true }}/>
                            <TextField label="Verification URL" value={certInput.url} onChange={(e) => setCertInput({...certInput, url: e.target.value})} size="small"/>
                       </Stack>
                    }
                />
            </Grid>
            
            {/* Student Projects Array Input */}
            <Grid item xs={12}>
                <ArrayInputSection 
                    title="Projects" 
                    items={formData.projects} 
                    renderItem={renderProjectItem} 
                    onAdd={addProject} 
                    deleteHandler={handleDeleteArrayItem}
                    fieldName="projects"
                    inputComponent={
                       <Stack spacing={1} sx={{flexGrow: 1}}>
                            {/* These inputs update the temporary projectInput state */}
                            <TextField label="Project Name" value={projectInput.name} onChange={(e) => setProjectInput({...projectInput, name: e.target.value})} size="small"/>
                            <TextField label="Description" multiline rows={2} value={projectInput.description} onChange={(e) => setProjectInput({...projectInput, description: e.target.value})} size="small"/>
                             <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <TextField 
                                  label="Technology" 
                                  value={projectTechInput} 
                                  onChange={(e) => setProjectTechInput(e.target.value)} /* Updates only temp tech input */
                                  size="small" 
                                  sx={{ flexGrow: 1 }}/>
                                {/* Button updates the TEMP projectInput state's technologies array */}
                                <Button onClick={addProjectTechnology} size="small" variant="outlined">Add Tech</Button>
                             </Box>
                             {/* Display technologies from the TEMP projectInput state */}
                             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {projectInput.technologies.map((tech, i) => (
                  <Chip
                                        key={i} 
                                        label={tech} 
                                        size="small" 
                                        onDelete={() => deleteProjectTechnology(i)} /* Deletes from TEMP state */
                  />
                ))}
              </Box>
                            <TextField label="Project URL" value={projectInput.url} onChange={(e) => setProjectInput({...projectInput, url: e.target.value})} size="small"/>
                       </Stack>
                    }
                />
            </Grid>
          </Grid>
        );
        case 'mentor':
        return (
          <Grid container spacing={2} sx={{mt: 1}}>
             {/* Mentor Expertise Array Input */}
             <Grid item xs={12}>
                <ArrayInputSection 
                  title="Expertise" 
                  items={formData.expertise} 
                  renderItem={renderExpertiseItem} 
                  onAdd={addExpertise} 
                  deleteHandler={handleDeleteArrayItem}
                  fieldName="expertise"
                  inputComponent={
              <TextField
                        label="Area of Expertise" 
                value={expertiseInput}
                        onChange={(e) => setExpertiseInput(e.target.value)} /* Updates only temporary state */
                        size="small" 
                        fullWidth/>
                   }
                />
            </Grid>
            {/* Mentor basic info - Use regular handleChange */}
            <Grid item xs={12} sm={6}><TextField required fullWidth name="experience" label="Years of Experience" value={formData.experience} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField required fullWidth name="mentorOrganization" label="Organization" value={formData.mentorOrganization} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField required fullWidth name="designation" label="Designation" value={formData.designation} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField required fullWidth name="officeLocation" label="Office Location" value={formData.officeLocation} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
              <InputLabel>Availability</InputLabel>
                    <Select name="availability" value={formData.availability} onChange={handleChange} label="Availability">
                <MenuItem value="full-time">Full Time</MenuItem>
                <MenuItem value="part-time">Part Time</MenuItem>
                <MenuItem value="flexible">Flexible</MenuItem>
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}><TextField required fullWidth name="preferredTime" label="Preferred Time Slot" value={formData.preferredTime} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField required fullWidth type="number" name="maxTeams" label="Max Teams" value={formData.maxTeams} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth name="researchGate" label="ResearchGate URL" value={formData.researchGate} onChange={handleChange} /></Grid>
          </Grid>
        );
        case 'organizer':
        return (
          <Grid container spacing={2} sx={{mt: 1}}>
             {/* Organizer basic info - Use regular handleChange */}
            <Grid item xs={12} sm={6}><TextField required fullWidth name="organizerOrganization" label="Organization" value={formData.organizerOrganization} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField required fullWidth name="organizerDesignation" label="Designation" value={formData.organizerDesignation} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField required fullWidth name="contactNumber" label="Contact Number" value={formData.contactNumber} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField required fullWidth name="eventManagementExperience" label="Event Mgmt Experience (Years)" value={formData.eventManagementExperience} onChange={handleChange} /></Grid>
            {/* Organizer Previous Events Array Input */}
            <Grid item xs={12}>
                 <ArrayInputSection 
                  title="Previous Events Hosted" 
                  items={formData.previousEvents} 
                  renderItem={renderEventItem} 
                  onAdd={addPreviousEvent} 
                  deleteHandler={handleDeleteArrayItem}
                  fieldName="previousEvents"
                  inputComponent={
            <TextField
                        label="Event Name" 
                value={previousEventsInput}
                        onChange={(e) => setPreviousEventsInput(e.target.value)} /* Updates only temporary state */
                        size="small" 
                        fullWidth/>
                   }
                />
            </Grid>
             <Grid item xs={12} sm={6}><TextField fullWidth name="website" label="Website" value={formData.website} onChange={handleChange} /></Grid>
          </Grid>
        );
        default:
        return null;
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <StyledPaper>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Register Your Account
          </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          {/* Common Fields Section - Use regular handleChange */}
          <Typography variant="subtitle1" gutterBottom>Basic Information</Typography>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><TextField required fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField required fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} /></Grid>
            <Grid item xs={12} sm={6}><TextField required fullWidth label="Password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }} /></Grid>
            <Grid item xs={12} sm={6}><TextField required fullWidth label="Confirm Password" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }} /></Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Role *</InputLabel>
                <Select name="role" value={formData.role} onChange={handleChange} label="Role *">
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="mentor">Mentor</MenuItem>
                    <MenuItem value="organizer">Organizer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Department" name="department" value={formData.department} onChange={handleChange} /></Grid>
             <Grid item xs={12}><TextField fullWidth multiline rows={3} label="Bio / About Me" name="bio" value={formData.bio} onChange={handleChange} /></Grid>
             <Grid item xs={12} sm={6}><TextField fullWidth label="LinkedIn Profile URL" name="linkedin" value={formData.linkedin} onChange={handleChange} InputProps={{ startAdornment: <LinkedInIcon sx={{ mr: 1, color: 'action.active' }} /> }} /></Grid>
             <Grid item xs={12} sm={6}><TextField fullWidth label="GitHub Profile URL" name="github" value={formData.github} onChange={handleChange} InputProps={{ startAdornment: <GitHubIcon sx={{ mr: 1, color: 'action.active' }} /> }} /></Grid>
            </Grid>

          {/* Role Specific Fields Section */}
           <Box sx={{mt: 3}}>
             <Typography variant="subtitle1" gutterBottom>{formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} Specific Information</Typography>
            {renderRoleSpecificFields()}
           </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
            sx={{ mt: 4, mb: 2 }}
            disabled={loading}
            >
            {loading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                Already have an account? Sign In
          </Link>
              </Grid>
            </Grid>
        </Box>
      </StyledPaper>
      <Snackbar
        open={showWelcome}
        autoHideDuration={3000} 
        onClose={() => setShowWelcome(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }} onClose={() => setShowWelcome(false)}>
          {welcomeMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register; 