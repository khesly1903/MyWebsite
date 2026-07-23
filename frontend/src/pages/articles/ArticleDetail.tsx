import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Divider, Skeleton } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { articlesApi } from '../../services/api';
import type { Article } from '../../types/api';


const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    articlesApi.getBySlug(slug)
      .then(setArticle)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <Box sx={{ mt: 8, mb: 8 }}>
      {loading && (
        <Box>
          <Skeleton variant="text" height={60} width="70%" sx={{ mb: 1 }} />
          <Skeleton variant="text" height={24} width="30%" sx={{ mb: 4 }} />
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
        </Box>
      )}

      {error && (
        <Typography color="error" variant="body1">
          Failed to load article: {error}
        </Typography>
      )}

      {!loading && !error && !article && (
        <Typography color="text.secondary">Article not found.</Typography>
      )}

      {article && (
        <>
          <Box
            sx={{
              '& h1': { typography: 'h3', fontWeight: 700, mt: 4, mb: 2 },
              '& h2': { typography: 'h4', fontWeight: 700, mt: 3, mb: 2 },
              '& h3': { typography: 'h5', fontWeight: 600, mt: 2, mb: 1 },
              '& p': { typography: 'body1', lineHeight: 1.8, mb: 2 },
              '& a': { color: 'primary.main', textDecoration: 'underline' },
              '& code': {
                fontFamily: '"Fira Code", "Courier New", monospace',
                fontSize: '0.9em',
                bgcolor: 'action.hover',
                px: 0.5,
                borderRadius: 0.5,
              },
              '& pre': {
                bgcolor: 'action.hover',
                p: 2,
                borderRadius: 2,
                overflowX: 'auto',
                mb: 2,
              },
              '& pre code': { bgcolor: 'transparent', px: 0 },
              '& ul, & ol': { pl: 3, mb: 2 },
              '& li': { typography: 'body1', mb: 0.5, lineHeight: 1.7 },
              '& blockquote': {
                borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`,
                pl: 2,
                ml: 0,
                color: 'text.secondary',
                // fontStyle: 'italic',
              },

              '& hr': { my: 3 },
              '& table': { width: '100%', borderCollapse: 'collapse', mb: 2 },
              '& th, & td': {
                border: (theme) => `1px solid ${theme.palette.divider}`,
                p: 1,
                typography: 'body2',
              },
              '& th': { fontWeight: 700, bgcolor: 'action.hover' },
              '& img': { maxWidth: '100%', borderRadius: 1 },
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ArticleDetail;
