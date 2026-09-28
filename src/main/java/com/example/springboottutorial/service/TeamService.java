package com.example.springboottutorial.service;

import com.example.springboottutorial.entity.Team;
import com.example.springboottutorial.repository.TeamRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    private final TeamRepository teamRepository;

    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public Team createTeam(Team team) {
        return teamRepository.save(team);
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Optional<Team> getTeamById(Long id) {
        return teamRepository.findById(id);
    }

    public Team updateTeam(Long id, Team team) {

        Optional<Team> existingTeam =
                teamRepository.findById(id);

        if (existingTeam.isPresent()) {

            Team existing = existingTeam.get();

            existing.setName(team.getName());
            existing.setCoach(team.getCoach());
            existing.setCity(team.getCity());

            return teamRepository.save(existing);
        }

        return null;
    }

    public void deleteTeam(Long id) {
        teamRepository.deleteById(id);
    }
}