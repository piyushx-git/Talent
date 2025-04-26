import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Chip,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  Check,
  Close,
  Edit,
  Delete,
  Person,
  School,
} from '@mui/icons-material';
import api from '../../utils/axiosConfig';

const MentorManagement = () => {
  const [mentors, setMentors] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: [],
    status: 'pending',
  });

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await api.get('/api/mentors');
      setMentors(response.data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  const handleApproveMentor = async (mentorId) => {
    try {
      await api.put(`/api/mentors/${mentorId}/approve`);
      fetchMentors();
    } catch (error) {
      console.error('Error approving mentor:', error);
    }
  };

  const handleRejectMentor = async (mentorId) => {
    try {
      await api.put(`/api/mentors/${mentorId}/reject`);
      fetchMentors();
    } catch (error) {
      console.error('Error rejecting mentor:', error);
    }
  };

  const handleEditMentor = (mentor) => {
    setSelectedMentor(mentor);
    setFormData({
      name: mentor.name,
      email: mentor.email,
      expertise: mentor.expertise,
      status: mentor.status,
    });
    setOpenDialog(true);
  };

  const handleDeleteMentor = async (mentorId) => {
    if (window.confirm('Are you sure you want to delete this mentor?')) {
      try {
        await api.delete(`/api/mentors/${mentorId}`);
        fetchMentors();
      } catch (error) {
        console.error('Error deleting mentor:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedMentor) {
        await api.put(`/api/mentors/${selectedMentor._id}`, formData);
      }
      setOpenDialog(false);
      fetchMentors();
    } catch (error) {
      console.error('Error updating mentor:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'warning';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Mentor Management
      </Typography>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Expertise</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mentors.map((mentor) => (
                  <TableRow key={mentor._id}>
                    <TableCell>{mentor.name}</TableCell>
                    <TableCell>{mentor.email}</TableCell>
                    <TableCell>
                      {mentor.expertise.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          size="small"
                          sx={{ mr: 0.5 }}
                        />
                      ))}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={mentor.status}
                        color={getStatusColor(mentor.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {mentor.status === 'pending' && (
                        <>
                          <IconButton
                            onClick={() => handleApproveMentor(mentor._id)}
                            color="success"
                          >
                            <Check />
                          </IconButton>
                          <IconButton
                            onClick={() => handleRejectMentor(mentor._id)}
                            color="error"
                          >
                            <Close />
                          </IconButton>
                        </>
                      )}
                      <IconButton
                        onClick={() => handleEditMentor(mentor)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteMentor(mentor._id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {selectedMentor ? 'Edit Mentor' : 'Add New Mentor'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                label="Status"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MentorManagement; 