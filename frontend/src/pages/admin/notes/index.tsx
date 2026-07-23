import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableHead, TableRow, IconButton, Chip, Tooltip, CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { adminNotesApi } from '../../../services/api';
import type { Note } from '../../../types/api';
import { formatDate } from '../../../utils/formatDate';

const AdminNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    adminNotesApi.getAll()
      .then(setNotes)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await adminNotesApi.delete(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (e) {
      alert(`Delete failed: ${(e as Error).message}`);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Notes</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/notes/new')}
        >
          New Note
        </Button>
      </Box>

      {loading && <CircularProgress size={24} />}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} sx={{ color: 'text.secondary' }}>No notes yet.</TableCell>
              </TableRow>
            )}
            {notes.map((n) => (
              <TableRow key={n.id} hover>
                <TableCell sx={{ fontWeight: 500 }}>{n.title}</TableCell>
                <TableCell>
                  <Chip
                    label={n.published ? 'Published' : 'Draft'}
                    size="small"
                    color={n.published ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                  {formatDate(n.createdAt)}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => navigate(`/admin/notes/${n.id}/edit`)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error" onClick={() => handleDelete(n.id, n.title)}>
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

export default AdminNotes;
