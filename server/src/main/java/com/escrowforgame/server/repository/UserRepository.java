package com.escrowforgame.server.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.escrowforgame.server.entity.User;

@Repository
public interface UserRepository extends CrudRepository<User,String>{
    boolean existsByUsername(String username);
    Optional<User> findByUsername(String username);
}
