package com.example.springboottutorial.controller;

import com.example.springboottutorial.entity.Tournament;
import com.example.springboottutorial.service.TournamentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {

    private final TournamentService tournamentService;

    public TournamentController(TournamentService tournamentService) {
        this.tournamentService = tournamentService;
    }

    @PostMapping
    public Tournament createTournament(@RequestBody Tournament tournament) {
        return tournamentService.createTournament(tournament);
    }

    @GetMapping
    public List<Tournament> getAllTournaments() {
        return tournamentService.getAllTournaments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tournament> getTournamentById(@PathVariable Long id) {
        return tournamentService.getTournamentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tournament> updateTournament(
            @PathVariable Long id,
            @RequestBody Tournament tournament) {

        Tournament updated = tournamentService.updateTournament(id, tournament);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTournament(@PathVariable Long id) {

        if (!tournamentService.getTournamentById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        tournamentService.deleteTournament(id);
        return ResponseEntity.noContent().build();
    }
}