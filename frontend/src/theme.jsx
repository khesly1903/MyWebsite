// src/theme/darkTheme.js
import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00bcd4" }, // canlı turkuaz
    secondary: { main: "#9c27b0" }, // mor vurgu
    background: {
      default: "#121212", // genel arka plan (neredeyse siyah)
      paper: "#1e1e1e", // kart ve panel arka planı
      custom1: "#252525ff",
      custom2: "",
    },
    text: {
      primary: "#ffffff", // beyaz metin
      secondary: "#b0b0b0", // soluk gri metin
    },
    divider: "rgba(255,255,255,0.12)", // ince beyaz bölücüler
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          boxShadow: "0 2px 8px rgba(255, 255, 255, 1)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(255, 255, 255, 1)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#1a1a1a",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "0rem !important",
          paddingRight: "0rem !important",
        },
      },
    },
   
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#00bcd4" }, // turkuaz
    secondary: { main: "#9c27b0" }, // mor
    background: {
      default: "#fafafa", // genel arka plan
      paper: "#ffffff", // kartlar ve paneller
      custom1: "#e9e5e57d",
      custom2: "#252525ff",
    },
    text: {
      primary: "#212121", // koyu gri metin
      secondary: "#555555", // daha soluk gri metin
    },
    divider: "rgba(0,0,0,0.12)",
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#ffffff",
          color: "#212121",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "0rem !important",
          paddingRight: "0rem !important",
        },
      },
    },
  },
});
