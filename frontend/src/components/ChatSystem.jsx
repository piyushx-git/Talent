import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  MoreVert as MoreVertIcon,
  Group as GroupIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

const ChatSystem = ({ userRole, teamId, mentorId }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John Doe',
      senderRole: 'student',
      content: 'Hi everyone! I\'m excited to work on this project.',
      timestamp: '2024-03-20T10:00:00',
      attachments: [],
    },
    {
      id: 2,
      sender: 'Dr. Smith',
      senderRole: 'mentor',
      content: 'Welcome! Let\'s start by discussing the project requirements.',
      timestamp: '2024-03-20T10:05:00',
      attachments: [],
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'Current User', // Replace with actual user name
        senderRole: userRole,
        content: newMessage,
        timestamp: new Date().toISOString(),
        attachments: selectedFile ? [selectedFile] : [],
      };
      setMessages([...messages, message]);
      setNewMessage('');
      setSelectedFile(null);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Chat Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GroupIcon color="primary" />
            <Typography variant="h6">Team Chat</Typography>
          </Box>
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>View Team Details</MenuItem>
            <MenuItem onClick={handleMenuClose}>Schedule Meeting</MenuItem>
            <MenuItem onClick={handleMenuClose}>Share Resources</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Messages Area */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        <List>
          {messages.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                flexDirection: message.senderRole === userRole ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  {message.sender[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2">
                      {message.sender}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatTimestamp(message.timestamp)}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        bgcolor: message.senderRole === userRole ? 'primary.light' : 'grey.100',
                        p: 1,
                        borderRadius: 1,
                        maxWidth: '70%',
                      }}
                    >
                      {message.content}
                    </Typography>
                    {message.attachments.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        {message.attachments.map((attachment, index) => (
                          <Typography
                            key={index}
                            variant="body2"
                            color="primary"
                            sx={{ cursor: 'pointer' }}
                          >
                            📎 {attachment.name}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      {/* Message Input */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <Tooltip title="Attach File">
            <IconButton onClick={() => fileInputRef.current.click()}>
              <AttachFileIcon />
            </IconButton>
          </Tooltip>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>
        {selectedFile && (
          <Typography variant="caption" color="text.secondary">
            Selected file: {selectedFile.name}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default ChatSystem; 