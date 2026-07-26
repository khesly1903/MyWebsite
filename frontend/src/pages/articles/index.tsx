import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardActionArea, CardContent, CardMedia, Skeleton, Button } from '@mui/material';
import { Masonry } from '@mui/lab';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { articlesApi } from '../../services/api';
import type { Article } from '../../types/api';
import { formatDate } from '../../utils/formatDate';

const PLACEHOLDER_IMAGE = 'https://placehold.co/900x600/1a1a1a/ff9900?text=Article';

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    articlesApi.getAll()
      .then(setArticles)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const hero = articles.find((a) => a.isHero) ?? null;
  const rest = hero ? articles.filter((a) => a.id !== hero.id) : articles;

  return (
    <Box sx={{ mt: 8, mb: 8, maxWidth: 900, mx: 'auto', width: '100%' }}>

      {loading && (
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} variant="rectangular" height={Math.random() * 200 + 200} sx={{ borderRadius: 2 }} />
          ))}
        </Masonry>
      )}

      {error && (
        <Typography color="error" variant="body1">
          Failed to load articles: {error}
        </Typography>
      )}

      {!loading && !error && articles.length === 0 && (
        <Typography color="text.secondary">No articles published yet.</Typography>
      )}

      {!loading && !error && articles.length > 0 && (
        <>
          {hero && (
            <Box
              sx={{
                mt: 2,
                mb: 7,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 2,
              }}
            >
              <Typography
                variant="ice"
                sx={{
                  fontSize: '0.85rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'primary.main',
                }}
              >
                featured article
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 640,
                  height: { xs: 220, sm: 320 },
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: (theme) => `0 0 0 1px ${theme.palette.primary.main}`,
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/articles/${hero.slug}`)}
              >
                <Box
                  component="img"
                  src={hero.coverImage ?? PLACEHOLDER_IMAGE}
                  alt={hero.title}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 500, letterSpacing: 0.5, textTransform: 'uppercase' }}
              >
                {formatDate(hero.createdAt)}
              </Typography>
              <Typography variant="h3" sx={{ maxWidth: 640, lineHeight: 1.15 }}>
                {hero.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
                {hero.description}
              </Typography>
              <Button
                onClick={() => navigate(`/articles/${hero.slug}`)}
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 1 }}
              >
                see details
              </Button>
            </Box>
          )}

          <Masonry columns={{ xs: 1, sm: 2, md: 2 }} spacing={3}>
            {rest.map((article) => (
            <Card
              key={article.id}
              elevation={0}
              sx={{
                border: (theme) => `0.5px solid ${theme.palette.divider}`,
                borderRadius: 1,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { 
                  borderColor: 'primary.main',
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => `0 12px 24px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.06)'}`,
                  '& .card-media': {
                    transform: 'scale(1.05)'
                  }
                },
              }}
            >
              <CardActionArea onClick={() => navigate(`/articles/${article.slug}`)} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                {article.coverImage && (
                  <Box sx={{ overflow: 'hidden', position: 'relative', pt: '56.25%' /* 16:9 Aspect Ratio */ }}>
                    <CardMedia
                      component="img"
                      image={article.coverImage}
                      alt={article.title}
                      className="card-media"
                      sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        transition: 'transform 0.5s ease',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                )}
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 500, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                    {formatDate(article.createdAt)}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.3, mb: 1.5, color: 'text.primary' }}>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{
                    lineHeight: 1.7,
                    display: 'block',
                    overflow: 'visible',
                    textOverflow: 'clip',
                    whiteSpace: 'normal',
                    mb: 1.5,
                  }}>
                    {article.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}
                  >
                    see details &rarr;
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            ))}
          </Masonry>
        </>
      )}
    </Box>
  );
};

export default Articles;
