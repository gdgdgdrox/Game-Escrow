package com.escrowforgame.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.escrowforgame.server.entity.User;
import com.escrowforgame.server.exception.UserAlreadyExistsException;
import com.escrowforgame.server.repository.UserRepository;

@Service
public class RegistrationService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void createNewUser(User user) throws UserAlreadyExistsException {
        if (userRepository.existsByUsername(user.getUsername())){
            throw new UserAlreadyExistsException();
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        this.userRepository.save(user);
    }
}
