package com.example.springboottutorial.service;

import com.example.springboottutorial.entity.Match;
import com.example.springboottutorial.repository.MatchRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MatchService {

    private final MatchRepository matchRepository;

    public MatchService(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }

    public Match createMatch(Match match) {
        return matchRepository.save(match);
    }

    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    }

    public Optional<Match> getMatchById(Long id) {
        return matchRepository.findById(id);
    }

    public Match updateMatch(Long id, Match match) {

        Optional<Match> existingMatch =
                matchRepository.findById(id);

        if (existingMatch.isPresent()) {

            Match existing = existingMatch.get();

            existing.setTeam1(match.getTeam1());
            existing.setTeam2(match.getTeam2());
            existing.setMatchDate(match.getMatchDate());
            existing.setVenue(match.getVenue());
            existing.setStatus(match.getStatus());

            return matchRepository.save(existing);
        }

        return null;
    }

    public void deleteMatch(Long id) {
        matchRepository.deleteById(id);
    }
}