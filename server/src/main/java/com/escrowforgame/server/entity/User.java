package com.escrowforgame.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User {
    @Id
    private String username;

    @Column(name="password", nullable=false)
    private String password;

    @Column(name="email", nullable=false)
    private String email;

    @Column(name="sex", nullable=false)
    private Sex sex;
}
