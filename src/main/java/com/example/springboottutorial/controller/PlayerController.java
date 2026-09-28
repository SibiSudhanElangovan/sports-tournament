package com.example.springboottutorial.controller;

import com.example.springboottutorial.entity.Player;
import com.example.springboottutorial.service.PlayerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @PostMapping
    public Player createPlayer(@RequestBody Player player) {
        return playerService.createPlayer(player);
    }

    @GetMapping
    public List<Player> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable Long id) {
        return playerService.getPlayerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Player> updatePlayer(
            @PathVariable Long id,
            @RequestBody Player player) {

        Player updated = playerService.updatePlayer(id, player);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlayer(@PathVariable Long id) {

        if (!playerService.getPlayerById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        playerService.deletePlayer(id);

        return ResponseEntity.noContent().build();
    }
}