import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { backendAxios, omdbAxios } from "./axiosConfig";

export const MOVIES = [
  // ── Original 12 Movies ─────────────────────────────────────────────────────
  { genre: "Action",    id: "tt0468569", emoji: "🦸", color: "#e53935" },  // The Dark Knight
  { genre: "Comedy",    id: "tt1119646", emoji: "😂", color: "#fb8c00" },  // The Hangover
  { genre: "Horror",    id: "tt5052448", emoji: "😱", color: "#6a1b9a" },  // Get Out
  { genre: "Romance",   id: "tt0332280", emoji: "💕", color: "#e91e63" },  // The Notebook
  { genre: "Sci-Fi",    id: "tt0816692", emoji: "🚀", color: "#0288d1" },  // Interstellar
  { genre: "Drama",     id: "tt0111161", emoji: "🎭", color: "#2e7d32" },  // Shawshank Redemption
  { genre: "Thriller",  id: "tt2267998", emoji: "🕵️", color: "#37474f" },  // Gone Girl
  { genre: "Fantasy",   id: "tt0120737", emoji: "🧙", color: "#00695c" },  // Lord of the Rings
  { genre: "Animation", id: "tt4633694", emoji: "🎨", color: "#f57f17" },  // Spider-Verse
  { genre: "Crime",     id: "tt0068646", emoji: "🔫", color: "#4e342e" },  // The Godfather
  { genre: "Biography", id: "tt1285016", emoji: "🏆", color: "#1565c0" },  // The Social Network
  { genre: "Musical",   id: "tt3783958", emoji: "🎵", color: "#ad1457" },  // La La Land

  // ── Brad Pitt Movies ───────────────────────────────────────────────────────
  { genre: "Drama",     id: "tt0137523", emoji: "🥊", color: "#b71c1c" },  // Fight Club
  { genre: "Thriller",  id: "tt0114369", emoji: "🔍", color: "#263238" },  // Se7en
  { genre: "Action",    id: "tt0361748", emoji: "💣", color: "#c62828" },  // Inglourious Basterds

  // ── Leonardo DiCaprio Movies ───────────────────────────────────────────────
  { genre: "Sci-Fi",    id: "tt1375666", emoji: "🌀", color: "#01579b" },  // Inception
  { genre: "Biography", id: "tt0993846", emoji: "💰", color: "#f57f17" },  // Wolf of Wall Street
  { genre: "Adventure", id: "tt1663202", emoji: "🐻", color: "#3e2723" },  // The Revenant

{ genre: "Pirates", id: "tt0325980", emoji: "⚓", color: "#1a237e" },  // The Curse of the Black Pearl
{ genre: "Pirates", id: "tt0383574", emoji: "🦑", color: "#0d47a1" },  // Dead Man's Chest
{ genre: "Pirates", id: "tt0449088", emoji: "🌊", color: "#1565c0" },  // At World's End
{ genre: "Pirates", id: "tt1298650", emoji: "🧜", color: "#006064" },  // On Stranger Tides
{ genre: "Pirates", id: "tt1790809", emoji: "💀", color: "#37474f" },

  // ── Marvel / MCU Movies ────────────────────────────────────────────────────
  { genre: "Marvel", id: "tt0371746",  emoji: "🦾", color: "#b71c1c" },  // Iron Man (2008)
  { genre: "Marvel", id: "tt0800080",  emoji: "💚", color: "#2e7d32" },  // The Incredible Hulk (2008)
  { genre: "Marvel", id: "tt0458339",  emoji: "🛡️", color: "#1a237e" },  // Captain America: The First Avenger (2011)
  { genre: "Marvel", id: "tt0800369",  emoji: "⚡", color: "#37474f" },  // Thor (2011)
  { genre: "Marvel", id: "tt0848228",  emoji: "💥", color: "#1565c0" },  // The Avengers (2012)
  { genre: "Marvel", id: "tt1843866",  emoji: "❄️", color: "#0d47a1" },  // Captain America: The Winter Soldier (2014)
  { genre: "Marvel", id: "tt2015381",  emoji: "🌌", color: "#6a1b9a" },  // Guardians of the Galaxy (2014)
  { genre: "Marvel", id: "tt3498820",  emoji: "🐜", color: "#e65100" },  // Ant-Man (2015)
  { genre: "Marvel", id: "tt3501632",  emoji: "🔨", color: "#4e342e" },  // Thor: Ragnarok (2017)
  { genre: "Marvel", id: "tt1825683",  emoji: "🐾", color: "#212121" },  // Black Panther (2018)
  { genre: "Marvel", id: "tt4154756",  emoji: "💎", color: "#880e4f" },  // Avengers: Infinity War (2018)
  { genre: "Marvel", id: "tt4154796",  emoji: "🕰️", color: "#1a237e" },  // Avengers: Endgame (2019)
  { genre: "Marvel", id: "tt2250912",  emoji: "🕷️", color: "#c62828" },  // Spider-Man: Homecoming (2017)
  { genre: "Marvel", id: "tt6166392",  emoji: "🕶️", color: "#263238" },  // Black Widow (2021)
  { genre: "Marvel", id: "tt9376612",  emoji: "🔮", color: "#283593" },  // Shang-Chi and the Legend of the Ten Rings (2021)
  { genre: "Conjuring", id: "tt1457767", emoji: "👻", color: "#4a148c" },  // The Conjuring
{ genre: "Conjuring", id: "tt3065204", emoji: "👹", color: "#b71c1c" },  // Annabelle
{ genre: "Conjuring", id: "tt2832470", emoji: "👻", color: "#311b92" },  // The Conjuring 2
{ genre: "Conjuring", id: "tt4325590", emoji: "🪆", color: "#880e4f" },  // Annabelle: Creation
{ genre: "Conjuring", id: "tt5814060", emoji: "🛐", color: "#1a237e" },  // The Nun
{ genre: "Conjuring", id: "tt7144682", emoji: "👁️", color: "#4e342e" },  // The Curse of La Llorona
{ genre: "Conjuring", id: "tt6139732", emoji: "🪆", color: "#880e4f" },  // Annabelle Comes Home
{ genre: "Conjuring", id: "tt9735428", emoji: "👻", color: "#4a148c" },  // The Conjuring: The Devil Made Me Do It
{ genre: "Conjuring", id: "tt9253866", emoji: "🛐", color: "#1a237e" },  // The Nun 2
{ genre: "Tom Cruise", id: "tt0092099", emoji: "✈️", color: "#1a237e" },  // Top Gun
{ genre: "Tom Cruise", id: "tt0093779", emoji: "🎱", color: "#212121" },  // The Color of Money
{ genre: "Tom Cruise", id: "tt0095859", emoji: "🍹", color: "#e65100" },  // Cocktail
{ genre: "Tom Cruise", id: "tt0097428", emoji: "🏎️", color: "#b71c1c" },  // Born on the Fourth of July
{ genre: "Tom Cruise", id: "tt0100403", emoji: "🏎️", color: "#b71c1c" },  // Days of Thunder
{ genre: "Tom Cruise", id: "tt0102926", emoji: "🧠", color: "#4a148c" },  // The Silence of the Lambs (co-star)
{ genre: "Tom Cruise", id: "tt0103064", emoji: "🦅", color: "#1b5e20" },  // Far and Away
{ genre: "Tom Cruise", id: "tt0104257", emoji: "⚖️", color: "#0d47a1" },  // A Few Good Men
{ genre: "Tom Cruise", id: "tt0107302", emoji: "🎙️", color: "#37474f" },  // The Firm
{ genre: "Tom Cruise", id: "tt0111745", emoji: "🩩", color: "#880e4f" },  // Interview with the Vampire
{ genre: "Tom Cruise", id: "tt0117060", emoji: "💣", color: "#b71c1c" },  // Mission: Impossible
{ genre: "Tom Cruise", id: "tt0120815", emoji: "⚔️", color: "#4e342e" },  // Saving Private Ryan (co-star)
{ genre: "Tom Cruise", id: "tt0120689", emoji: "🌀", color: "#4a148c" },  // Magnolia
{ genre: "Tom Cruise", id: "tt0181689", emoji: "💣", color: "#b71c1c" },  // Mission: Impossible 2
{ genre: "Tom Cruise", id: "tt0290334", emoji: "💣", color: "#b71c1c" },  // Mission: Impossible III
{ genre: "Tom Cruise", id: "tt0317705", emoji: "🕶️", color: "#212121" },  // Collateral
{ genre: "Tom Cruise", id: "tt0338526", emoji: "⚔️", color: "#4e342e" },  // The Last Samurai
{ genre: "Tom Cruise", id: "tt0367594", emoji: "🌍", color: "#1b5e20" },  // War of the Worlds
{ genre: "Tom Cruise", id: "tt0970179", emoji: "💣", color: "#b71c1c" },  // Mission: Impossible - Ghost Protocol
{ genre: "Tom Cruise", id: "tt1340800", emoji: "💣", color: "#b71c1c" },  // Mission: Impossible - Rogue Nation
{ genre: "Tom Cruise", id: "tt2713180", emoji: "⚔️", color: "#37474f" },  // Edge of Tomorrow
{ genre: "Tom Cruise", id: "tt3501632", emoji: "🏎️", color: "#e65100" },  // Jack Reacher
{ genre: "Tom Cruise", id: "tt1745960", emoji: "✈️", color: "#1a237e" },  // Top Gun: Maverick
{ genre: "Tom Cruise", id: "tt2381249", emoji: "💣", color: "#b71c1c" },  // Mission: Impossible - Fallout
{ genre: "Tom Cruise", id: "tt9603212", emoji: "💣", color: "#b71c1c" },  // Mission: Impossible - Dead Reckoning Part One
{ genre: "Cult Classic", id: "tt0110912", emoji: "💉", color: "#f57f17" },  // Pulp Fiction
{ genre: "Cult Classic", id: "tt0133093", emoji: "💊", color: "#1b5e20" },  // The Matrix
{ genre: "Cult Classic", id: "tt0088763", emoji: "⏰", color: "#e65100" },  // Back to the Future
{ genre: "Cult Classic", id: "tt0082971", emoji: "🏺", color: "#4e342e" },  // Raiders of the Lost Ark
{ genre: "Cult Classic", id: "tt0109830", emoji: "🍫", color: "#3e2723" },  // Forrest Gump
{ genre: "Cult Classic", id: "tt0070047", emoji: "😈", color: "#4a148c" },  // The Exorcist
{ genre: "Cult Classic", id: "tt0081505", emoji: "🪓", color: "#b71c1c" },  // The Shining
{ genre: "Cult Classic", id: "tt0086190", emoji: "🚀", color: "#0d47a1" },  // Return of the Jedi
{ genre: "Cult Classic", id: "tt0071562", emoji: "🔫", color: "#263238" },  // The Godfather Part II
{ genre: "Cult Classic", id: "tt0078748", emoji: "👾", color: "#1a237e" },  // Alien
{ genre: "Cult Classic", id: "tt0080684", emoji: "🌌", color: "#212121" },  // The Empire Strikes Back
{ genre: "Cult Classic", id: "tt0172495", emoji: "⚔️", color: "#c62828" },  // Gladiator
{ genre: "Cult Classic", id: "tt0073195", emoji: "🦈", color: "#01579b" },  // Jaws
{ genre: "Cult Classic", id: "tt0114814", emoji: "🎭", color: "#37474f" },  // The Usual Suspects
{ genre: "Cult Classic", id: "tt0105236", emoji: "🎤", color: "#880e4f" },  // Reservoir Dogs
{ genre: "Cult Classic", id: "tt0076759", emoji: "⭐", color: "#f9a825" },  // Star Wars: A New Hope
{ genre: "Cult Classic", id: "tt0087469", emoji: "💀", color: "#4e342e" },  // Indiana Jones and the Temple of Doom
{ genre: "Cult Classic", id: "tt0090605", emoji: "👾", color: "#1b5e20" },  // Aliens
{ genre: "Cult Classic", id: "tt0118715", emoji: "🎳", color: "#e65100" },  // The Big Lebowski
{ genre: "Cult Classic", id: "tt0364569", emoji: "🩸", color: "#b71c1c" },  // Oldboy
{ genre: "Classics", id: "tt0089760", emoji: "💪", color: "#b71c1c" },  // Rambo: First Blood Part II
{ genre: "Classics", id: "tt0077416", emoji: "🔫", color: "#c62828" },  // First Blood
{ genre: "Classics", id: "tt0094071", emoji: "💪", color: "#b71c1c" },  // Rambo III
{ genre: "Classics", id: "tt0088247", emoji: "🤖", color: "#212121" },  // The Terminator
{ genre: "Classics", id: "tt0103064", emoji: "🤖", color: "#37474f" },  // Terminator 2: Judgment Day
{ genre: "Classics", id: "tt0088944", emoji: "🌴", color: "#1b5e20" },  // Predator
{ genre: "Classics", id: "tt0093773", emoji: "💥", color: "#e65100" },  // Predator (1987)
{ genre: "Classics", id: "tt0086034", emoji: "💣", color: "#b71c1c" },  // Commando
{ genre: "Classics", id: "tt0089218", emoji: "🏋️", color: "#4e342e" },  // Conan the Barbarian
{ genre: "Classics", id: "tt0082198", emoji: "⚔️", color: "#4e342e" },  // Conan the Barbarian (1982)
{ genre: "Classics", id: "tt0090605", emoji: "🔫", color: "#1b5e20" },  // Aliens
{ genre: "Classics", id: "tt0089218", emoji: "💥", color: "#c62828" },  // Raw Deal
{ genre: "Classics", id: "tt0093007", emoji: "✈️", color: "#1a237e" },  // Top Gun
{ genre: "Classics", id: "tt0095016", emoji: "💣", color: "#b71c1c" },  // Die Hard
{ genre: "Classics", id: "tt0099423", emoji: "💣", color: "#c62828" },  // Die Hard 2
{ genre: "Classics", id: "tt0112864", emoji: "💣", color: "#b71c1c" },  // Die Hard with a Vengeance
{ genre: "Classics", id: "tt0089101", emoji: "🕶️", color: "#212121" },  // Beverly Hills Cop
{ genre: "Classics", id: "tt0094184", emoji: "🕶️", color: "#37474f" },  // Beverly Hills Cop II
{ genre: "Classics", id: "tt0093058", emoji: "🔫", color: "#263238" },  // Lethal Weapon
{ genre: "Classics", id: "tt0095347", emoji: "🔫", color: "#37474f" },  // Lethal Weapon 2
];

