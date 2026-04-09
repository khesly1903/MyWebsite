import { Container, Typography, Box, Button, Grid, Card, CardContent, CardActions, AppBar, Toolbar } from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

function App() {
  const projects = [
    { title: 'Project One', description: 'A amazing full-stack application.' },
    { title: 'Project Two', description: 'Innovative frontend design.' },
    { title: 'Project Three', description: 'Backend microservices architecture.' },
  ]

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1 }}>
            MY PORTFOLIO
          </Typography>
          <Button color="inherit">About</Button>
          <Button color="inherit">Projects</Button>
          <Button color="inherit">Contact</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 12 }}>
          <Typography variant="h1" gutterBottom sx={{ 
            fontSize: { xs: '3rem', md: '5rem' }, 
            background: 'linear-gradient(45deg, #00e5ff 30%, #ff4081 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800
          }}>
            Welcome to My Digital Space
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
            I build modern web applications using NestJS, Prisma, and React. 
            Crafting seamless experiences from server to browser.
          </Typography>
          <Button variant="contained" size="large" startIcon={<RocketLaunchIcon />} sx={{ 
            px: 4, py: 1.5, fontSize: '1.1rem',
            background: 'linear-gradient(45deg, #00e5ff 30%, #448aff 90%)',
            boxShadow: '0 3px 20px rgba(0, 229, 255, 0.3)'
          }}>
            See My Work
          </Button>
        </Box>

        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Featured Projects</Typography>
        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', borderRadius: 4, transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 30px rgba(0,0,0,0.5)' } }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                    {project.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {project.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button size="small" color="primary" sx={{ fontWeight: 'bold' }}>Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box component="footer" sx={{ py: 6, textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.12)', mt: 'auto' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} My Portfolio. Built with Love and Code.
        </Typography>
      </Box>
    </Box>
  )
}

export default App

