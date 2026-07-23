import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, Switch,
  FormControlLabel, CircularProgress, IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { adminNotesApi, type CreateNoteDto } from '../../../services/api';
import MarkdownEditor from '../../../components/MarkdownEditor';

const NoteForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateNoteDto>({
    title: '',
    content: '',
    published: false,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit || !id) return;
    setLoading(true);
    adminNotesApi.getById(id)
      .then((n) => setForm({ title: n.title, content: n.content, published: n.published }))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const set = (field: keyof CreateNoteDto, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (isEdit && id) {
        await adminNotesApi.update(id, form);
      } else {
        await adminNotesApi.create(form);
      }
      navigate('/admin/notes');
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
        <IconButton onClick={() => navigate('/admin/notes')} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={700}>
          {isEdit ? 'Edit Note' : 'New Note'}
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

        <MarkdownEditor
          value={form.content}
          onChange={(v) => set('content', v)}
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
            {isEdit ? 'Save Changes' : 'Create Note'}
          </Button>
          <Button variant="outlined" onClick={() => navigate('/admin/notes')}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NoteForm;
