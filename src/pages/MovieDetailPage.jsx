import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box, Container, Typography, Grid, Chip, Button, TextField,
  Rating, Avatar, Stack, LinearProgress, Paper,
  CircularProgress, IconButton, Skeleton,
} from "@mui/material";
import ArrowBackIcon    from "@mui/icons-material/ArrowBack";
import StarIcon         from "@mui/icons-material/Star";
import AccessTimeIcon   from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon       from "@mui/icons-material/Person";
import DeleteIcon       from "@mui/icons-material/Delete";
import SendIcon         from "@mui/icons-material/Send";
import EmojiEventsIcon  from "@mui/icons-material/EmojiEvents";

import {
  fetchReviews,
  fetchStats,
  submitReview,
  deleteReview,
  selectReviews,
  selectStats,
  selectReviewLoading,
  MOVIES,
} from "../store/movieSlice";

// ─── Rating Distribution Bar ──────────────────────────────────────────────────
function RatingBar({ star, count, total }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
      <Typography variant="caption" sx={{ color: "text.secondary", minWidth: 8 }}>{star}</Typography>
      <StarIcon sx={{ fontSize: 12, color: "#F5C518" }} />
      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          flex: 1, height: 6,
          "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg, #F5C518, #C79B00)" },
        }}
      />
      <Typography variant="caption" sx={{ color: "text.secondary", minWidth: 20 }}>{count}</Typography>
    </Box>
  );
}

// ─── Info Chip ────────────────────────────────────────────────────────────────
function InfoChip({ icon, label }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Box sx={{ color: "primary.main", display: "flex" }}>{icon}</Box>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>{label}</Typography>
    </Box>
  );
}

