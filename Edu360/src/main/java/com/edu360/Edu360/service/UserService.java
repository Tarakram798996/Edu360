package com.edu360.Edu360.service;

import com.edu360.Edu360.model.User;
import com.edu360.Edu360.repos.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;


    @Transactional
    public void delete(User user) {
        userRepo.delete(user);
    }

    public void save(User user) {
        userRepo.save(user);
    }

    public boolean isEmailPresent(String email) {
        return userRepo.findByEmail(email).isPresent();
    }

    public User findByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }



}
