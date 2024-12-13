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

import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private JwtService jwtService;
    
    @PostMapping(value="/login")
    public ResponseEntity<String> login(@RequestBody Map<String,String> requestBody){
        log.info("in login controller");
        String username = requestBody.get("username");
        String password = requestBody.get("password");

        if (username != null && password != null){
            try{
                Authentication authentication = authenticationProvider.authenticate(new UsernamePasswordAuthenticationToken(username, password, null));
                if (authentication.isAuthenticated()){
                    log.debug("authentication success");
                    String jwt = jwtService.generateJwt(username);
                    return ResponseEntity.ok().body(jwt);
                }
            }
            catch (AuthenticationException ae){
                log.debug("authentication failed. exception message = {}",ae.getMessage());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("authentication failed");
            }
        }
        else{
            log.debug("login failed because username or password is missing");
            return ResponseEntity.badRequest().body("missing username/password");
        }
        return null;
    }
}
