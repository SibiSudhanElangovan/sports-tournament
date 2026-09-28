package com.example.springboottutorial.repository;

import com.example.springboottutorial.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {

}