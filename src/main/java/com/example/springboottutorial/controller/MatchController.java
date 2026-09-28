package com.example.springboottutorial.controller;

import com.example.springboottutorial.entity.Match;
import com.example.springboottutorial.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @PostMapping
    public Match createMatch(@RequestBody Match match) {
        return matchService.createMatch(match);
    }

    @GetMapping
    public List<Match> getAllMatches() {
        return matchService.getAllMatches();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchById(
            @PathVariable Long id) {

        return matchService.getMatchById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Match> updateMatch(
            @PathVariable Long id,
            @RequestBody Match match) {

        Match updated = matchService.updateMatch(id, match);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatch(
            @PathVariable Long id) {

        if (!matchService.getMatchById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        matchService.deleteMatch(id);

        return ResponseEntity.noContent().build();
    }
}