// ─── Single Review Card ───────────────────────────────────────────────────────
function ReviewCard({ review, movieId }) {
  const dispatch = useDispatch();

  const date = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric",
      })
    : "Just now";

  const handleDelete = () => {
    // Dispatches deleteReview thunk → DELETE /api/reviews/:id → removes from MySQL
    dispatch(deleteReview({ reviewId: review.id, movieId }));
  };

  return (
    <Paper sx={{
      p: 2.5, mb: 2,
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 3,
      transition: "border-color 0.2s",
      "&:hover": { borderColor: "rgba(245,197,24,0.2)" },
    }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{
            width: 36, height: 36,
            background: "linear-gradient(135deg, #F5C518, #C79B00)",
            color: "#000", fontSize: 14, fontWeight: 700,
          }}>
            {review.userName?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#fff" }}>
              {review.userName}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>{date}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Rating
            value={review.rating}
            readOnly size="small"
            sx={{ "& .MuiRating-iconFilled": { color: "#F5C518" } }}
          />
          <IconButton
            size="small"
            onClick={handleDelete}
            sx={{ color: "rgba(255,255,255,0.2)", "&:hover": { color: "error.main" } }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
        {review.reviewText}
      </Typography>
    </Paper>
  );
}

// ─── MovieDetailPage ──────────────────────────────────────────────────────────
export default function MovieDetailPage() {
  const { movieId } = useParams();
  const navigate    = useNavigate();
  const dispatch    = useDispatch();

  // Read from Redux store using selectors
  const data          = useSelector((state) => state.movies.moviesData[movieId]);
  const reviews       = useSelector(selectReviews(movieId));
  const stats         = useSelector(selectStats(movieId));
  const reviewLoading = useSelector(selectReviewLoading);

  const movie = MOVIES.find((m) => m.id === movieId);

  // Local form state (not in Redux — form state is local UI state)
  const [form, setForm]     = useState({ userName: "", reviewText: "", rating: 0 });
  const [errors, setErrors] = useState({});

  // On mount: dispatch thunks to fetch reviews + stats from Spring Boot
  useEffect(() => {
    if (movieId) {
      dispatch(fetchReviews(movieId)); // → GET /api/reviews/movie/:id
      dispatch(fetchStats(movieId));   // → GET /api/reviews/movie/:id/stats
    }
    window.scrollTo(0, 0);
  }, [movieId, dispatch]);

  // Rating distribution for chart
  const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  // Form validation
  const validate = () => {
    const e = {};
    if (!form.userName.trim()) e.userName = "Name is required";
    if (!form.reviewText.trim() || form.reviewText.trim().length < 10)
      e.reviewText = "Review must be at least 10 characters";
    if (!form.rating) e.rating = "Please select a rating";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Submit review → dispatches Redux thunk → POST to Spring Boot → saves to MySQL
  const handleSubmit = async () => {
    if (!validate()) return;
    const result = await dispatch(
      submitReview({
        movieId,
        movieTitle:  data?.Title || "",
        userName:    form.userName.trim(),
        reviewText:  form.reviewText.trim(),
        rating:      form.rating,
      })
    );
    if (submitReview.fulfilled.match(result)) {
      setForm({ userName: "", reviewText: "", rating: 0 });
      setErrors({});
      dispatch(fetchReviews(movieId)); // refresh reviews list
    }
  };

  const poster = data?.Poster && data.Poster !== "N/A" ? data.Poster : null;

  if (!movie) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <Typography sx={{ color: "text.secondary" }}>Movie not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "#080B14" }}>

      {/* ── HERO BANNER ── */}
      <Box sx={{ position: "relative", minHeight: { xs: 300, md: 480 }, overflow: "hidden" }}>
        {poster && (
          <Box component="img" src={poster} alt={data?.Title} sx={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", filter: "blur(20px) brightness(0.2)", transform: "scale(1.1)",
          }} />
        )}
        <Box sx={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(8,11,20,0.4) 0%, rgba(8,11,20,0.98) 100%)",
        }} />

        <Container maxWidth="lg" sx={{ position: "relative", pt: { xs: 3, md: 5 }, pb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{ mb: 3, color: "primary.main", fontFamily: "'DM Sans', sans-serif" }}
          >
            Back to Movies
          </Button>

          <Grid container spacing={4} alignItems="flex-end">
            {/* Poster */}
            <Grid item xs={12} sm="auto">
              <Box sx={{
                width: { xs: 160, md: 240 }, mx: { xs: "auto", sm: 0 },
                borderRadius: 3, overflow: "hidden",
                boxShadow: "0 32px 64px rgba(0,0,0,0.8)",
                border: "2px solid rgba(245,197,24,0.2)",
              }}>
                {poster ? (
                  <Box component="img" src={poster} alt={data?.Title} sx={{ width: "100%", display: "block" }} />
                ) : (
                  <Box sx={{
                    height: 320, display: "flex", alignItems: "center", justifyContent: "center",
                    background: `linear-gradient(135deg, ${movie.color}33, ${movie.color}11)`,
                    fontSize: 80,
                  }}>
                    {movie.emoji}
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Movie Info */}
            <Grid item xs={12} sm>
              <Chip
                label={`${movie.emoji} ${movie.genre}`}
                size="small"
                sx={{
                  mb: 2, background: `${movie.color}22`,
                  color: movie.color, border: `1px solid ${movie.color}55`, fontWeight: 700,
                }}
              />
              <Typography variant="h2" sx={{
                fontFamily: "'Crimson Pro', serif",
                fontSize: { xs: "1.8rem", md: "2.8rem" },
                color: "#fff", mb: 1, lineHeight: 1.2,
              }}>
                {data?.Title || <Skeleton width={300} />}
              </Typography>

              <Stack direction="row" spacing={2} flexWrap="wrap" gap={1} mb={2}>
                <InfoChip icon={<CalendarTodayIcon sx={{ fontSize: 14 }} />} label={data?.Year} />
                <InfoChip icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}    label={data?.Runtime} />
                <InfoChip icon={<PersonIcon sx={{ fontSize: 14 }} />}        label={data?.Rated} />
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} mb={2}>
                {data?.Genre?.split(", ").map((g) => (
                  <Chip key={g} label={g} size="small" sx={{
                    background: "rgba(255,255,255,0.06)",
                    color: "text.secondary",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }} />
                ))}
              </Stack>

              <Stack direction="row" spacing={3} flexWrap="wrap" gap={2} mb={2}>
                {data?.imdbRating && data.imdbRating !== "N/A" && (
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" sx={{ color: "#F5C518", fontWeight: 800 }}>
                      ⭐ {data.imdbRating}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>IMDb Rating</Typography>
                  </Box>
                )}
                {data?.Ratings?.find((r) => r.Source === "Rotten Tomatoes") && (
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" sx={{ color: "#fa320a", fontWeight: 800 }}>
                      🍅 {data.Ratings.find((r) => r.Source === "Rotten Tomatoes").Value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>Rotten Tomatoes</Typography>
                  </Box>
                )}
                {stats && stats.totalReviews > 0 && (
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" sx={{ color: "#22C55E", fontWeight: 800 }}>
                      ⭐ {stats.averageRating}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>User Rating</Typography>
                  </Box>
                )}
              </Stack>

              <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 600, lineHeight: 1.8 }}>
                {data?.Plot}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── MAIN CONTENT ── */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={4}>

          {/* LEFT: Info + Review Form */}
          <Grid item xs={12} md={7}>

            {/* Cast & Crew */}
            <Paper sx={{ p: 3, mb: 3, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 3 }}>
              <Typography variant="h6" sx={{ color: "primary.main", mb: 2, fontFamily: "'Crimson Pro', serif", fontSize: "1.2rem" }}>
                🎬 Cast & Crew
              </Typography>
              <Grid container spacing={2}>
                {[
                  { label: "Director",   value: data?.Director },
                  { label: "Writer",     value: data?.Writer },
                  { label: "Stars",      value: data?.Actors },
                  { label: "Language",   value: data?.Language },
                  { label: "Country",    value: data?.Country },
                  { label: "Box Office", value: data?.BoxOffice },
                ].map(({ label, value }) =>
                  value && value !== "N/A" ? (
                    <Grid item xs={12} sm={6} key={label}>
                      <Typography variant="caption" sx={{ color: "primary.main", letterSpacing: 1, textTransform: "uppercase" }}>
                        {label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.3 }}>{value}</Typography>
                    </Grid>
                  ) : null
                )}
              </Grid>
            </Paper>

            {/* Awards */}
            {data?.Awards && data.Awards !== "N/A" && (
              <Paper sx={{ p: 3, mb: 3, background: "rgba(245,197,24,0.04)", border: "1px solid rgba(245,197,24,0.15)", borderRadius: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <EmojiEventsIcon sx={{ color: "primary.main" }} />
                  <Typography variant="h6" sx={{ color: "primary.main", fontFamily: "'Crimson Pro', serif" }}>Awards</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>{data.Awards}</Typography>
              </Paper>
            )}

            {/* ✍️ Review Form */}
            <Paper sx={{ p: 3, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3 }}>
              <Typography variant="h6" sx={{ color: "#fff", fontFamily: "'Crimson Pro', serif", fontSize: "1.3rem", mb: 2.5 }}>
                ✍️ Write a Review
              </Typography>

              <TextField
                fullWidth label="Your Name"
                value={form.userName}
                onChange={(e) => setForm({ ...form, userName: e.target.value })}
                error={!!errors.userName}
                helperText={errors.userName}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth multiline rows={4}
                label="Your Review"
                placeholder="Share your thoughts about this movie..."
                value={form.reviewText}
                onChange={(e) => setForm({ ...form, reviewText: e.target.value })}
                error={!!errors.reviewText}
                helperText={errors.reviewText || `${form.reviewText.length} characters (min 10)`}
                sx={{ mb: 2 }}
              />

              <Box sx={{ mb: 2.5 }}>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>Your Rating *</Typography>
                <Rating
                  value={form.rating}
                  onChange={(_, v) => setForm({ ...form, rating: v })}
                  size="large"
                  sx={{ "& .MuiRating-iconFilled": { color: "#F5C518" }, "& .MuiRating-iconHover": { color: "#FFD740" } }}
                />
                {errors.rating && (
                  <Typography variant="caption" sx={{ color: "error.main", display: "block", mt: 0.5 }}>
                    {errors.rating}
                  </Typography>
                )}
              </Box>

              {/* Submit → dispatches submitReview thunk → POST to Spring Boot → MySQL */}
              <Button
                variant="contained" color="primary" fullWidth size="large"
                endIcon={reviewLoading ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
                onClick={handleSubmit}
                disabled={reviewLoading}
                sx={{ py: 1.5 }}
              >
                {reviewLoading ? "Submitting..." : "Submit Review"}
              </Button>
            </Paper>
          </Grid>

          {/* RIGHT: Stats + Reviews */}
          <Grid item xs={12} md={5}>

            {/* Stats Card */}
            {stats && (
              <Paper sx={{ p: 3, mb: 3, background: "rgba(245,197,24,0.04)", border: "1px solid rgba(245,197,24,0.15)", borderRadius: 3 }}>
                <Typography variant="h6" sx={{ color: "primary.main", fontFamily: "'Crimson Pro', serif", mb: 2 }}>
                  📊 Review Statistics
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Typography variant="h2" sx={{ color: "primary.main", fontWeight: 800 }}>
                    {stats.averageRating || "—"}
                  </Typography>
                  <Box>
                    <Rating
                      value={Number(stats.averageRating) || 0}
                      precision={0.1} readOnly
                      sx={{ "& .MuiRating-iconFilled": { color: "#F5C518" } }}
                    />
                    <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                      {stats.totalReviews} review{stats.totalReviews !== 1 ? "s" : ""}
                    </Typography>
                  </Box>
                </Box>
                {ratingDist.map(({ star, count }) => (
                  <RatingBar key={star} star={star} count={count} total={reviews.length} />
                ))}
              </Paper>
            )}

            {/* Reviews List */}
            <Typography variant="h6" sx={{ color: "#fff", fontFamily: "'Crimson Pro', serif", mb: 2 }}>
              💬 User Reviews ({reviews.length})
            </Typography>

            {reviews.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 3 }}>
                <Typography sx={{ fontSize: 40, mb: 1 }}>🎬</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  No reviews yet. Be the first to review this film!
                </Typography>
              </Paper>
            ) : (
              reviews.map((r) => (
                <ReviewCard key={r.id} review={r} movieId={movieId} />
              ))
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}