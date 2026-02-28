package com.example.Movie_Review_BackendApp.model;

import lombok.*;
import jakarta.validation.constraints.*;
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
        @Size(min = 2, max = 50)
        private String userName;

        @NotBlank(message = "Review text is required")
        @Size(min = 10, message = "Review must be at least 10 characters")
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