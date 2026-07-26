import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home';
import Articles from './pages/articles';
import ArticleDetail from './pages/articles/ArticleDetail';
import Notes from './pages/notes';
import Projects from './pages/projects';
import ProjectDetail from './pages/projects/ProjectDetail';
import AdminApp from './pages/admin';

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="*" element={
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  );
}

export default App;
