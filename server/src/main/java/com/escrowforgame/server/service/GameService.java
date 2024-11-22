package com.escrowforgame.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.escrowforgame.server.dto.GameAssetDTO;
import com.escrowforgame.server.dto.GameDTO;
import com.escrowforgame.server.repository.GameRepository;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;

    public List<GameDTO> getAllGames() {
        List<GameDTO> gameDTOs = new ArrayList<>();
        gameRepository.findAll().forEach(game -> {
            GameDTO gameDTO = GameDTO.builder()
                    .id(game.getId())
                    .name(game.getName())
                    .assets(game.getGameAssets().stream().map(gameAsset -> {
                        return GameAssetDTO.builder()
                                .type(gameAsset.getAssetType())
                                .unit(gameAsset.getAssetUnit())
                                .build();
                    }).collect(Collectors.toList())).build();
            gameDTOs.add(gameDTO);
        });
        return gameDTOs;
    }
}
