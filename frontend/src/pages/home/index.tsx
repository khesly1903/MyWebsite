import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box,
  Stepper, Step, StepLabel, StepContent,
  Grid, Card, CardContent, CardMedia, CardActions, Button,
  TextField, Alert, CircularProgress
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useNavigate } from 'react-router-dom';
import handImg from '../../assets/hand.png';
import { projectsApi, articlesApi, contactApi } from '../../services/api';
import type { Project, Article } from '../../types/api';

const GITHUB_URL = 'https://github.com/khesly1903';
const LINKEDIN_URL = 'https://www.linkedin.com/in/kayaberkay1729/';
const CONTACT_EMAIL = 'contact@kayaberkay.xyz';

const schools = [
  {
    school: 'Istinye University',
    department: 'Mathematics',
    degree: 'Bachelor',
    years: '2019 - 2024',
    description: 'Focused on pure mathematics, mainly in abstract areas. In my final year, I combined this background with my interest in software and graduated with a thesis on cryptography.'
  },
  {
    school: 'Istinye University',
    department: 'Software Engineering',
    degree: 'Minor',
    years: '2022 - 2025',
    description: 'Covered core software engineering topics such as C++ based OOP and data structures & algorithms. Pretty classic, but the compiler design course was especially fun.'
  },
  {
    school: 'Istanbul University',
    department: 'Computer Programming',
    degree: 'Associate',
    years: '2023 - 2025',
    description: 'Focused on building strong programming fundamentals. It helped me clearly understand the direction I wanted to pursue.'
  }
];

const courses = [
  {
    name : 'Fullstack .NET and Web Development',
    company: 'Istanbul Education Academy',
    years: '2025',
    description: 'This is where my transition into web development began. The training started with a C# focus and later expanded into web technologies, which is where I found my main area of interest.'
  },
  {
    name : 'CCNA-1 and CCNA-2',
    company: 'Cisco',
    years: '2024 - 2025',
    description: 'Covered networking fundamentals and core concepts. It helped me understand how the web works at a lower level, beyond just writing code.'
  }
];

const experiences = [
  {
    company: 'Flip Inverted Arts',
    position: 'Full Stack Developer',
    years: 'January 2026 - Present',
    description: 'Developed a company website where customers can register through forms and access information about the company. But main goal is an application that enables academies to manage their customers, programs, employee data, payments, and various operational processes. In short, it functions as a comprehensive customer management system for academies, called TrickTracker. I am the responsiable of web admin system.',
    techStack:'For the TrickTracker app, the backend is built with TypeScript and NestJS, using PostgreSQL with Prisma as the database layer. The web frontend is developed with TypeScript and React. For the website, there is no heavy backend, just a lightweight server integrating EmailJS and Google Sheets. The frontend is built with React with JavaScript. Since the site includes a large number of images, Cloudflare R2 is used for object storage. Both projects are self-hosted using Coolify, with Cloudflare handling caching and content delivery.'
  },
  {
    company: 'Istinye Mathematics Club',
    position: 'President of Math Club',
    years: '2022 - 2025',
    description: 'Not exactly a “professional” experience but still worth mentioning. I founded the Mathematics Club at my university and organized activities around mathematics and related topics. Also the stepper looks cooler when it has more than one item.'
  }
];

