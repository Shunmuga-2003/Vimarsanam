package com.example.Movie_Review_BackendApp.repository;

import com.example.Movie_Review_BackendApp.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    abstract List<Review> findByMovieIdOrderByCreatedAtDesc(String movieId);

    abstract long countByMovieId(String movieId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.movieId = :movieId")
    Double findAverageRatingByMovieId(String movieId);
    List<Review> findAllByOrderByCreatedAtDesc();
}