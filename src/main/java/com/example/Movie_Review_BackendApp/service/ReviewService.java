package com.example.Movie_Review_BackendApp.service;
import com.example.Movie_Review_BackendApp.model.Review;
import com.example.Movie_Review_BackendApp.model.ReviewDTO;
import com.example.Movie_Review_BackendApp.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService {
    @Autowired
    private final ReviewRepository reviewRepository;
    public List<ReviewDTO.Response> getReviewsByMovieId(String movieId) {
        return reviewRepository.findByMovieIdOrderByCreatedAtDesc(movieId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }
    public List<ReviewDTO.Response> getAllReviews() {
        return reviewRepository.findAllByOrderByCreatedAtDesc()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }
    public ReviewDTO.Response addReview(ReviewDTO.Request request) {
        log.info("Saving review for movie: {} by: {}", request.getMovieId(), request.getUserName());
        Review review = Review.builder()
                .movieId(request.getMovieId())
                .movieTitle(request.getMovieTitle())
                .userName(request.getUserName())
                .reviewText(request.getReviewText())
                .rating(request.getRating())
                .build();
        Review saved = reviewRepository.save(review);
        log.info("Review saved with id: {}", saved.getId());
        return toResponse(saved);
    }
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
        log.info("Review {} deleted", id);
    }
    public ReviewDTO.MovieStats getMovieStats(String movieId) {
        long total = reviewRepository.countByMovieId(movieId);
        Double avg = reviewRepository.findAverageRatingByMovieId(movieId);
        double roundedAvg = avg != null ? Math.round(avg * 10.0) / 10.0 : 0.0;
        return ReviewDTO.MovieStats.builder()
                .movieId(movieId)
                .totalReviews(total)
                .averageRating(roundedAvg)
                .build();
    }
    private ReviewDTO.Response toResponse(Review r) {
        return ReviewDTO.Response.builder()
                .id(r.getId())
                .movieId(r.getMovieId())
                .movieTitle(r.getMovieTitle())
                .userName(r.getUserName())
                .reviewText(r.getReviewText())
                .rating(r.getRating())
                .createdAt(r.getCreatedAt())
                .build();
    }
}