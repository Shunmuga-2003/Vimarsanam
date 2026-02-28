package com.example.Movie_Review_BackendApp.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "movie_id", nullable = false)
    @NotBlank(message = "Movie ID is required")
    private String movieId;

    @Column(name = "movie_title", nullable = false)
    @NotBlank(message = "Movie title is required")
    private String movieTitle;

    @Column(name = "user_name", nullable = false)
    @NotBlank(message = "User name is required")
    @Size(min = 2, max = 50, message = "Name must be 2-50 characters")
    private String userName;

    @Column(name = "review_text", nullable = false, columnDefinition = "TEXT")
    @NotBlank(message = "Review text is required")
    @Size(min = 10, message = "Review must be at least 10 characters")
    private String reviewText;

    @Column(name = "rating", nullable = false)
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
