import React, { useState } from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import { Flip } from '@mui/icons-material';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AuthCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Box
      sx={{
        perspective: '1000px',
        width: '100%',
        maxWidth: 'sm',
        height: '700px',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
        margin: '0 auto',
      }}
    >
      {/* Front side - Login */}
      <Paper
        elevation={8}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          borderRadius: 2,
          overflow: 'auto',
        }}
      >
        <Login onFlip={handleFlip} />
      </Paper>

      {/* Back side - Register */}
      <Paper
        elevation={8}
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          borderRadius: 2,
          overflow: 'auto',
          transform: 'rotateY(180deg)',
        }}
      >
        <Register onFlip={handleFlip} />
      </Paper>

      {/* Flip Button */}
      <IconButton
        onClick={handleFlip}
        sx={{
          position: 'absolute',
          right: -20,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
          zIndex: 2,
          boxShadow: 2,
        }}
      >
        <Flip />
      </IconButton>
    </Box>
  );
};

export default AuthCard; 