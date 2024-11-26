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

@Component
public class WebSocketJwtInterceptor implements HandshakeInterceptor {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
            Map<String, Object> attributes) throws Exception {
                System.out.println("in beforehandshake");
                if (request instanceof ServletServerHttpRequest) {
                    HttpServletRequest servletRequest = ((ServletServerHttpRequest) request).getServletRequest();
                    String token = servletRequest.getParameter("token"); // Extract token from query parameter
                    if (token == null || token.isEmpty()) {
                        System.out.println("Token is missing or empty.");
                        return false; // Reject the handshake if no token is provided
                    }
                    
                    try {
                        String username = jwtService.extractUsername(token);
                        System.out.println("username is " + username);
                        if (username != null) {
                            System.out.println("Fetching user details for username: " + username);
                            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
                        
                            if (jwtService.isTokenValid(token, userDetails)) {
                                System.out.println("Token is valid. Storing authenticated user info in attributes.");
                                attributes.put("username", username); // Store authenticated user info in attributes
                                return true; // Allow handshake
                            } else {
                                System.out.println("Token is invalid. Rejecting handshake.");
                                return false; // Reject handshake
                            }
                        } else if (SecurityContextHolder.getContext().getAuthentication() != null) {
                            System.out.println("Authentication already exists. Proceeding with handshake.");
                            return true; // Allow handshake for authenticated users
                        } else {
                            System.out.println("Username is null and no authentication exists. Rejecting handshake.");
                            return false; // Reject handshake
                        }
                    } catch (Exception e) {
                        System.err.println("Error during token validation: " + e.getMessage());
                        e.printStackTrace();
                    }}
                    return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
            Exception exception) {
        // no op
    }

}
