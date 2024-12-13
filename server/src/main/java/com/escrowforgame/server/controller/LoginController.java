package com.escrowforgame.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.escrowforgame.server.service.JwtService;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private JwtService jwtService;
    
    @PostMapping(value="/login")
    public ResponseEntity<String> login(@RequestBody Map<String,String> requestBody){
        System.out.println("In login controller");
        String username = requestBody.get("username");
        String password = requestBody.get("password");
        System.out.println("User = " + username + " Password = " + password);

        if (username != null && password != null){
            try{
                Authentication authentication = authenticationProvider.authenticate(new UsernamePasswordAuthenticationToken(username, password, null));
                if (authentication.isAuthenticated()){
                    System.out.println("is authenticated");
                    String jwt = jwtService.generateJwt(username);
                    return ResponseEntity.ok().body(jwt);
                }
            }
            catch (AuthenticationException ae){
                System.out.println("authentication failed");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("authentication failed");
            }
        }
        else{
            System.out.println("missing username/password");
            return ResponseEntity.badRequest().body("missing username/password");
        }
        return null;
    }
}
