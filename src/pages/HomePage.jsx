import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box, Container, Typography, Grid, Card, CardMedia, CardContent,
  CardActionArea, Chip, TextField, InputAdornment, Skeleton,
  Rating, Stack, LinearProgress,
} from "@mui/material";
import SearchIcon     from "@mui/icons-material/Search";
import StarIcon       from "@mui/icons-material/Star";
import MovieIcon      from "@mui/icons-material/Movie";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CategoryIcon   from "@mui/icons-material/Category";

import {
  setActiveGenre,
  setSearchQuery,
  selectMoviesLoading,
  selectActiveGenre,
  selectSearchQuery,
  selectFilteredMovies,
  selectTotalReviews,
  MOVIES,
} from "../store/movieSlice";

// ── All computed DYNAMICALLY from MOVIES array ─────────────────────────────────
// Add any movie to MOVIES array → everything below updates automatically!
const ALL_GENRES   = ["All", ...Array.from(new Set(MOVIES.map((m) => m.genre)))];
const TOTAL_MOVIES = MOVIES.length;                    // → 33
const TOTAL_GENRES = ALL_GENRES.length - 1;            // → unique genre count

// ─── Skeleton Loader Card ─────────────────────────────────────────────────────
function MovieCardSkeleton() {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Skeleton variant="rectangular" height={300} sx={{ bgcolor: "rgba(255,255,255,0.06)" }} />
      <CardContent>
        <Skeleton variant="text" width="80%" height={26} sx={{ bgcolor: "rgba(255,255,255,0.06)" }} />
        <Skeleton variant="text" width="50%" height={18} sx={{ mt: 1, bgcolor: "rgba(255,255,255,0.04)" }} />
        <Skeleton variant="text" width="100%" height={14} sx={{ mt: 1, bgcolor: "rgba(255,255,255,0.04)" }} />
        <Skeleton variant="text" width="90%"  height={14} sx={{ bgcolor: "rgba(255,255,255,0.04)" }} />
      </CardContent>
    </Card>
  );
}

