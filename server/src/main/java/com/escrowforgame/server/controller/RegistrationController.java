package com.escrowforgame.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.escrowforgame.server.entity.User;
import com.escrowforgame.server.exception.UserAlreadyExistsException;
import com.escrowforgame.server.service.RegistrationService;

@RestController
@RequestMapping("/api")
public class RegistrationController {
    
    @Autowired
    private RegistrationService userService;

    @PostMapping(path="/register")
    public ResponseEntity<String> createUser(@RequestBody User user){
        System.out.println("In create user controller");
        System.out.println("Received user: " + user.toString());
        try{
            userService.createNewUser(user);
        }
        catch (UserAlreadyExistsException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("user already exists");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("user created");
    }
}
