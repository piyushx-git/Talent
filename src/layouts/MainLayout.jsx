import React, { useState, useContext } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  EmojiEvents,
  School,
  Person,
  Settings,
  Logout,
  ChevronLeft,
  Notifications,
  Group,
  Assessment,
  Chat,
  Business,
  Public as PublicIcon,
} from '@mui/icons-material';
import { AuthContext } from '../App';

const drawerWidth = 240;

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Role-specific navigation items
  const getNavigationItems = () => {
    switch (userRole) {
      case 'student':
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: '/student/dashboard' },
          { text: 'My Profile', icon: <Person />, path: '/student/profile' },
          { text: 'Team Formation', icon: <Group />, path: '/student/teams' },
          { text: 'Competitions', icon: <EmojiEvents />, path: '/student/competitions' },
          { text: 'Mentorship', icon: <School />, path: '/student/mentorship' },
          { text: 'Team Chat', icon: <Chat />, path: '/student/chat/:teamId' },
          { text: 'SDG Mapping', icon: <PublicIcon />, path: '/student/sdg-mapping' },
        ];
      case 'mentor':
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: '/mentor/dashboard' },
          { text: 'My Profile', icon: <Person />, path: '/mentor/profile' },
          { text: 'Assigned Teams', icon: <Group />, path: '/mentor/teams' },
          { text: 'Mentorship Sessions', icon: <School />, path: '/mentor/mentorship' },
          { text: 'Evaluations', icon: <Assessment />, path: '/mentor/evaluations' },
          { text: 'Team Chat', icon: <Chat />, path: '/mentor/chat/:teamId' },
          { text: 'SDG Mapping', icon: <PublicIcon />, path: '/mentor/sdg-mapping' },
        ];
      case 'organizer':
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: '/organizer/dashboard' },
          { text: 'Organizer Profile', icon: <Person />, path: '/organizer/profile' },
          { text: 'Competitions', icon: <EmojiEvents />, path: '/organizer/competitions' },
          { text: 'Teams', icon: <Group />, path: '/organizer/teams' },
          { text: 'Mentorship', icon: <School />, path: '/organizer/mentorship' },
          { text: 'SDG Mapping', icon: <PublicIcon />, path: '/organizer/sdg-mapping' },
        ];
      case 'admin':
        return [
          { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
          { text: 'My Profile', icon: <Person />, path: '/admin/profile' },
          { text: 'User Management', icon: <People />, path: '/admin/users' },
          { text: 'Competition Management', icon: <EmojiEvents />, path: '/admin/competitions' },
          { text: 'Industry Partners', icon: <Business />, path: '/admin/industry-partners' },
          { text: 'SDG Mapping', icon: <PublicIcon />, path: '/admin/sdg-mapping' },
        ];
      default:
        return [{ text: 'Dashboard', icon: <Dashboard />, path: `/${userRole}/dashboard` }];
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          TalentHunt
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {getNavigationItems().map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {userRole !== 'organizer' && (
          <ListItem button onClick={() => navigate(`/${userRole}/settings`)}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        )}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              flexGrow: 1,
              color: 'text.primary',
              fontWeight: 600,
            }}
          >
            {getNavigationItems().find(item => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>
          <IconButton color="primary">
            <Notifications />
          </IconButton>
          <IconButton
            onClick={handleMenuOpen}
            sx={{ ml: 2 }}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>U</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => { handleMenuClose(); navigate(`/${userRole}/profile`); }}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); navigate(`/${userRole}/settings`); }}>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout; 