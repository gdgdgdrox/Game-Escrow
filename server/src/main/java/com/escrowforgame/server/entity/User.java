package com.escrowforgame.server.entity;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User implements UserDetails{
    @Id
    private String username;

    @Column(name="first_name", nullable=true)
    private String firstName;

    @Column(name="last_name", nullable=false)
    private String lastName;

    @Column(name="password", nullable=false)
    private String password;

    @Column(name="email", nullable=false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name="sex", nullable=false)
    private Sex sex;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;

    }
}
