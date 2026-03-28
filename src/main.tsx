import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1d4ed8',
      light: '#60a5fa',
      dark: '#1e3a8a',
    },
    secondary: {
      main: '#f97316',
      light: '#fdba74',
      dark: '#c2410c',
    },
    background: {
      default: '#f7f8fc',
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#526071',
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: '"Avenir Next", "Manrope", "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"Avenir Next Condensed", "Avenir Next", "Segoe UI", sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderWidth: 1,
        },
      },
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
