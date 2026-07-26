import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';


const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const getLogoText = (pathname: string) => {
    if (pathname === '/') return '/berkay';
    const depth = pathname.split('/').filter(Boolean).length;
    let prefix = '';
    for (let i = 0; i < depth; i++) {
      prefix += '../';
    }
    return `${prefix}berkay`;
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      color="inherit"
      sx={{ 
        borderBottom: (theme) => `0.5px solid ${theme.palette.primary.main}`,
        bgcolor: 'background.default'
      }}
    >
      <Container maxWidth="md">
        <Toolbar>
          <Typography
            variant="ice"
            component={Link}
            to="/"
            sx={{ 
              flexGrow: 1, 
              fontWeight: 800, 
              letterSpacing: 2, 
              cursor: 'pointer', 
              textDecoration: 'none', 
              color: 'inherit',
              fontSize: '1.5rem'
            }}
          >
            {getLogoText(location.pathname)}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button 
              component={Link} 
              to="/projects" 
              color={isActive('/projects') ? 'primary' : 'inherit'}
              disableRipple
              sx={{ 
                '&:hover': { backgroundColor: 'transparent' }, 
                borderRadius: 0 
              }}
            >
              <Typography variant="ice" sx={{ fontSize: "1.5rem" }}>[projects]</Typography>
            </Button>
            <Button 
              component={Link} 
              to="/articles" 
              color={isActive('/articles') ? 'primary' : 'inherit'}
              disableRipple
              sx={{ 
                '&:hover': { backgroundColor: 'transparent' }, 
                borderRadius: 0 
              }}
            >
              <Typography variant="ice" sx={{ fontSize: "1.5rem" }}>[articles]</Typography>
            </Button>
            {/* <Button 
              component={Link} 
              to="/notes" 
              color={isActive('/notes') ? 'primary' : 'inherit'}
              disableRipple
              sx={{ 
                '&:hover': { backgroundColor: 'transparent' }, 
                borderRadius: 0 
              }}
            >
              <Typography variant="ice" sx={{ fontSize: "1.5rem" }}>[notes]</Typography>
            </Button> */}

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};


export default Navbar;
