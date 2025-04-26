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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Chip,
  LinearProgress,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Public as PublicIcon,
} from '@mui/icons-material';

const SDG_GOALS = [
  { id: 1, title: 'No Poverty', color: '#E5243B' },
  { id: 2, title: 'Zero Hunger', color: '#DDA63A' },
  { id: 3, title: 'Good Health and Well-being', color: '#4C9F38' },
  { id: 4, title: 'Quality Education', color: '#C5192D' },
  { id: 5, title: 'Gender Equality', color: '#FF3A21' },
  { id: 6, title: 'Clean Water and Sanitation', color: '#26BDE2' },
  { id: 7, title: 'Affordable and Clean Energy', color: '#FCC30B' },
  { id: 8, title: 'Decent Work and Economic Growth', color: '#A21942' },
  { id: 9, title: 'Industry, Innovation and Infrastructure', color: '#FD6925' },
  { id: 10, title: 'Reduced Inequalities', color: '#DD1367' },
  { id: 11, title: 'Sustainable Cities and Communities', color: '#FD9D24' },
  { id: 12, title: 'Responsible Consumption and Production', color: '#BF8B2E' },
  { id: 13, title: 'Climate Action', color: '#3F7E44' },
  { id: 14, title: 'Life Below Water', color: '#0A97D9' },
  { id: 15, title: 'Life on Land', color: '#56C02B' },
  { id: 16, title: 'Peace, Justice and Strong Institutions', color: '#00689D' },
  { id: 17, title: 'Partnerships for the Goals', color: '#19486A' },
];

const SDGMapping = ({ userRole, entityType }) => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSDG, setSelectedSDG] = useState(null);
  const [mappings, setMappings] = useState([
    {
      id: 1,
      sdgId: 4,
      description: 'Providing quality technical education through competitions',
      impact: 85,
    },
    {
      id: 2,
      sdgId: 9,
      description: 'Fostering innovation in technology and infrastructure',
      impact: 75,
    },
  ]);

  const handleOpenDialog = (sdg = null) => {
    setSelectedSDG(sdg);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedSDG(null);
    setOpenDialog(false);
  };

  const handleSaveMapping = () => {
    // Implement save logic here
    handleCloseDialog();
  };

  const handleDeleteMapping = (mappingId) => {
    setMappings(mappings.filter(mapping => mapping.id !== mappingId));
  };

  const getEntityTitle = () => {
    switch (entityType) {
      case 'student':
        return 'Student SDG Impact';
      case 'mentor':
        return 'Mentor SDG Impact';
      case 'competition':
        return 'Competition SDG Impact';
      case 'system':
        return 'System-wide SDG Impact';
      default:
        return 'SDG Mapping';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PublicIcon color="primary" />
          {getEntityTitle()}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add SDG Mapping
        </Button>
      </Box>

      <Grid container spacing={3}>
        {mappings.map((mapping) => {
          const sdg = SDG_GOALS.find(goal => goal.id === mapping.sdgId);
          return (
            <Grid item xs={12} md={6} key={mapping.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: sdg?.color || 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      <Typography variant="h6" sx={{ color: 'white' }}>
                        {mapping.sdgId}
                      </Typography>
                    </Box>
                    <Typography variant="h6">{sdg?.title}</Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {mapping.description}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Impact Level
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={mapping.impact}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: sdg?.color || 'primary.main',
                        },
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      {mapping.impact}% impact
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpenDialog(mapping)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteMapping(mapping.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedSDG ? 'Edit SDG Mapping' : 'Add New SDG Mapping'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              select
              fullWidth
              label="SDG Goal"
              margin="normal"
              SelectProps={{
                native: true,
              }}
              defaultValue={selectedSDG?.sdgId || ''}
            >
              <option value="">Select an SDG Goal</option>
              {SDG_GOALS.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.id}. {goal.title}
                </option>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              multiline
              rows={4}
              defaultValue={selectedSDG?.description || ''}
            />
            <TextField
              fullWidth
              label="Impact Level (%)"
              margin="normal"
              type="number"
              defaultValue={selectedSDG?.impact || 0}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveMapping} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SDGMapping;