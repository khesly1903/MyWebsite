import React, { useState } from 'react';
import { Box, Tab, Tabs, TextField } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  minRows?: number;
}

const previewSx = {
  '& h1': { typography: 'h4', fontWeight: 700, mt: 2, mb: 1 },
  '& h2': { typography: 'h5', fontWeight: 700, mt: 2, mb: 1 },
  '& h3': { typography: 'h6', fontWeight: 600, mt: 1, mb: 0.5 },
  '& p': { typography: 'body2', lineHeight: 1.8, mb: 1 },
  '& a': { color: 'primary.main' },
  '& code': {
    fontFamily: '"Fira Code", monospace',
    fontSize: '0.85em',
    bgcolor: 'action.hover',
    px: 0.5,
    borderRadius: 0.5,
  },
  '& pre': { bgcolor: 'action.hover', p: 1.5, borderRadius: 1, overflowX: 'auto', mb: 1 },
  '& pre code': { bgcolor: 'transparent', px: 0 },
  '& ul, & ol': { pl: 3, mb: 1 },
  '& li': { typography: 'body2', lineHeight: 1.7 },
  '& blockquote': {
    borderLeft: (theme: { palette: { primary: { main: string } } }) =>
      `3px solid ${theme.palette.primary.main}`,
    pl: 2, ml: 0, color: 'text.secondary', // fontStyle: 'italic',
  },
};

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  label = 'Content (Markdown)',
  minRows = 14,
}) => {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 1, minHeight: 36 }}>
        <Tab label="Write" sx={{ minHeight: 36, py: 0.5 }} />
        <Tab label="Preview" sx={{ minHeight: 36, py: 0.5 }} />
      </Tabs>

      {tab === 0 && (
        <TextField
          label={label}
          multiline
          minRows={minRows}
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
          inputProps={{ style: { fontFamily: '"Fira Code", monospace', fontSize: '0.875rem' } }}
        />
      )}

      {tab === 1 && (
        <Box
          sx={{
            minHeight: minRows * 24,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            p: 2,
            ...previewSx,
          }}
        >
          {value ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          ) : (
            <Box sx={{ color: 'text.disabled' }}>Nothing to preview.</Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default MarkdownEditor;
