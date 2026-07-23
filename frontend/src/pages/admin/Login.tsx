import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, CircularProgress, Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { access_token } = await authApi.login(email, password);
      login(access_token);
      navigate('/admin/articles', { replace: true });
    } catch {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 380,
          p: 4,
          border: (theme) => `0.5px solid ${theme.palette.divider}`,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
          Admin
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Sign in to manage content
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            required
            fullWidth
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : undefined}
            sx={{ mt: 1 }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