// ── Thunk 1: Fetch all movies from OMDB using omdbAxios ──────────────────────
// Uses Promise.allSettled so even if some fail, rest still show
export const fetchAllMovies = createAsyncThunk(
  "movies/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const results = await Promise.allSettled(
        MOVIES.map(async (m) => {
          const res = await omdbAxios.get("/", {
            params: { i: m.id, plot: "full" },
          });
          return { id: m.id, data: res.data };
        })
      );
      const map = {};
      results.forEach((result) => {
        if (result.status === "fulfilled") {
          const { id, data } = result.value;
          map[id] = data;
        }
      });
      return map;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch movies");
    }
  }
);

// ── Thunk 2: Fetch reviews — GET /api/reviews/movie/:movieId ─────────────────
export const fetchReviews = createAsyncThunk(
  "movies/fetchReviews",
  async (movieId, { rejectWithValue }) => {
    try {
      const res = await backendAxios.get(`/reviews/movie/${movieId}`);
      return { movieId, reviews: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch reviews");
    }
  }
);

// ── Thunk 3: Fetch stats — GET /api/reviews/movie/:movieId/stats ─────────────
export const fetchStats = createAsyncThunk(
  "movies/fetchStats",
  async (movieId, { rejectWithValue }) => {
    try {
      const res = await backendAxios.get(`/reviews/movie/${movieId}/stats`);
      return { movieId, stats: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch stats");
    }
  }
);

// ── Thunk 4: Submit review — POST /api/reviews → MySQL ───────────────────────
export const submitReview = createAsyncThunk(
  "movies/submitReview",
  async (reviewData, { dispatch, rejectWithValue }) => {
    try {
      const res = await backendAxios.post("/reviews", reviewData);
      dispatch(fetchStats(reviewData.movieId));
      return { movieId: reviewData.movieId, review: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to submit review");
    }
  }
);

// ── Thunk 5: Delete review — DELETE /api/reviews/:id → MySQL ─────────────────
export const deleteReview = createAsyncThunk(
  "movies/deleteReview",
  async ({ reviewId, movieId }, { dispatch, rejectWithValue }) => {
    try {
      await backendAxios.delete(`/reviews/${reviewId}`);
      dispatch(fetchStats(movieId));
      return { reviewId, movieId };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete review");
    }
  }
);

// ── Initial State ─────────────────────────────────────────────────────────────
const initialState = {
  moviesData:    {},
  reviews:       {},
  stats:         {},
  activeGenre:   "All",
  searchQuery:   "",
  moviesLoading: true,
  reviewLoading: false,
  error:         null,
  snackbar: { open: false, message: "", severity: "success" },
};

// ── Slice ─────────────────────────────────────────────────────────────────────
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setActiveGenre: (state, action) => { state.activeGenre = action.payload; },
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; },
    showSnackbar:   (state, action) => {
      state.snackbar = { open: true, message: action.payload.message, severity: action.payload.severity || "success" };
    },
    hideSnackbar: (state) => { state.snackbar.open = false; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending,   (state)          => { state.moviesLoading = true; state.error = null; })
      .addCase(fetchAllMovies.fulfilled, (state, action)  => { state.moviesData = action.payload; state.moviesLoading = false; })
      .addCase(fetchAllMovies.rejected,  (state, action)  => { state.moviesLoading = false; state.error = action.payload; })

      .addCase(fetchReviews.fulfilled,   (state, action)  => { state.reviews[action.payload.movieId] = action.payload.reviews; })

      .addCase(fetchStats.fulfilled,     (state, action)  => { state.stats[action.payload.movieId] = action.payload.stats; })

      .addCase(submitReview.pending,     (state)          => { state.reviewLoading = true; })
      .addCase(submitReview.fulfilled,   (state, action)  => {
        const { movieId, review } = action.payload;
        state.reviewLoading = false;
        if (!state.reviews[movieId]) state.reviews[movieId] = [];
        state.reviews[movieId].unshift(review);
        state.snackbar = { open: true, message: "Review submitted! 🎬", severity: "success" };
      })
      .addCase(submitReview.rejected,    (state, action)  => {
        state.reviewLoading = false;
        state.snackbar = { open: true, message: action.payload || "Failed to submit", severity: "error" };
      })

      .addCase(deleteReview.fulfilled,   (state, action)  => {
        const { reviewId, movieId } = action.payload;
        state.reviews[movieId] = (state.reviews[movieId] || []).filter(r => r.id !== reviewId);
        state.snackbar = { open: true, message: "Review deleted.", severity: "info" };
      })
      .addCase(deleteReview.rejected,    (state, action)  => {
        state.snackbar = { open: true, message: action.payload || "Failed to delete", severity: "error" };
      });
  },
});

export const { setActiveGenre, setSearchQuery, showSnackbar, hideSnackbar } = movieSlice.actions;

// Selectors
export const selectMoviesData    = (state) => state.movies.moviesData;
export const selectMoviesLoading = (state) => state.movies.moviesLoading;
export const selectReviewLoading = (state) => state.movies.reviewLoading;
export const selectActiveGenre   = (state) => state.movies.activeGenre;
export const selectSearchQuery   = (state) => state.movies.searchQuery;
export const selectSnackbar      = (state) => state.movies.snackbar;
export const selectTotalReviews  = (state) => Object.values(state.movies.reviews).flat().length;
export const selectReviews       = (movieId) => (state) => state.movies.reviews[movieId] || [];
export const selectStats         = (movieId) => (state) => state.movies.stats[movieId];
export const selectFilteredMovies = (state) => {
  const { moviesData, activeGenre, searchQuery } = state.movies;
  return MOVIES.filter((m) => {
    const data        = moviesData[m.id];
    const matchGenre  = activeGenre === "All" || m.genre === activeGenre;
    const matchSearch = !searchQuery || (data?.Title || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchGenre && matchSearch;
  });
};

export default movieSlice.reducer;