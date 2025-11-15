import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Switch,
  useMediaQuery,
} from "@mui/material";
import code from "../assets/code.svg";
import person from "../assets/person.svg";
import crypto from "../assets/crypto.svg";
import math from "../assets/math.svg";
import { Link, useLocation } from "react-router-dom";
import { LightMode, DarkMode } from "@mui/icons-material";
import MaterialUISwitch from "./CustomComponents/MaterialUISwitch";
import HideOnScroll from "./HideOnScroll";

export default function Navbar({ darkMode, toggleTheme }) {
  const location = useLocation();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const navItems = [
    {
      label: "Me",
      icon: <img src={person} alt="TailwindCSS" width={48} height={48} />,
      path: "/",
    },
    {
      label: "Cryptography",
      icon: <img src={crypto} alt="TailwindCSS" width={48} height={48} />,
      path: "/articles/cryptography",
    },
    {
      label: "Mathematics",
      icon: <img src={math} alt="TailwindCSS" width={48} height={48} />,
      path: "/articles/mathematics",
    },
    {
      label: "Projects",
      icon: <img src={code} alt="TailwindCSS" width={48} height={48} />,
      path: "/projects",
    },
  ];

  return (
    <HideOnScroll>
      <AppBar color="primary" elevation={1} sx={{ px: 2 }} id="back-to-top-anchor">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Menu */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  color: "inherit",
                  fontFamily: "Iceberg, sans-serif",
                  fontSize: isMobile ? "1.2rem" : "2rem",
                  textTransform: "none",
                  borderBottom:
                    location.pathname === item.path
                      ? "2px solid currentColor"
                      : "2px solid transparent",
                  mx: 1,
                  borderRadius: 0,
                  "&:hover": {
                    borderBottom: "2px solid currentColor",
                  },
                }}
              >
                {item.icon}
                {!isMobile && (
                  <Box
                    component="span"
                    sx={{
                      ml: 1,
                      fontSize: {
                        md: "1.5rem",
                        lg: "2rem",
                      },
                    }}
                  >
                    {item.label}
                  </Box>
                )}
              </Button>
            ))}
          </Box>

          <Box>
            <MaterialUISwitch checked={darkMode} onChange={toggleTheme} />
          </Box>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
