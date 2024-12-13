package com.escrowforgame.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.escrowforgame.server.dto.GameDTO;
import com.escrowforgame.server.service.GameService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class GameController {

    @Autowired
    private GameService gameService;
    
    @GetMapping(value="/games")
    public List<GameDTO> getGames(){
        log.info("in game controller");
        List<GameDTO> gameDTOs =  gameService.getAllGames();
        log.debug("number of games: {}",gameDTOs.size());
        return gameDTOs;
    }
}
