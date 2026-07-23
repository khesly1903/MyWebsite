import React from 'react';
import {
  AppBar, Toolbar, Typography, Box, Tabs, Tab, Button,
} from '@mui/material';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const NAV_TABS = [
  { label: 'Articles', path: '/admin/articles' },
  { label: 'Notes', path: '/admin/notes' },
  { label: 'Projects', path: '/admin/projects' },
];

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const activeTab = NAV_TABS.findIndex((t) => location.pathname.startsWith(t.path));

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mr: 2, flexShrink: 0 }}>
            Admin
          </Typography>
          <Tabs
            value={activeTab === -1 ? false : activeTab}
            onChange={(_, i) => navigate(NAV_TABS[i].path)}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ flexGrow: 1 }}
          >
            {NAV_TABS.map((t) => (
              <Tab key={t.path} label={t.label} sx={{ minHeight: 64 }} />
            ))}
          </Tabs>
          <Button component={Link} to="/" color="inherit" size="small">
            ← Site
          </Button>
          <Button onClick={handleLogout} color="inherit" size="small">
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, maxWidth: 900, width: '100%', mx: 'auto', px: 3, py: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
