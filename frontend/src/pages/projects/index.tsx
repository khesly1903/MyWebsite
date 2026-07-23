import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardContent, CardMedia,
  CardActions, IconButton, Tooltip, Skeleton,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { projectsApi } from '../../services/api';
import type { Project } from '../../types/api';

const PLACEHOLDER_IMAGE = 'https://placehold.co/400x200/1a1a1a/ff9900?text=Project';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    projectsApi.getAll()
      .then(setProjects)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ mt: 8, mb: 8, maxWidth: 900, mx: 'auto', width: '100%' }}>
      <Typography variant="ice" sx={{ fontSize: '2.5rem', mb: 6, display: 'block' }}>
        projects
      </Typography>

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
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
          {projects.map((project) => (
            <Card
              key={project.id}
              elevation={0}
              sx={{
                border: (theme) => `0.5px solid ${theme.palette.divider}`,
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.2s, transform 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                  transform: 'translateY(-3px)',
                },
              }}
            >
              <CardMedia
                component="img"
                height={180}
                image={project.coverImage ?? PLACEHOLDER_IMAGE}
                alt={project.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ 
                  lineHeight: 1.7,
                  display: 'block',
                  overflow: 'visible',
                  textOverflow: 'clip',
                  whiteSpace: 'normal',
                }}>
                  {project.description}
                </Typography>
              </CardContent>
              {(project.github || project.link) && (
                <CardActions sx={{ px: 2.5, pb: 2, pt: 0 }}>
                  {project.github && (
                    <Tooltip title="GitHub Repository">
                      <IconButton
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                      >
                        <GitHubIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {project.link && (
                    <Tooltip title="Live Demo">
                      <IconButton
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                      >
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </CardActions>
              )}
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Projects;
