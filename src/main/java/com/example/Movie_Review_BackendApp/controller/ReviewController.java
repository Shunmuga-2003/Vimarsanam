package com.example.Movie_Review_BackendApp.controller;


import com.example.Movie_Review_BackendApp.model.ReviewDTO;
import com.example.Movie_Review_BackendApp.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:5179")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<ReviewDTO.Response>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    // GET /api/reviews/movie/{movieId} - Get reviews for a movie
    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<ReviewDTO.Response>> getReviewsByMovie(@PathVariable String movieId) {
        List<ReviewDTO.Response> reviews = reviewService.getReviewsByMovieId(movieId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/movie/{movieId}/stats")
    public ResponseEntity<ReviewDTO.MovieStats> getMovieStats(@PathVariable String movieId) {
        return ResponseEntity.ok(reviewService.getMovieStats(movieId));
    }

    // POST /api/reviews - Add a new review
    @PostMapping
    public ResponseEntity<ReviewDTO.Response> addReview(@Valid @RequestBody ReviewDTO.Request request) {
        log.info("POST /api/reviews - Adding review for movie: {}", request.getMovieId());
        ReviewDTO.Response response = reviewService.addReview(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
