import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableHead, TableRow, IconButton, Chip, Tooltip, CircularProgress,
  Checkbox,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { adminProjectsApi } from '../../../services/api';
import type { Project } from '../../../types/api';
import { formatDate } from '../../../utils/formatDate';

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    adminProjectsApi.getAll()
      .then(setProjects)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleFeaturedChange = async (project: Project, checked: boolean) => {
    if (checked) {
      const featuredCount = projects.filter(p => p.isFeatured && p.id !== project.id).length;
      if (featuredCount >= 3) {
        alert('You can only feature up to 3 projects on the home page.');
        return;
      }
    }
    
    setProjects(prev => prev.map(p => p.id === project.id ? { ...p, isFeatured: checked } : p));
    try {
      await adminProjectsApi.update(project.id, { isFeatured: checked });
    } catch (e) {
      alert(`Failed to update: ${(e as Error).message}`);
      setProjects(prev => prev.map(p => p.id === project.id ? { ...p, isFeatured: !checked } : p));
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await adminProjectsApi.delete(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      alert(`Delete failed: ${(e as Error).message}`);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Projects</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/projects/new')}
        >
          New Project
        </Button>
      </Box>

      {loading && <CircularProgress size={24} />}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>GitHub</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Featured</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} sx={{ color: 'text.secondary' }}>No projects yet.</TableCell>
              </TableRow>
            )}
            {projects.map((p) => (
              <TableRow key={p.id} hover>
                <TableCell sx={{ fontWeight: 500 }}>{p.title}</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: '0.8rem', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.github ?? '—'}
                </TableCell>
                <TableCell>
                  <Chip
                    label={p.published ? 'Published' : 'Draft'}
                    size="small"
                    color={p.published ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={p.isFeatured ?? false}
                    onChange={(e) => handleFeaturedChange(p, e.target.checked)}
                    color="secondary"
                  />
                </TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                  {formatDate(p.createdAt)}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => navigate(`/admin/projects/${p.id}/edit`)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error" onClick={() => handleDelete(p.id, p.title)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default AdminProjects;
