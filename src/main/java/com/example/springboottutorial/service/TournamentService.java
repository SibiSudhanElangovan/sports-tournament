package com.example.springboottutorial.service;

import com.example.springboottutorial.entity.Tournament;
import com.example.springboottutorial.repository.TournamentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TournamentService {

    private final TournamentRepository tournamentRepository;

    public TournamentService(TournamentRepository tournamentRepository) {
        this.tournamentRepository = tournamentRepository;
    }

    public Tournament createTournament(Tournament tournament) {
        return tournamentRepository.save(tournament);
    }

    public List<Tournament> getAllTournaments() {
        return tournamentRepository.findAll();
    }

    public Optional<Tournament> getTournamentById(Long id) {
        return tournamentRepository.findById(id);
    }

    public Tournament updateTournament(Long id, Tournament tournament) {

        Optional<Tournament> existingTournament =
                tournamentRepository.findById(id);

        if (existingTournament.isPresent()) {

            Tournament existing = existingTournament.get();

            existing.setName(tournament.getName());
            existing.setLocation(tournament.getLocation());
            existing.setStartDate(tournament.getStartDate());
            existing.setEndDate(tournament.getEndDate());

            return tournamentRepository.save(existing);
        }

        return null;
    }

    public void deleteTournament(Long id) {
        tournamentRepository.deleteById(id);
    }
}