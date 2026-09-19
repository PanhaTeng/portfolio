package com.portfolio.auth.service;

import com.portfolio.auth.dto.AuthStatusDto;
import com.portfolio.auth.dto.LoginRequestDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Public service contract for authentication and session management.
 */
public interface AuthService {

    AuthStatusDto login(LoginRequestDto request, HttpServletRequest httpRequest, HttpServletResponse httpResponse);

    void logout(HttpServletRequest httpRequest, HttpServletResponse httpResponse);

    AuthStatusDto checkSession(HttpServletRequest httpRequest);
}
