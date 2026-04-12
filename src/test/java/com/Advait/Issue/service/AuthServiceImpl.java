package com.Advait.Issue.service;

import com.issuetracker.dto.RegisterRequest;
import com.issuetracker.model.Role;
import com.issuetracker.model.User;
import com.issuetracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    @Override
    public User register(RegisterRequest request) {

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword()) // we'll hash later
                .role(Role.MEMBER)
                .build();

        return userRepository.save(user);
    }
}