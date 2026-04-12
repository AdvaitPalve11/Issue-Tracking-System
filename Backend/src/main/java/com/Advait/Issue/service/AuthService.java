package com.Advait.Issue.service;

import com.Advait.Issue.dto.RegisterRequest;
import com.Advait.Issue.model.User;

public interface AuthService {
    User register(RegisterRequest request);
}