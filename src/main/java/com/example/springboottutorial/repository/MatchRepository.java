package com.example.springboottutorial.repository;

import com.example.springboottutorial.entity.Match;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, Long> {

}