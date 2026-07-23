import React, { useState, useEffect } from 'react';
import { Box, Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={isVisible}>
      <Box
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
        }}
      >
        <Fab
          size="small"
          onClick={scrollToTop}
          aria-label="scroll back to top"
          sx={{
            bgcolor: 'background.paper',
            color: 'primary.main',
            // boxShadow: (theme) => theme.palette.mode === 'dark' 
            //   ? '0 4px 20px rgba(0,0,0,0.6)' 
            //   : '0 4px 20px rgba(0,0,0,0.1)',
            '&:hover': {
              bgcolor: 'background.paper',
              opacity: 0.9
            }
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>

      </Box>
    </Zoom>
  );
};

export default ScrollToTop;