import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Business as BusinessIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

const IndustryPartner = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [partners, setPartners] = useState([
    {
      id: 1,
      name: 'Tech Solutions Inc.',
      industry: 'Technology',
      description: 'Leading software development company specializing in AI and ML solutions.',
      contact: {
        email: 'contact@techsolutions.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
      },
      opportunities: [
        { id: 1, title: 'Summer Internship', type: 'internship', deadline: '2024-05-01' },
        { id: 2, title: 'Project Collaboration', type: 'project', deadline: '2024-06-15' },
      ],
      activeCollaborations: 3,
    },
    // Add more mock partners as needed
  ]);

  const handleOpenDialog = (partner = null) => {
    setSelectedPartner(partner);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedPartner(null);
    setOpenDialog(false);
  };

  const handleSavePartner = () => {
    // Implement save logic here
    handleCloseDialog();
  };

  const handleDeletePartner = (partnerId) => {
    // Implement delete logic here
    setPartners(partners.filter(partner => partner.id !== partnerId));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Industry Partners
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Partner
        </Button>
      </Box>

      <Grid container spacing={3}>
        {partners.map((partner) => (
          <Grid item xs={12} md={6} key={partner.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <BusinessIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{partner.name}</Typography>
                    <Typography color="text.secondary">{partner.industry}</Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {partner.description}
                </Typography>

                <List dense>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <EmailIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Email" secondary={partner.contact.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <PhoneIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Phone" secondary={partner.contact.phone} />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <LocationIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Location" secondary={partner.contact.location} />
                  </ListItem>
                </List>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Active Opportunities
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {partner.opportunities.map((opportunity) => (
                    <Chip
                      key={opportunity.id}
                      label={opportunity.title}
                      color={opportunity.type === 'internship' ? 'primary' : 'secondary'}
                      size="small"
                    />
                  ))}
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  Active Collaborations
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {partner.activeCollaborations} ongoing projects
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleOpenDialog(partner)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeletePartner(partner.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedPartner ? 'Edit Partner' : 'Add New Partner'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Company Name"
              margin="normal"
              defaultValue={selectedPartner?.name}
            />
            <TextField
              fullWidth
              label="Industry"
              margin="normal"
              defaultValue={selectedPartner?.industry}
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              multiline
              rows={4}
              defaultValue={selectedPartner?.description}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              defaultValue={selectedPartner?.contact?.email}
            />
            <TextField
              fullWidth
              label="Phone"
              margin="normal"
              defaultValue={selectedPartner?.contact?.phone}
            />
            <TextField
              fullWidth
              label="Location"
              margin="normal"
              defaultValue={selectedPartner?.contact?.location}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSavePartner} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IndustryPartner; 