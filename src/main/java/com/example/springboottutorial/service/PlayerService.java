package com.example.springboottutorial.service;

import com.example.springboottutorial.entity.Player;
import com.example.springboottutorial.repository.PlayerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Optional<Player> getPlayerById(Long id) {
        return playerRepository.findById(id);
    }

    public Player updatePlayer(Long id, Player player) {

        Optional<Player> existingPlayer =
                playerRepository.findById(id);

        if (existingPlayer.isPresent()) {

            Player existing = existingPlayer.get();

            existing.setName(player.getName());
            existing.setAge(player.getAge());
            existing.setRole(player.getRole());
            existing.setTeamId(player.getTeamId());

            return playerRepository.save(existing);
        }

        return null;
    }

    public void deletePlayer(Long id) {
        playerRepository.deleteById(id);
    }
}