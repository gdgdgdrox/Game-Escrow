package com.escrowforgame.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.escrowforgame.exception.UserAlreadyExistsException;
import com.escrowforgame.server.entity.User;
import com.escrowforgame.server.repository.UserRepository;

@Service
public class RegistrationService {
    @Autowired
    private UserRepository userRepository;

    public void saveUser(User user) throws UserAlreadyExistsException {
        if (userRepository.existsByUsername(user.getUsername())){
            throw new UserAlreadyExistsException();
        }
        this.userRepository.save(user);
    }
}
