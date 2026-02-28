package com.example.Movie_Review_BackendApp.repository;


import com.example.Movie_Review_BackendApp.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Get all reviews for a specific movie
    List<Review> findByMovieIdOrderByCreatedAtDesc(String movieId);

    // Count reviews per movie
    long countByMovieId(String movieId);

    // Get average rating for a movie
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.movieId = :movieId")
    Double findAverageRatingByMovieId(String movieId);

    // Get all reviews ordered by newest
    List<Review> findAllByOrderByCreatedAtDesc();
}