const techGroups = [
  {
    title: 'AI Tools',
    techs: [
      { name: 'Claude', icon: 'claude' },
      { name: 'Gemini', icon: 'googlegemini' },
    ]
  },
  {
    title: 'Software Development (Backend)',
    techs: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Python', icon: 'python' },
      { name: 'NestJS', icon: 'nestjs' },
      // { name: 'Express.js', icon: 'express' },
    ]
  },
  {
    title: 'Frontend',
    techs: [
      { name: 'React', icon: 'react' },
      { name: 'Material UI', icon: 'mui' },
      { name: 'Ant Design', icon: 'antdesign' },
      { name: 'shadcn/ui', icon: 'shadcnui' },
    ]
  },
  {
    title: 'Database',
    techs: [
      { name: 'Prisma', icon: 'prisma' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'PostgreSQL', icon: 'postgresql' },
    ]
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '', website: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    projectsApi.getAll()
      .then(res => setFeaturedProjects(res.filter(p => p.isFeatured).slice(0, 3)))
      .catch(console.error);
    articlesApi.getAll()
      .then(res => setFeaturedArticles(res.filter(a => a.isFeatured).slice(0, 3)))
      .catch(console.error);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('sending');
    try {
      await contactApi.send(contactForm);
      setContactStatus('success');
      setContactForm({ name: '', email: '', message: '', website: '' });
    } catch (err) {
      console.error(err);
      setContactStatus('error');
    }
  };

  return (
    <Container maxWidth="lg">
      {/* 100vh Hero + Tech Stack Section */}
      <Box sx={{ 
        minHeight: { xs: 'auto', md: '100vh' }, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        position: 'relative',
        py: { xs: 8, md: 0 }
      }}>
        {/* Hero Section */}
        <Box sx={{ 
          width: '100vw',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
          px: { xs: 4, md: 12 },
          boxSizing: 'border-box',
          display: 'flex', 
          alignItems: 'flex-end',
          mb: { xs: 8, md: 10 },
          mt: { md: -4 },
          minHeight: '65vh'
        }}>
          {/* Warm glow behind the hand */}
          <Box sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: '-30%',
            zIndex: 0,
            pointerEvents: 'none',
            background: (theme) => theme.palette.mode === 'dark'
              ? 'radial-gradient(ellipse 55% 50% at 72% 48%, rgba(255,153,0,0.16), transparent 70%)'
              : 'radial-gradient(ellipse 55% 50% at 72% 48%, rgba(112,71,11,0.10), transparent 70%)',
          }} />

          {/* Background Image (Absolute, aligned to right) */}
          <Box
            component="img"
            src={handImg}
            alt="Berkay Hand"
            sx={{
              position: 'absolute',
              right: 0,
              bottom: { xs: 0, md: '-8vh' },
              maxHeight: '100%',
              maxWidth: { xs: '100%', md: '72%' },
              objectFit: 'contain',
              objectPosition: 'right bottom',
              zIndex: 0,
              pointerEvents: 'none',
              opacity: { xs: 0.45, md: 1 },
              maskImage: 'linear-gradient(to bottom, black 62%, transparent 96%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 62%, transparent 96%)',
            }}
          />

          {/* Left Side: Foreground Text */}
          <Box sx={{
            position: 'relative',
            zIndex: 1,
            width: { xs: '100%', md: '55%' },
            textAlign: { xs: 'center', md: 'left' },
            pb: { md: 4 },
            textShadow: (theme) => theme.palette.mode === 'dark' ? '0px 4px 20px rgba(0,0,0,0.9)' : 'none',
          }}>
            <Typography variant="ice" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 2, color: 'text.primary' }}>
              I'm <Box component="span" sx={{ color: 'primary.main' }}>Berkay</Box>
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.2rem', color: 'text.secondary' }}>
              I am a mathematician with a passion for software and cryptography. 
              Currently, I develop full-stack web applications using TypeScript, React, and NestJS. 
              I also share articles about cryptography and mathematics on this site. You can download my resume here.
            </Typography>
          </Box>
        </Box>

        {/* Bottom Section: Tech Stack + Scroll Hint */}
        <Box sx={{
          position: { xs: 'relative', md: 'absolute' },
          bottom: { md: '4vh' },
          left: { md: '50%' },
          transform: { md: 'translateX(-50%)' },
          marginLeft: { xs: 'calc(-50vw + 50%)', md: 0 },
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: { xs: 6, md: 0 },
          pb: { xs: 2, md: 4 }
        }}>
          {/* Tech Stack Section */}
          <Box sx={{
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            pb: 2,
            pt: { xs: 0, md: 4 }
          }}>
            <Box className="marquee-content" sx={{
              display: 'flex',
              width: 'max-content',
              animation: 'marquee 40s linear infinite',
              '@keyframes marquee': {
                '0%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(-50%)' },
              }
            }}>
              {[1, 2, 3, 4].map((set) => (
                <Box key={set} sx={{ display: 'flex', gap: { xs: 4, md: 8 }, pr: { xs: 4, md: 8 }, flexShrink: 0 }}>
                  {techGroups.flatMap(g => g.techs).map((tech, i) => (
                    <Box 
                      key={`${tech.icon}-${i}`}
                      sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        gap: 1.5,
                        minWidth: 80,
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateY(-5px)' }
                      }}
                    >
                      <Box 
                        component="img"
                        src={`https://cdn.simpleicons.org/${tech.icon}`}
                        alt={tech.name}
                        sx={{ width: 40, height: 40 }}
                      />
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <Box sx={{ mt: 8, mb: 6 }}>
          <Typography variant="ice" sx={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.2rem', mb: 2, ml: 2, letterSpacing: '5px', textTransform: 'capitalize' }}>
            Some of my projects
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, overflowX: 'auto', justifyContent: { xs: 'flex-start', sm: 'center' }, pt: 2, pb: 2, px: 1, '&::-webkit-scrollbar': { height: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(128,128,128,0.4)', borderRadius: 4 } }}>
            {featuredProjects.map((project, index) => (
              <Box key={project.id} sx={{ flex: 1, minWidth: { xs: 260, sm: 0 }, maxWidth: { xs: 'none', sm: 'calc((100% - 48px) / 3)' } }}>
                <Card 
                  onClick={() => navigate(`/projects/${project.id}`)}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor: 'pointer',
                    border: '1px solid transparent',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: 'primary.main',
                      boxShadow: (theme) => theme.shadows[4]
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      [{index + 1}]
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                      fontSize: '0.8rem',
                      mb: 1
                    }}>
                      {project.description}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                      see details &rarr;
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="text" 
              color="primary"
              onClick={() => navigate('/projects')}
              disableRipple
              sx={{ textTransform: 'none', fontWeight: 600, fontSize: '0.9rem', fontFamily: "'Orbitron', sans-serif", letterSpacing: '1px', '&:hover': { backgroundColor: 'transparent' } }}
            >
              View all projects &rarr;
            </Button>
          </Box>
        </Box>
      )}

      {/* Featured Articles Section */}
      {featuredArticles.length > 0 && (
        <Box sx={{ mt: 8, mb: 8 }}>
          <Typography variant="ice" sx={{ fontFamily: "'Caveat', cursive", fontSize: '3.2rem', mb: 2, ml: 2, fontWeight: 500, transform: 'rotate(-2deg)', display: 'inline-block' }}>
            Look at my writings
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, overflowX: 'auto', justifyContent: { xs: 'flex-start', sm: 'center' }, pt: 2, pb: 2, px: 1, '&::-webkit-scrollbar': { height: 8 }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(128,128,128,0.4)', borderRadius: 4 } }}>
            {featuredArticles.map((article, index) => (
              <Box key={article.id} sx={{ flex: 1, minWidth: { xs: 260, sm: 0 }, maxWidth: { xs: 'none', sm: 'calc((100% - 48px) / 3)' } }}>
                <Card 
                  onClick={() => navigate(`/articles/${article.slug}`)}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor: 'pointer',
                    border: '1px solid transparent',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: 'primary.main',
                      boxShadow: (theme) => theme.shadows[4]
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      [{index + 1}]
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                      fontSize: '0.8rem'
                    }}>
                      {article.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="text" 
              color="primary"
              onClick={() => navigate('/articles')}
              disableRipple
              sx={{ textTransform: 'none', fontWeight: 600, fontSize: '1.4rem', fontFamily: "'Caveat', cursive", '&:hover': { backgroundColor: 'transparent' } }}
            >
              View all articles &rarr;
            </Button>
          </Box>
        </Box>
      )}

      {/* Education Section */}
      <Box sx={{ mt: 0, maxWidth: 900, mx: 'auto', width: '100%' }}>
        <Typography variant="ice" sx={{ fontSize: '2.5rem', mb: 6, ml: 2 }}>
          Education
        </Typography>
        
        <Stepper orientation="vertical" nonLinear activeStep={schools.length}>
          {schools.map((school, index) => (
            <Step key={index} active={true}>
              <StepLabel 
                icon={<Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'primary.main', ml: 0.5 }} />}
                sx={{ '& .MuiStepLabel-iconContainer': { padding: 0, pr: 2 } }}
              >
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  {school.department}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    {school.degree} - {school.school}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {school.years}
                  </Typography>
                </Box>
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" color="text.primary">
                    {school.description}
                  </Typography>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        <Stepper orientation="vertical" nonLinear activeStep={courses.length}>
          {courses.map((course, index) => (
            <Step key={index} active={true}>
              <StepLabel 
                icon={<Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'primary.main', ml: 0.5 }} />}
                sx={{ '& .MuiStepLabel-iconContainer': { padding: 0, pr: 2 } }}
              >
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  {course.name}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    {course.company}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {course.years}
                  </Typography>
                </Box>
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" color="text.primary">
                    {course.description}
                  </Typography>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Experience Section */}
      <Box sx={{ mt: { xs: 5, md: 5 }, maxWidth: 900, mx: 'auto', width: '100%' }}>
        <Typography variant="ice" sx={{ fontSize: '2.5rem', mb: 6, ml: 2 }}>
          Experience
        </Typography>
        
        <Stepper orientation="vertical" nonLinear activeStep={experiences.length}>
          {experiences.map((exp, index) => (
            <Step key={index} active={true}>
              <StepLabel 
                icon={<Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'primary.main', ml: 0.5 }} />}
                sx={{ '& .MuiStepLabel-iconContainer': { padding: 0, pr: 2 } }}
              >
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  {exp.position}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    {exp.company}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {exp.years}
                  </Typography>
                </Box>
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
                    {exp.description}
                  </Typography>
                  {(exp as any).techStack && (
                    <Typography sx={{ mt: 2 }}>
                      Technologies: {(exp as any).techStack}
                    </Typography>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Get in Touch Section */}
      <Box sx={{ mt: { xs: 10, md: 12 }, mb: 8, maxWidth: 900, mx: 'auto', width: '100%' }}>
        <Box sx={{ display: 'flex', gap: 7, flexWrap: 'wrap', px: 2 }}>
          {/* Left: title + contact info */}
          <Box sx={{ flex: '1 1 260px', minWidth: 240, display: 'flex', flexDirection: 'column', gap: 2.25 }}>
            <Typography variant="ice" sx={{ fontFamily: "'Caveat', cursive", fontSize: '3.2rem', mb: 1, fontWeight: 500, transform: 'rotate(-2deg)', display: 'inline-block' }}>
              Get in Touch
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Have a project in mind, or just want to talk cryptography? Reach out.
            </Typography>

            <Box
              component="a"
              href={`mailto:${CONTACT_EMAIL}`}
              sx={{ display: 'flex', alignItems: 'center', gap: 1.25, textDecoration: 'none', color: 'text.primary', fontSize: '0.98rem' }}
            >
              <MailOutlineIcon sx={{ fontSize: 22, color: 'primary.main' }} />
              {CONTACT_EMAIL}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, color: 'text.primary', fontSize: '0.98rem' }}>
              <LocationOnOutlinedIcon sx={{ fontSize: 22, color: 'primary.main' }} />
              Istanbul, Türkiye
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
              <Box component="a" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" title="GitHub">
                <Box component="img" src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" sx={{ width: 24, height: 24, opacity: 0.85, filter: (theme) => theme.palette.mode === 'light' ? 'invert(1)' : 'none' }} />
              </Box>
              <Box component="a" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <Box component="img" src="https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/linkedin.svg" alt="LinkedIn" sx={{ width: 24, height: 24, opacity: 0.85, filter: (theme) => theme.palette.mode === 'dark' ? 'invert(1)' : 'none' }} />
              </Box>
            </Box>
          </Box>

          {/* Right: contact form */}
          <Box component="form" onSubmit={handleContactSubmit} sx={{ flex: '1 1 320px', minWidth: 280, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* Honeypot field, hidden from real users */}
            <Box
              component="input"
              type="text"
              name="website"
              value={contactForm.website}
              onChange={(e) => setContactForm({ ...contactForm, website: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
              sx={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />

            <TextField
              label="Name"
              required
              fullWidth
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
            />
            <TextField
              label="Email"
              type="email"
              required
              fullWidth
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
            />
            <TextField
              label="Message"
              required
              fullWidth
              multiline
              minRows={4}
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
            />

            {contactStatus === 'success' && (
              <Alert severity="success" onClose={() => setContactStatus('idle')}>
                Message sent — thanks for reaching out! I'll get back to you soon.
              </Alert>
            )}
            {contactStatus === 'error' && (
              <Alert severity="error" onClose={() => setContactStatus('idle')}>
                Something went wrong while sending your message. Please try again later.
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={contactStatus === 'sending'}
              fullWidth
              sx={{ textTransform: 'none', fontWeight: 600, py: 1.5 }}
            >
              {contactStatus === 'sending' ? <CircularProgress size={22} color="inherit" /> : 'Send Message'}
            </Button>
          </Box>
        </Box>
      </Box>

    </Container>
  );
};

export default Home;
