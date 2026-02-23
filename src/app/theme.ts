import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ec4899",
      light: "#f472b6",
      dark: "#db2777",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    info: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
    },
    success: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
    },
    grey: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
      disabled: "#94a3b8",
    },
    divider: "#e2e8f0",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      letterSpacing: "-0.025em",
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "-0.025em",
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 600,
      letterSpacing: "-0.015em",
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.125rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: 600,
      letterSpacing: "0",
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      letterSpacing: "0",
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      letterSpacing: "0",
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      letterSpacing: "0",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      letterSpacing: "0",
      lineHeight: 1.6,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      letterSpacing: "0.025em",
      textTransform: "none",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 500,
      letterSpacing: "0.025em",
      lineHeight: 1.5,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  ],
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "8px 16px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
          },
        },
        outlined: {
          borderWidth: 1.5,
          "&:hover": {
            borderWidth: 1.5,
            backgroundColor: "rgba(99, 102, 241, 0.04)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            backgroundColor: "#f8fafc",
            transition: "all 0.2s ease-in-out",
            "& fieldset": {
              borderColor: "#e2e8f0",
              borderWidth: 1.5,
            },
            "&:hover fieldset": {
              borderColor: "#cbd5e1",
            },
            "&.Mui-focused": {
              backgroundColor: "#ffffff",
              "& fieldset": {
                borderColor: "#6366f1",
                borderWidth: 2,
              },
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow:
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: "all 0.15s ease-in-out",
          "&:hover": {
            backgroundColor: "rgba(99, 102, 241, 0.08)",
            transform: "scale(1.05)",
          },
        },
      },
    },
  },
});
