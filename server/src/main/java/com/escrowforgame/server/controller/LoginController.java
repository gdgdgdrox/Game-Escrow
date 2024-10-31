package com.escrowforgame.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {
    
    @PostMapping(value="/login")
    public ResponseEntity<String> login(@RequestBody Map<String,String> requestBody){
        System.out.println("In login controller");
        System.out.println("User = " + requestBody.get("username") + " Password = " + requestBody.get("password"));

        return null;
    }
}
