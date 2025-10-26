import "./App.css";
import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import CryptoArticlesPage from "./pages/CryptoArticlesPage";
import MathArticlesPage from "./pages/MathArticlesPage";
import ProjectsPage from "./pages/ProjectsPage";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode((prev) => !prev);
  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route
            path="/articles/cryptography"
            element={<CryptoArticlesPage />}
          />
          <Route path="/articles/mathematics" element={<MathArticlesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
