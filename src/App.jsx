import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ThemeProvider, CssBaseline, Box, Snackbar, Alert,
  AppBar, Toolbar, Typography, Button,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import theme from "./theme";
import store from "./store/store";
import { Provider } from "react-redux";
import {
  fetchAllMovies,
  hideSnackbar,
  selectSnackbar,
} from "./store/movieSlice";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" elevation={0} sx={{
      background: "rgba(8,11,20,0.95)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(245,197,24,0.12)",
    }}>
      <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto", px: { xs: 2, md: 3 } }}>
        <Box
          onClick={() => navigate("/")}
          sx={{ display: "flex", alignItems: "center", gap: 1.5, cursor: "pointer", flex: 1 }}
        >
          <Box sx={{
            background: "linear-gradient(135deg, #F5C518, #C79B00)",
            borderRadius: "8px", p: 0.75, display: "flex",
          }}>
            <MovieIcon sx={{ fontSize: 20, color: "#000" }} />
          </Box>
          <Typography variant="h6" sx={{
            fontFamily: "'Crimson Pro', serif",
            fontWeight: 800, fontSize: "1.2rem",
            background: "linear-gradient(135deg, #fff, #F5C518)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Vimarsanam
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate("/")}
          sx={{
            borderColor: "rgba(245,197,24,0.3)",
            color: "primary.main",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
          }}
        >
          All Movies
        </Button>
      </Toolbar>
    </AppBar>
  );
}

// ─── Global Snackbar (reads from Redux store) ─────────────────────────────────
function GlobalSnackbar() {
  const dispatch = useDispatch();
  const snackbar = useSelector(selectSnackbar); // ← useSelector reads from Redux

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={() => dispatch(hideSnackbar())} // ← dispatch Redux action
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={() => dispatch(hideSnackbar())}
        severity={snackbar.severity}
        variant="filled"
        sx={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}

// ─── App Content (inside BrowserRouter) ──────────────────────────────────────
function AppContent() {
  const dispatch = useDispatch();

  // Fetch all movies when app starts
  useEffect(() => {
    dispatch(fetchAllMovies()); // ← dispatch Redux async thunk
  }, [dispatch]);

  return (
    <Box sx={{ minHeight: "100vh", background: "#080B14" }}>
      <Navbar />
      <Routes>
        <Route path="/"               element={<HomePage />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
      </Routes>
      <GlobalSnackbar />
      <Box sx={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        py: 3, textAlign: "center",
        background: "rgba(0,0,0,0.4)",
      }}>
        <Typography variant="caption" sx={{ color: "text.secondary", letterSpacing: 2 }}>
          CINEMASCOPE · REDUX TOOLKIT + SPRING BOOT + MYSQL
        </Typography>
      </Box>
    </Box>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}