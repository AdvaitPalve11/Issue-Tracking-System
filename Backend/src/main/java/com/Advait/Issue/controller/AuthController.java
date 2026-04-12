package com.Advait.Issue.controller;

import com.Advait.Issue.dto.RegisterRequest;
import com.Advait.Issue.model.User;
import com.Advait.Issue.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }
}