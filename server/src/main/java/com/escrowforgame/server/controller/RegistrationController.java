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

import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;

@Slf4j
@RestController
@RequestMapping("/api")
public class RegistrationController {
    
    @Autowired
    private RegistrationService userService;

    @PostMapping(path="/register")
    public ResponseEntity<String> createUser(@RequestBody User user){
        log.info("in registration controller. to create {}",user.getUsername());
        try{
            userService.createNewUser(user);
            log.info("{} created",user.getUsername());
        }
        catch (UserAlreadyExistsException e){
            log.info("failed to create new user as {} already exists",user.getUsername());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("user already exists");
        }
        catch (DynamoDbException ddb){
            log.error("error with dynamodb",ddb.getMessage(),ddb);
        }
        catch (Exception e){
            log.error("exception", e.getMessage(), e);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("user created");
    }
}
