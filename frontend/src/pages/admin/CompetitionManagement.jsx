import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

const CompetitionManagement = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [competitions, setCompetitions] = useState([
    {
      id: 1,
      name: 'AI Hackathon 2024',
      startDate: '2024-05-01',
      endDate: '2024-05-15',
      status: 'active',
      participants: 45,
      teams: 12
    },
    {
      id: 2,
      name: 'Web Development Challenge',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      status: 'upcoming',
      participants: 30,
      teams: 10
    },
    {
      id: 3,
      name: 'Data Science Cup',
      startDate: '2024-07-01',
      endDate: '2024-07-15',
      status: 'upcoming',
      participants: 25,
      teams: 8
    }
  ]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Competition Management
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Competitions</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenDialog}
                >
                  Add Competition
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Participants</TableCell>
                      <TableCell>Teams</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {competitions.map((competition) => (
                      <TableRow key={competition.id}>
                        <TableCell>{competition.name}</TableCell>
                        <TableCell>{competition.startDate}</TableCell>
                        <TableCell>{competition.endDate}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: 'inline-block',
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              bgcolor: competition.status === 'active' ? 'success.light' : 'warning.light',
                              color: 'white'
                            }}
                          >
                            {competition.status}
                          </Box>
                        </TableCell>
                        <TableCell>{competition.participants}</TableCell>
                        <TableCell>{competition.teams}</TableCell>
                        <TableCell>
                          <Tooltip title="View">
                            <IconButton size="small">
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small">
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
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

      {/* Add Competition Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Competition</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Competition Name"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="End Date"
              type="date"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            Add Competition
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompetitionManagement; 