import React, { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';


declare module '@mui/material/styles' {
  interface TypographyVariants {
    ice: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    ice?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    ice: true;
  }
}






interface ThemeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

const ThemeContext = createContext<ThemeContextType>({
  toggleColorMode: () => {},
  mode: 'dark',
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#ff9900ff' : '#70470bff',
          },
          secondary: {
            main: '#ff4081',
          },
          background: {
            default: mode === 'dark' ? '#121212' : '#f4f6f8',
            paper: mode === 'dark' ? '#121212' : '#ffffff',
          },
        },
        typography: {
          fontSize: 14,
          htmlFontSize: 16,

          // Current Configuration:
          fontFamily: '"Inter", sans-serif', // Navbar ve Genel UI
          
          h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: '3.8rem' },
          h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: '2.8rem' },
          h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 600, fontSize: '2rem' },
          h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
          h5: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
          h6: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
          
          body1: { 
            fontFamily: '"Inter", sans-serif', // Okunabilirlik için
            fontSize: '1.1rem', 
            lineHeight: 1.7,
            letterSpacing: '0.01em'
          },
          body2: { 
            fontFamily: '"Inter", sans-serif', 
            fontSize: '1rem', 
            lineHeight: 1.6 
          },
          button: {
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'none',
          },
          ice: { fontFamily: '"Outfit", sans-serif', fontSize: '1.1rem', fontWeight: 600 },
        },






        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 8,
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                backdropFilter: 'blur(8px)',
                backgroundColor: mode === 'dark' ? '#121212' : 'rgba(255, 255, 255, 0.8)',
                borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
              },
            },
          },
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                margin: 0,
                padding: 0,
                minHeight: '100vh',
                backgroundColor: mode === 'dark' ? '#121212' : '#f4f6f8',
                overflowX: 'hidden',
              },
              '#root': {
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                overflowX: 'hidden',
              },
            },
          },

        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>

  );
};
