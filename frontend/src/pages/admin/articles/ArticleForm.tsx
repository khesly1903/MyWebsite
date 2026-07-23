import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, Switch,
  FormControlLabel, CircularProgress, IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { adminArticlesApi, type CreateArticleDto } from '../../../services/api';
import type { Article } from '../../../types/api';
import MarkdownEditor from '../../../components/MarkdownEditor';
import { slugify } from '../../../utils/slugify';

const ArticleForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateArticleDto>({
    slug: '',
    title: '',
    description: '',
    content: '',
    coverImage: '',
    published: false,
    isFeatured: false,
  });
  const [slugManual, setSlugManual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allArticles, setAllArticles] = useState<Article[]>([]);

  useEffect(() => {
    adminArticlesApi.getAll().then(setAllArticles).catch(console.error);
  }, []);

  useEffect(() => {
    if (!isEdit || !id) return;
    setLoading(true);
    adminArticlesApi.getById(id)
      .then((a) => {
        setForm({
          slug: a.slug,
          title: a.title,
          description: a.description,
          content: a.content,
          coverImage: a.coverImage ?? '',
          published: a.published,
          isFeatured: a.isFeatured,
        });
        setSlugManual(true);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      const featuredCount = allArticles.filter(a => a.isFeatured && a.id !== id).length;
      if (featuredCount >= 3) {
        alert('You can only feature up to 3 articles on the home page.');
        return;
      }
    }
    set('isFeatured', checked);
  };

  const set = (field: keyof CreateArticleDto, value: string | boolean) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'title' && !slugManual) {
        next.slug = slugify(value as string);
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const dto: CreateArticleDto = {
        ...form,
        coverImage: form.coverImage || undefined,
      };
      if (isEdit && id) {
        await adminArticlesApi.update(id, dto);
      } else {
        await adminArticlesApi.create(dto);
      }
      navigate('/admin/articles');
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
        <IconButton onClick={() => navigate('/admin/articles')} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={700}>
          {isEdit ? 'Edit Article' : 'New Article'}
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
          label="Slug"
          required
          fullWidth
          value={form.slug}
          onChange={(e) => {
            setSlugManual(true);
            set('slug', e.target.value);
          }}
          helperText="Auto-generated from title. Edit to override."
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
          value={form.content}
          onChange={(v) => set('content', v)}
        />

        <TextField
          label="Cover Image URL"
          fullWidth
          value={form.coverImage}
          onChange={(e) => set('coverImage', e.target.value)}
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
            {isEdit ? 'Save Changes' : 'Create Article'}
          </Button>
          <Button variant="outlined" onClick={() => navigate('/admin/articles')}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ArticleForm;
