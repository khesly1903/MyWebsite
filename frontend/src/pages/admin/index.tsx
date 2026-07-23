import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AdminLayout from './AdminLayout';
import Login from './Login';
import AdminArticles from './articles';
import ArticleForm from './articles/ArticleForm';
import AdminNotes from './notes';
import NoteForm from './notes/NoteForm';
import AdminProjects from './projects';
import ProjectForm from './projects/ProjectForm';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

const AdminApp: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="articles" replace />} />
          <Route path="articles" element={<AdminArticles />} />
          <Route path="articles/new" element={<ArticleForm />} />
          <Route path="articles/:id/edit" element={<ArticleForm />} />
          <Route path="notes" element={<AdminNotes />} />
          <Route path="notes/new" element={<NoteForm />} />
          <Route path="notes/:id/edit" element={<NoteForm />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/:id/edit" element={<ProjectForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminApp;
