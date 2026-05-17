import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#F5C518",
      light: "#FFD740",
      dark: "#C79B00",
      contrastText: "#000000",
    },
    secondary: {
      main: "#E53935",
      light: "#FF6F60",
      dark: "#AB000D",
    },
    background: {
      default: "#080B14",
      paper: "#0F1629",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#8899BB",
    },
    divider: "rgba(245,197,24,0.12)",
    success: { main: "#22C55E" },
    error: { main: "#EF4444" },
    info: { main: "#3B82F6" },
  },
  typography: {
    fontFamily: "'Crimson Pro', 'Georgia', serif",
    h1: { fontWeight: 800, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.01em" },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 700,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
    },
    body1: { fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 },
    body2: { fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 },
    caption: { fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em" },
    overline: { fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: "linear-gradient(145deg, #0F1629 0%, #080B14 100%)",
          border: "1px solid rgba(245,197,24,0.1)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            border: "1px solid rgba(245,197,24,0.4)",
            transform: "translateY(-8px)",
            boxShadow: "0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,197,24,0.2)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #F5C518 0%, #C79B00 100%)",
          color: "#000",
          "&:hover": {
            background: "linear-gradient(135deg, #FFD740 0%, #F5C518 100%)",
            boxShadow: "0 8px 24px rgba(245,197,24,0.4)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: "0.7rem",
          letterSpacing: "0.06em",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            fontFamily: "'DM Sans', sans-serif",
            "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
            "&:hover fieldset": { borderColor: "rgba(245,197,24,0.3)" },
            "&.Mui-focused fieldset": { borderColor: "#F5C518" },
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 4, backgroundColor: "rgba(255,255,255,0.08)" },
        bar: { borderRadius: 4 },
      },
    },
  },
});

export default theme;