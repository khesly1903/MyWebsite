import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Skeleton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { projectsApi } from '../../services/api';
import type { Project } from '../../types/api';
import { formatDate } from '../../utils/formatDate';

const PLACEHOLDER_IMAGE = 'https://placehold.co/900x600/1a1a1a/ff9900?text=Project';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    projectsApi.getAll()
      .then(setProjects)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const hero = projects.find((p) => p.isHero) ?? null;
  const rest = hero ? projects.filter((p) => p.id !== hero.id) : projects;

  return (
    <Box sx={{ mt: 8, mb: 8, maxWidth: 900, mx: 'auto', width: '100%' }}>
      {loading && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="rectangular" height={260} sx={{ borderRadius: 2 }} />
          ))}
        </Box>
      )}

      {error && (
        <Typography color="error" variant="body1">
          Failed to load projects: {error}
        </Typography>
      )}

      {!loading && !error && projects.length === 0 && (
        <Typography color="text.secondary">No projects published yet.</Typography>
      )}

      {!loading && !error && projects.length > 0 && (
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
                featured project
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
                onClick={() => navigate(`/projects/${hero.id}`)}
              >
                <Box
                  component="img"
                  src={hero.coverImage ?? PLACEHOLDER_IMAGE}
                  alt={hero.title}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </Box>
              <Typography variant="h3" sx={{ maxWidth: 640, lineHeight: 1.15 }}>
                {hero.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
                {hero.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, mt: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button
                  onClick={() => navigate(`/projects/${hero.id}`)}
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                >
                  see details
                </Button>
                {hero.github && (
                  <Button
                    href={hero.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                  >
                    code
                  </Button>
                )}
                {hero.link && (
                  <Button
                    href={hero.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    startIcon={<OpenInNewIcon />}
                  >
                    demo
                  </Button>
                )}
              </Box>
            </Box>
          )}

          <Box>
            {rest.map((project, i) => {
              const reverse = i % 2 === 1;
              return (
                <Box
                  key={project.id}
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: reverse ? 'row-reverse' : 'row' },
                    gap: 4,
                    py: 4.5,
                  }}
                >
                  <Box
                    sx={{
                      flex: { sm: '0 0 300px' },
                      minWidth: { sm: 240 },
                      height: { xs: 200, sm: 190 },
                      borderRadius: 3,
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    <Box
                      component="img"
                      src={project.coverImage ?? PLACEHOLDER_IMAGE}
                      alt={project.title}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </Box>
                  <Box
                    sx={{
                      flex: '1 1 320px',
                      minWidth: { sm: 280 },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ textTransform: 'uppercase', letterSpacing: '0.06em' }}
                    >
                      {formatDate(project.createdAt)}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ cursor: 'pointer', width: 'fit-content' }}
                      onClick={() => navigate(`/projects/${project.id}`)}
                    >
                      {project.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2.5, mt: 0.75, alignItems: 'center', flexWrap: 'wrap' }}>
                      <Box
                        component="button"
                        onClick={() => navigate(`/projects/${project.id}`)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          color: 'primary.main',
                          textDecoration: 'none',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          fontFamily: 'inherit',
                          background: 'none',
                          border: 'none',
                          p: 0,
                          cursor: 'pointer',
                          '&:hover': { textDecoration: 'underline' },
                        }}
                      >
                        see details <ArrowForwardIcon sx={{ fontSize: '1rem' }} />
                      </Box>
                      {project.github && (
                        <Box
                          component="a"
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: 'text.secondary',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          <GitHubIcon fontSize="small" /> code
                        </Box>
                      )}
                      {project.link && (
                        <Box
                          component="a"
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: 'text.secondary',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          <OpenInNewIcon fontSize="small" /> demo
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Projects;
