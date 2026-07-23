import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 4, 
        mt: 'auto', 
        bgcolor: 'transparent', 
        borderTop: (theme) => `0.5px solid ${theme.palette.primary.main}` 
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Berkay Kaya. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              href="https://github.com/khesly1903" 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
              aria-label="GitHub"
            >
              <GitHub />
            </IconButton>
            <IconButton 
              href="https://www.linkedin.com/in/kayaberkay1729/" 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
              aria-label="LinkedIn"
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
