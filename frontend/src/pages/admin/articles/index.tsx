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
import { adminArticlesApi } from '../../../services/api';
import type { Article } from '../../../types/api';
import { formatDate } from '../../../utils/formatDate';

const AdminArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    adminArticlesApi.getAll()
      .then(setArticles)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleFeaturedChange = async (article: Article, checked: boolean) => {
    if (checked) {
      const featuredCount = articles.filter(a => a.isFeatured && a.id !== article.id).length;
      if (featuredCount >= 3) {
        alert('You can only feature up to 3 articles on the home page.');
        return;
      }
    }
    
    setArticles(prev => prev.map(a => a.id === article.id ? { ...a, isFeatured: checked } : a));
    try {
      await adminArticlesApi.update(article.id, { isFeatured: checked });
    } catch (e) {
      alert(`Failed to update: ${(e as Error).message}`);
      setArticles(prev => prev.map(a => a.id === article.id ? { ...a, isFeatured: !checked } : a));
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await adminArticlesApi.delete(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      alert(`Delete failed: ${(e as Error).message}`);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Articles</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/articles/new')}
        >
          New Article
        </Button>
      </Box>

      {loading && <CircularProgress size={24} />}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Featured</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} sx={{ color: 'text.secondary' }}>No articles yet.</TableCell>
              </TableRow>
            )}
            {articles.map((a) => (
              <TableRow key={a.id} hover>
                <TableCell sx={{ fontWeight: 500 }}>{a.title}</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>{a.slug}</TableCell>
                <TableCell>
                  <Chip
                    label={a.published ? 'Published' : 'Draft'}
                    size="small"
                    color={a.published ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={a.isFeatured ?? false}
                    onChange={(e) => handleFeaturedChange(a, e.target.checked)}
                    color="secondary"
                  />
                </TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                  {formatDate(a.createdAt)}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => navigate(`/admin/articles/${a.id}/edit`)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error" onClick={() => handleDelete(a.id, a.title)}>
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

export default AdminArticles;
