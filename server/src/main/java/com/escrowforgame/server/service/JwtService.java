package com.escrowforgame.server.service;

import java.sql.Date;
import java.time.Instant;
import java.util.Base64;
import java.util.concurrent.TimeUnit;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.escrowforgame.server.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${jwt.secret.key}")
    private String secretKey;

    @Value("${jwt.validity}")
    private String validity;

    public void generateSecretKey() {
        SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        String encodedSecretKey = Base64.getEncoder().encodeToString(secretKey.getEncoded());
        System.out.println(encodedSecretKey);
    }

    public SecretKey decodeSecretKey() {
        byte[] decodedKey = Base64.getDecoder().decode(secretKey);
        return Keys.hmacShaKeyFor(decodedKey);
    }

    public String generateJwt(String username){
        return Jwts.builder()
        .setSubject(username)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(Integer.valueOf(validity))))
        .signWith(decodeSecretKey())
        .compact();
    }

    public Claims extractClaims(String jwt){
        return Jwts.parserBuilder().setSigningKey(decodeSecretKey()).build().parseClaimsJws(jwt).getBody();
    }

    public String extractUsername(String jwt){
        return extractClaims(jwt).getSubject();
    }

    public boolean isTokenValid(String jwt, UserDetails userDetails) {
        Claims claims = extractClaims(jwt);
        return (claims.getSubject().equals(userDetails.getUsername()) && claims.getExpiration().after(Date.from(Instant.now())
        ));
    }
}
