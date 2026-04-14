package com.Advait.Issue.service;

import com.Advait.Issue.dto.AuthResponse;
import com.Advait.Issue.dto.LoginRequest;
import com.Advait.Issue.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}