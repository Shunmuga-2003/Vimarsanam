package com.example.Movie_Review_BackendApp.model;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;
public class ReviewDTO {
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Request {
        @NotBlank(message = "Movie ID is required")
        private String movieId;
        @NotBlank(message = "Movie title is required")
        private String movieTitle;
        @NotBlank(message = "User name is required")
        @Size(min = 2, max = 50, message = "Name must be 2-50 characters")
        private String userName;
        @NotBlank(message = "Review text is required")
        @Size(min = 5, max = 1000, message = "Review must be between 5 and 1000 characters")
        private String reviewText;
        @NotNull(message = "Rating is required")
        @Min(value = 1, message = "Rating must be at least 1")
        @Max(value = 5, message = "Rating must be at most 5")
        private Integer rating;
    }
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private Long id;
        private String movieId;
        private String movieTitle;
        private String userName;
        private String reviewText;
        private Integer rating;
        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime createdAt;
    }
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MovieStats {
        private String movieId;
        private long totalReviews;
        private double averageRating;
    }
}