import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Divider, Skeleton } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notesApi } from '../../services/api';
import type { Note } from '../../types/api';
import { formatDate } from '../../utils/formatDate';

const markdownSx = {
  '& p': { typography: 'body1', lineHeight: 1.8, mb: 1 },
  '& a': { color: 'primary.main' },
  '& code': {
    fontFamily: '"Fira Code", "Courier New", monospace',
    fontSize: '0.85em',
    bgcolor: 'action.hover',
    px: 0.5,
    borderRadius: 0.5,
  },
  '& pre': { bgcolor: 'action.hover', p: 2, borderRadius: 2, overflowX: 'auto', mb: 1 },
  '& pre code': { bgcolor: 'transparent', px: 0 },
  '& ul, & ol': { pl: 3, mb: 1 },
  '& li': { typography: 'body1', lineHeight: 1.7 },
  '& blockquote': {
    borderLeft: (theme: { palette: { primary: { main: string } } }) =>
      `3px solid ${theme.palette.primary.main}`,
    pl: 2,
    ml: 0,
    color: 'text.secondary',
    // fontStyle: 'italic',
  },
};

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    notesApi.getAll()
      .then(setNotes)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ mt: 8, mb: 8 }}>
      <Typography variant="ice" sx={{ fontSize: '2.5rem', mb: 6, display: 'block' }}>
        notes
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rectangular" height={160} sx={{ borderRadius: 2 }} />
          ))}
        </Box>
      )}

      {error && (
        <Typography color="error" variant="body1">
          Failed to load notes: {error}
        </Typography>
      )}

      {!loading && !error && notes.length === 0 && (
        <Typography color="text.secondary">No notes published yet.</Typography>
      )}

      {!loading && !error && notes.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {notes.map((note) => (
            <Card
              key={note.id}
              elevation={0}
              sx={{
                border: (theme) => `0.5px solid ${theme.palette.divider}`,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {note.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(note.createdAt)}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box sx={markdownSx}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {note.content}
                  </ReactMarkdown>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Notes;