// ─── Movie Card — renders dynamically for every entry in MOVIES array ──────────
function MovieCard({ movie }) {
  const navigate = useNavigate();

  // Pull this movie's OMDB data + user stats from Redux store
  const data  = useSelector((state) => state.movies.moviesData[movie.id]);
  const stats = useSelector((state) => state.movies.stats[movie.id]);

  const poster = data?.Poster && data.Poster !== "N/A" ? data.Poster : null;

  return (
    <Card sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: `0 12px 40px ${movie.color}33`,
      },
    }}>
      <CardActionArea
        onClick={() => navigate(`/movie/${movie.id}`)}
        sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
        {/* ── Poster / Fallback ── */}
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          {poster ? (
            <CardMedia
              component="img"
              image={poster}
              alt={data?.Title}
              sx={{
                height: 300,
                objectFit: "cover",
                transition: "transform 0.4s ease",
                "&:hover": { transform: "scale(1.06)" },
              }}
            />
          ) : (
            // Emoji fallback shown while loading or if poster missing
            <Box sx={{
              height: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, ${movie.color}44, ${movie.color}11)`,
              gap: 1,
            }}>
              <Typography sx={{ fontSize: 72 }}>{movie.emoji}</Typography>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", letterSpacing: 2 }}>
                {data ? "NO POSTER" : "LOADING..."}
              </Typography>
            </Box>
          )}

          {/* Genre badge — from movie.genre */}
          <Chip
            label={`${movie.emoji}  ${movie.genre}`}
            size="small"
            sx={{
              position: "absolute", top: 10, left: 10,
              background: "rgba(0,0,0,0.80)",
              backdropFilter: "blur(10px)",
              color: movie.color,
              border: `1px solid ${movie.color}66`,
              fontWeight: 700,
              fontSize: "0.62rem",
              letterSpacing: 0.4,
            }}
          />

          {/* IMDb badge — from OMDB API */}
          {data?.imdbRating && data.imdbRating !== "N/A" && (
            <Chip
              icon={<StarIcon sx={{ fontSize: "12px !important", color: "#000 !important" }} />}
              label={data.imdbRating}
              size="small"
              sx={{
                position: "absolute", top: 10, right: 10,
                background: "#F5C518",
                color: "#000",
                fontWeight: 800,
                fontSize: "0.68rem",
              }}
            />
          )}

          {/* Gradient overlay */}
          <Box sx={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: 70,
            background: "linear-gradient(transparent, rgba(8,11,20,0.97))",
          }} />
        </Box>

        {/* ── Card Text Content ── */}
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2 }}>

          {/* Title — from OMDB or fallback to genre label */}
          <Typography variant="h6" sx={{
            fontFamily: "'Crimson Pro', serif",
            fontWeight: 700,
            fontSize: "1rem",
            lineHeight: 1.3,
            mb: 0.5,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}>
            {data?.Title || (
              <Skeleton width="80%" sx={{ bgcolor: "rgba(255,255,255,0.06)" }} />
            )}
          </Typography>

          {/* Meta: Year · Runtime · Rating */}
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 1 }}>
            {data
              ? [data.Year, data.Runtime, data.Rated].filter(Boolean).join("  ·  ")
              : <Skeleton width="60%" sx={{ bgcolor: "rgba(255,255,255,0.04)" }} />
            }
          </Typography>

          {/* Plot */}
          <Typography variant="body2" sx={{
            color: "text.secondary",
            fontSize: "0.76rem",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.6,
            mb: 1.5,
            flex: 1,
          }}>
            {data?.Plot || ""}
          </Typography>

          {/* OMDB genre tags */}
          {data?.Genre && (
            <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5} mb={1.5}>
              {data.Genre.split(", ").slice(0, 2).map((g) => (
                <Chip key={g} label={g} size="small" sx={{
                  fontSize: "0.57rem",
                  height: 18,
                  background: `${movie.color}22`,
                  color: movie.color,
                  border: `1px solid ${movie.color}44`,
                }} />
              ))}
            </Stack>
          )}

          {/* User rating — from MySQL via Redux */}
          {stats && stats.totalReviews > 0 ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Rating
                value={Number(stats.averageRating) || 0}
                precision={0.1}
                readOnly
                size="small"
                sx={{ "& .MuiRating-iconFilled": { color: "#F5C518" } }}
              />
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                ({stats.totalReviews})
              </Typography>
            </Box>
          ) : (
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.15)", fontSize: "0.7rem" }}>
              No reviews yet
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const dispatch = useDispatch();

  const loading        = useSelector(selectMoviesLoading);
  const activeGenre    = useSelector(selectActiveGenre);
  const searchQuery    = useSelector(selectSearchQuery);
  const filteredMovies = useSelector(selectFilteredMovies);  // dynamic list
  const totalReviews   = useSelector(selectTotalReviews);
  const moviesData     = useSelector((state) => state.movies.moviesData);

  // Count how many are loaded so far (for progress bar)
  const loadedCount = Object.keys(moviesData).length;

  return (
    <Box sx={{ minHeight: "100vh" }}>

      {/* Loading progress bar at very top */}
      {loading && (
        <LinearProgress
          variant="determinate"
          value={(loadedCount / TOTAL_MOVIES) * 100}
          sx={{
            height: 3,
            "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg, #F5C518, #C79B00)" },
            bgcolor: "rgba(255,255,255,0.05)",
          }}
        />
      )}

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <Box sx={{
        background: "linear-gradient(180deg, #0A0D1F 0%, #080B14 100%)",
        borderBottom: "1px solid", borderColor: "divider",
        pt: { xs: 6, md: 10 }, pb: { xs: 4, md: 6 },
        position: "relative", overflow: "hidden",
      }}>
        <Box sx={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(245,197,24,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <Container maxWidth="lg" sx={{ position: "relative", textAlign: "center" }}>
          <Typography variant="overline" sx={{
            color: "primary.main", letterSpacing: 4, mb: 2, display: "block",
          }}>
            🎬 Vimarsanam 
          </Typography>

          <Typography variant="h1" sx={{
            fontSize: { xs: "2.4rem", md: "3.8rem" },
            background: "linear-gradient(135deg, #FFFFFF 0%, #F5C518 50%, #C79B00 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}>
            Movie Review Hub
          </Typography>

          {/* Dynamic subtitle — reads from MOVIES.length */}
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, maxWidth: 520, mx: "auto" }}>
            Explore{" "}
            <b style={{ color: "#F5C518" }}>{TOTAL_MOVIES} movies</b> across{" "}
            <b style={{ color: "#F5C518" }}>{TOTAL_GENRES} genres</b>.
            Rate, review, and discover.
          </Typography>

          {/* ── Dynamic Stats ── */}
          <Stack direction="row" spacing={{ xs: 3, md: 5 }} justifyContent="center" mb={4}>
            {[
              { icon: <MovieIcon />,      val: TOTAL_MOVIES,  label: "Movies"  },  // ← MOVIES.length
              { icon: <RateReviewIcon />, val: totalReviews,  label: "Reviews" },  // ← from MySQL
              { icon: <CategoryIcon />,   val: TOTAL_GENRES,  label: "Genres"  },  // ← unique genres
            ].map(({ icon, val, label }) => (
              <Box key={label} sx={{ textAlign: "center" }}>
                <Box sx={{ color: "primary.main", mb: 0.5 }}>{icon}</Box>
                <Typography variant="h4" sx={{ color: "primary.main", fontWeight: 800 }}>
                  {val}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", letterSpacing: 2 }}>
                  {label.toUpperCase()}
                </Typography>
              </Box>
            ))}
          </Stack>

          {/* Search */}
          <Box sx={{ maxWidth: 480, mx: "auto" }}>
            <TextField
              fullWidth
              placeholder={`Search ${TOTAL_MOVIES} movies...`}
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "primary.main" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 50,
                  background: "rgba(255,255,255,0.04)",
                },
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* ══════════════════════════════════════
          GENRE FILTER — auto-built from MOVIES
      ══════════════════════════════════════ */}
      <Box sx={{
        borderBottom: "1px solid", borderColor: "divider",
        background: "rgba(0,0,0,0.4)",
        py: 1.5,
        overflowX: "auto",
        "&::-webkit-scrollbar": { height: 4 },
        "&::-webkit-scrollbar-thumb": { background: "#F5C518", borderRadius: 2 },
      }}>
        <Container maxWidth="lg">
          <Stack direction="row" spacing={1} sx={{ minWidth: "max-content" }}>
            {ALL_GENRES.map((g) => (
              <Chip
                key={g}
                label={g === "All" ? `All  (${TOTAL_MOVIES})` : g}
                onClick={() => dispatch(setActiveGenre(g))}
                variant={activeGenre === g ? "filled" : "outlined"}
                sx={{
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontWeight: activeGenre === g ? 700 : 400,
                  ...(activeGenre === g
                    ? {
                        background: "rgba(245,197,24,0.15)",
                        color: "primary.main",
                        borderColor: "primary.main",
                      }
                    : {
                        color: "text.secondary",
                        borderColor: "rgba(255,255,255,0.1)",
                      }),
                  "&:hover": { borderColor: "primary.main", color: "primary.main" },
                }}
              />
            ))}
          </Stack>
        </Container>
      </Box>

      {/* ══════════════════════════════════════
          MOVIE GRID — one card per MOVIES entry
      ══════════════════════════════════════ */}
      <Container maxWidth="lg" sx={{ py: 4 }}>

        {/* Loading status */}
        {loading && (
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 2 }}>
            Loading movies... {loadedCount} / {TOTAL_MOVIES}
          </Typography>
        )}

        {/* Results label */}
        {!loading && (
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
            Showing{" "}
            <b style={{ color: "#F5C518" }}>{filteredMovies.length}</b>{" "}
            of {TOTAL_MOVIES} movies
            {activeGenre !== "All" && (
              <span> in <b style={{ color: "#F5C518" }}>{activeGenre}</b></span>
            )}
            {searchQuery && (
              <span> matching <b style={{ color: "#F5C518" }}>"{searchQuery}"</b></span>
            )}
          </Typography>
        )}

        <Grid container spacing={3}>
          {loading ? (
            // Skeleton count = MOVIES.length dynamically
            Array.from({ length: TOTAL_MOVIES }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <MovieCardSkeleton />
              </Grid>
            ))
          ) : (
            // One card per movie — loops filteredMovies from Redux
            filteredMovies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))
          )}
        </Grid>

        {/* Empty state */}
        {!loading && filteredMovies.length === 0 && (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography sx={{ fontSize: 64, mb: 2 }}>🎬</Typography>
            <Typography variant="h5" sx={{ color: "text.secondary", mb: 1 }}>
              No movies found
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Try a different search or select another genre
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}