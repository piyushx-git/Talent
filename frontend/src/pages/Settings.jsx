import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Stack,
} from '@mui/material';
import {
  Notifications,
  Security,
  Palette,
  Language,
  Email,
  Delete,
} from '@mui/icons-material';

const Settings = () => {
  // Account Settings
  const [email, setEmail] = useState('john.doe@university.edu');
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  
  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    teamInvites: true,
    competitionUpdates: true,
    mentorMessages: true,
    deadlineReminders: true,
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showSkills: true,
    showAchievements: true,
    allowTeamInvites: true,
  });

  // Dialog States
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNotificationChange = (setting) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handlePrivacyChange = (setting) => {
    setPrivacy(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handlePasswordChange = () => {
    // Here you would typically make an API call to change the password
    console.log('Changing password...');
    setPasswordDialog(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    // Here you would typically make an API call to delete the account
    console.log('Deleting account...');
    setDeleteDialog(false);
  };

  const SettingsSection = ({ title, icon, children }) => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography variant="h6" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      {children}
    </Paper>
  );

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {/* Account Settings */}
      <SettingsSection title="Account Settings" icon={<Security sx={{ color: 'primary.main' }} />}>
        <List>
          <ListItem>
            <ListItemText
              primary="Email"
              secondary={email}
            />
            <ListItemSecondaryAction>
              <Button size="small" color="primary">
                Change
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Password"
              secondary="Last changed 3 months ago"
            />
            <ListItemSecondaryAction>
              <Button size="small" color="primary" onClick={() => setPasswordDialog(true)}>
                Change
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Language"
              secondary="Choose your preferred language"
            />
            <ListItemSecondaryAction>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="de">German</MenuItem>
                </Select>
              </FormControl>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Theme"
              secondary="Choose your preferred theme"
            />
            <ListItemSecondaryAction>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="system">System</MenuItem>
                </Select>
              </FormControl>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </SettingsSection>

      {/* Notification Settings */}
      <SettingsSection title="Notification Settings" icon={<Notifications sx={{ color: 'primary.main' }} />}>
        <List>
          <ListItem>
            <ListItemText
              primary="Email Notifications"
              secondary="Receive important updates via email"
            />
            <ListItemSecondaryAction>
              <Switch
                checked={notifications.emailNotifications}
                onChange={() => handleNotificationChange('emailNotifications')}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Team Invites"
              secondary="Get notified when someone invites you to join their team"
            />
            <ListItemSecondaryAction>
              <Switch
                checked={notifications.teamInvites}
                onChange={() => handleNotificationChange('teamInvites')}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Competition Updates"
              secondary="Stay informed about competition announcements"
            />
            <ListItemSecondaryAction>
              <Switch
                checked={notifications.competitionUpdates}
                onChange={() => handleNotificationChange('competitionUpdates')}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Mentor Messages"
              secondary="Get notified when mentors send you messages"
            />
            <ListItemSecondaryAction>
              <Switch
                checked={notifications.mentorMessages}
                onChange={() => handleNotificationChange('mentorMessages')}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Deadline Reminders"
              secondary="Receive reminders for upcoming deadlines"
            />
            <ListItemSecondaryAction>
              <Switch
                checked={notifications.deadlineReminders}
                onChange={() => handleNotificationChange('deadlineReminders')}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </SettingsSection>

      {/* Privacy Settings */}
      <SettingsSection title="Privacy Settings" icon={<Security sx={{ color: 'primary.main' }} />}>
        <List>
          <ListItem>
            <ListItemText
              primary="Profile Visibility"
              secondary="Control who can see your profile"
            />
            <ListItemSecondaryAction>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={privacy.profileVisibility}
                  onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
                >
                  <MenuItem value="public">Public</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
                  <MenuItem value="teams">Teams Only</MenuItem>
                </Select>
              </FormControl>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Show Skills"
              secondary="Display your skills on your profile"
            />
            <ListItemSecondaryAction>
              <Switch
                checked={privacy.showSkills}
                onChange={() => handlePrivacyChange('showSkills')}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Show Achievements"
              secondary="Display your achievements on your profile"
            />
            <ListItemSecondaryAction>
              <Switch
                checked={privacy.showAchievements}
                onChange={() => handlePrivacyChange('showAchievements')}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Allow Team Invites"
              secondary="Let others invite you to their teams"
            />
            <ListItemSecondaryAction>
              <Switch
                checked={privacy.allowTeamInvites}
                onChange={() => handlePrivacyChange('allowTeamInvites')}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </SettingsSection>

      {/* Danger Zone */}
      <SettingsSection title="Danger Zone" icon={<Delete sx={{ color: 'error.main' }} />}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          These actions are irreversible. Please proceed with caution.
        </Alert>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setDeleteDialog(true)}
          startIcon={<Delete />}
        >
          Delete Account
        </Button>
      </SettingsSection>

      {/* Change Password Dialog */}
      <Dialog open={passwordDialog} onClose={() => setPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Current Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
            />
            <TextField
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialog(false)}>Cancel</Button>
          <Button
            onClick={handlePasswordChange}
            variant="contained"
            disabled={!oldPassword || !newPassword || newPassword !== confirmPassword}
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete your account? This action cannot be undone.
          </Typography>
          <Typography variant="body2" color="error">
            All your data, including teams, projects, and achievements will be permanently deleted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} variant="contained" color="error">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings; 