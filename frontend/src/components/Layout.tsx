import React, { type ReactNode } from 'react';

import { Box } from '@mui/material';

import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <Box component="main" sx={{ flexGrow: 1, maxWidth: "lg", width: '100%', mx: 'auto', display: "flex", flexDirection: 'column', px:"1.5rem" }}>
        {children}
      </Box>

      <Footer />
      <ScrollToTop />
    </Box>
  );
};


export default Layout;
