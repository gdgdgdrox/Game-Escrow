package com.escrowforgame.server.interceptor;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import com.escrowforgame.server.service.CustomUserDetailsService;
import com.escrowforgame.server.service.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class WebSocketJwtInterceptor implements HandshakeInterceptor {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
            Map<String, Object> attributes) throws Exception {
                log.debug("before handshake");
                if (request instanceof ServletServerHttpRequest) {
                    HttpServletRequest servletRequest = ((ServletServerHttpRequest) request).getServletRequest();
                    String token = servletRequest.getParameter("token");
                    if (token == null || token.isEmpty()) {
                        log.error("jwt is missing or empty");
                        return false; // Reject the handshake if no token is provided
                    }
                    
                    try {
                        String username = jwtService.extractUsername(token);
                        if (username != null) {
                            log.debug("fetching user details for username: {}",username);
                            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
                        
                            if (jwtService.isTokenValid(token, userDetails)) {
                                log.debug("jwt is valid. toring authenticated user info in attributes.");
                                attributes.put("username", username); // Store authenticated user info in attributes
                                return true; // Allow handshake
                            } else {
                                log.debug("jwt is invalid. rejecting handshake.");
                                return false;
                            }
                        } else if (SecurityContextHolder.getContext().getAuthentication() != null) {
                            log.debug("authentication already exists. proceeding with handshake.");
                            return true; // Allow handshake for authenticated users
                        } else {
                            log.debug("username is null and no authentication exists. ejecting handshake.");
                            return false; 
                        }
                    } catch (Exception e) {
                        log.error("error with jwt validation for websocket connection",e.getMessage(),e);
                    }}
                    return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
            Exception exception) {
        // no op
    }

}
