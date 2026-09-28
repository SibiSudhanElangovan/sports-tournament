package com.example.springboottutorial.repository;

import com.example.springboottutorial.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {

}