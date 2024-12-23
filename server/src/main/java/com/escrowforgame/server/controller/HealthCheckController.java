package com.escrowforgame.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthCheckController {
    
    @GetMapping(value="/healthcheck")
    public ResponseEntity<Void> healthCheck(){
        return ResponseEntity.ok().build();
    }
}
