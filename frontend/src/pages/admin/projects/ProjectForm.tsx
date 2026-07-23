import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, Switch,
  FormControlLabel, CircularProgress, IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { adminProjectsApi, type CreateProjectDto } from '../../../services/api';
import type { Project } from '../../../types/api';
import MarkdownEditor from '../../../components/MarkdownEditor';

const ProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateProjectDto>({
    title: '',
    description: '',
    content: '',
    coverImage: '',
    link: '',
    github: '',
    published: false,
    isFeatured: false,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  useEffect(() => {
    adminProjectsApi.getAll().then(setAllProjects).catch(console.error);
  }, []);

  useEffect(() => {
    if (!isEdit || !id) return;
    setLoading(true);
    adminProjectsApi.getById(id)
      .then((p) => setForm({
        title: p.title,
        description: p.description,
        content: p.content ?? '',
        coverImage: p.coverImage ?? '',
        link: p.link ?? '',
        github: p.github ?? '',
        published: p.published,
        isFeatured: p.isFeatured,
      }))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      const featuredCount = allProjects.filter(p => p.isFeatured && p.id !== id).length;
      if (featuredCount >= 3) {
        alert('You can only feature up to 3 projects on the home page.');
        return;
      }
    }
    set('isFeatured', checked);
  };

  const set = (field: keyof CreateProjectDto, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const dto: CreateProjectDto = {
        ...form,
        content: form.content || undefined,
        coverImage: form.coverImage || undefined,
        link: form.link || undefined,
        github: form.github || undefined,
      };
      if (isEdit && id) {
        await adminProjectsApi.update(id, dto);
      } else {
        await adminProjectsApi.create(dto);
      }
      navigate('/admin/projects');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <CircularProgress size={24} />;

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <IconButton onClick={() => navigate('/admin/projects')} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={700}>
          {isEdit ? 'Edit Project' : 'New Project'}
        </Typography>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2, fontSize: '0.875rem' }}>
          {error}
        </Typography>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField
          label="Title"
          required
          fullWidth
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
        />

        <TextField
          label="Description"
          required
          fullWidth
          multiline
          minRows={2}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
        />

        <MarkdownEditor
          value={form.content ?? ''}
          onChange={(v) => set('content', v)}
          label="Content (Markdown, optional)"
          minRows={10}
        />

        <TextField
          label="Cover Image URL"
          fullWidth
          value={form.coverImage}
          onChange={(e) => set('coverImage', e.target.value)}
          placeholder="https://..."
        />

        <TextField
          label="GitHub URL"
          fullWidth
          value={form.github}
          onChange={(e) => set('github', e.target.value)}
          placeholder="https://github.com/..."
        />

        <TextField
          label="Live URL"
          fullWidth
          value={form.link}
          onChange={(e) => set('link', e.target.value)}
          placeholder="https://..."
        />

        <FormControlLabel
          control={
            <Switch
              checked={form.published ?? false}
              onChange={(e) => set('published', e.target.checked)}
              color="primary"
            />
          }
          label="Published"
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={saving}
            startIcon={saving ? <CircularProgress size={16} /> : undefined}
          >
            {isEdit ? 'Save Changes' : 'Create Project'}
          </Button>
          <Button variant="outlined" onClick={() => navigate('/admin/projects')}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectForm;
