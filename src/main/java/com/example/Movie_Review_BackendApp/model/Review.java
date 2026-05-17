package com.example.Movie_Review_BackendApp.model;

import jakarta.persistence.*;
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
    @Column(nullable = false)
    private String movieId;
    @Column(nullable = false)
    private String movieTitle;
    @Column(nullable = false)
    private String userName;

    @Column(nullable = false, length = 1000)
    private String reviewText;

    @Column(nullable = false)
    private Integer rating;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}