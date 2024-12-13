package com.escrowforgame.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.escrowforgame.server.dto.GameDTO;
import com.escrowforgame.server.service.GameService;

@RestController
@RequestMapping("/api")
public class GameController {

    @Autowired
    private GameService gameService;
    
    @GetMapping(value="/games")
    public List<GameDTO> getGames(){
        System.out.println("in game controller");
        List<GameDTO> gameDTOs =  gameService.getAllGames();
        return gameDTOs;
    }
}
