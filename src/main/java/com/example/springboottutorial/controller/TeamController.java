package com.example.springboottutorial.controller;

import com.example.springboottutorial.entity.Team;
import com.example.springboottutorial.service.TeamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    // =========================
    // CREATE TEAM
    // =========================
    @PostMapping
    public ResponseEntity<Team> createTeam(
            @RequestBody Team team) {

        Team savedTeam = teamService.createTeam(team);

        return ResponseEntity.ok(savedTeam);
    }

    // =========================
    // GET ALL TEAMS
    // =========================
    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams() {

        return ResponseEntity.ok(
                teamService.getAllTeams()
        );
    }

    // =========================
    // GET TEAM BY ID
    // =========================
    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeamById(
            @PathVariable Long id) {

        return teamService.getTeamById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // =========================
    // UPDATE TEAM
    // =========================
    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeam(
            @PathVariable Long id,
            @RequestBody Team team) {

        Team updatedTeam =
                teamService.updateTeam(id, team);

        if (updatedTeam == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedTeam);
    }

    // =========================
    // DELETE TEAM
    // =========================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(
            @PathVariable Long id) {

        if (!teamService.getTeamById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }

        teamService.deleteTeam(id);

        return ResponseEntity.noContent().build();
    }
}