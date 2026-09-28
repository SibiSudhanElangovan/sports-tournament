package com.example.springboottutorial.repository;

import com.example.springboottutorial.entity.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TournamentRepository extends JpaRepository<Tournament, Long> {

}