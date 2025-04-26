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
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Check,
  Close,
  Edit,
  Delete,
  Group,
  EmojiEvents,
} from '@mui/icons-material';
import api from '../../utils/axiosConfig';

const TeamManagement = () => {
  const [teams, setTeams] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [openTeamDialog, setOpenTeamDialog] = useState(false);
  const [openHackathonDialog, setOpenHackathonDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [teamFormData, setTeamFormData] = useState({
    name: '',
    members: [],
    status: 'pending',
  });
  const [hackathonFormData, setHackathonFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'pending',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchTeams();
    fetchHackathons();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await api.get('/teams');
      // Check if response.data is an array, if not, use response.data.data
      const teamsData = Array.isArray(response.data) ? response.data : response.data.data;
      setTeams(teamsData || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setError('Failed to fetch teams');
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchHackathons = async () => {
    try {
      const response = await api.get('/hackathons');
      const hackathonsData = Array.isArray(response.data) ? response.data : response.data.data;
      setHackathons(hackathonsData || []);
    } catch (error) {
      console.error('Error fetching hackathons:', error);
      setHackathons([]);
    }
  };

  const handleApproveTeam = async (teamId) => {
    try {
      setLoading(true);
      await api.patch(`/teams/${teamId}/status`, { status: 'approved' });
      setSuccess('Team approved successfully');
      fetchTeams();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve team');
    } finally {
      setLoading(false);
    }
  };

  const handleRejectTeam = async (teamId) => {
    try {
      setLoading(true);
      await api.patch(`/teams/${teamId}/status`, { status: 'rejected' });
      setSuccess('Team rejected successfully');
      fetchTeams();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reject team');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveHackathon = async (hackathonId) => {
    try {
      await api.patch(`/hackathons/${hackathonId}/approve`);
      fetchHackathons();
    } catch (error) {
      console.error('Error approving hackathon:', error);
    }
  };

  const handleRejectHackathon = async (hackathonId) => {
    try {
      await api.patch(`/hackathons/${hackathonId}/reject`);
      fetchHackathons();
    } catch (error) {
      console.error('Error rejecting hackathon:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
      case 'recruiting':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Team & Hackathon Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Teams Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Team Requests
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Team Name</TableCell>
                      <TableCell>Leader</TableCell>
                      <TableCell>Members</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    ) : teams && teams.length > 0 ? (
                      teams.map((team) => (
                        <TableRow key={team._id}>
                          <TableCell>{team.name}</TableCell>
                          <TableCell>{team.leader?.name || 'N/A'}</TableCell>
                          <TableCell>{team.members?.length || 0}</TableCell>
                          <TableCell>
                            <Chip
                              label={team.status}
                              color={getStatusColor(team.status)}
                            />
                          </TableCell>
                          <TableCell>
                            {team.status === 'pending' && (
                              <>
                                <IconButton
                                  color="success"
                                  onClick={() => handleApproveTeam(team._id)}
                                >
                                  <Check />
                                </IconButton>
                                <IconButton
                                  color="error"
                                  onClick={() => handleRejectTeam(team._id)}
                                >
                                  <Close />
                                </IconButton>
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No teams found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Hackathons Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Hackathon Requests
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Organizer</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {hackathons.map((hackathon) => (
                      <TableRow key={hackathon._id}>
                        <TableCell>{hackathon.title}</TableCell>
                        <TableCell>{hackathon.organizer?.name}</TableCell>
                        <TableCell>
                          <Chip
                            label={hackathon.status}
                            color={getStatusColor(hackathon.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {hackathon.status === 'pending' && (
                            <>
                              <IconButton
                                onClick={() => handleApproveHackathon(hackathon._id)}
                                color="success"
                              >
                                <Check />
                              </IconButton>
                              <IconButton
                                onClick={() => handleRejectHackathon(hackathon._id)}
                                color="error"
                              >
                                <Close />
                              </IconButton>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeamManagement; 