package com.Advait.Issue.controller;

import com.Advait.Issue.dto.AuthResponse;
import com.Advait.Issue.dto.LoginRequest;
import com.Advait.Issue.dto.RegisterRequest;
import com.Advait.Issue.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/health")
    public String health() {
        return "UP";
    }
}