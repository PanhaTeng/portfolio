package com.portfolio.auth.controller;

import com.portfolio.auth.dto.AuthStatusDto;
import com.portfolio.auth.dto.LoginRequestDto;
import com.portfolio.auth.service.AuthService;
import com.portfolio.common.dto.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthStatusDto>> login(
            @Valid @RequestBody LoginRequestDto request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {

        AuthStatusDto status = authService.login(request, httpRequest, httpResponse);
        return ResponseEntity.ok(ApiResponse.success(status, "Authentication successful"));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {

        authService.logout(httpRequest, httpResponse);
        return ResponseEntity.ok(ApiResponse.success(null, "Logged out successfully"));
    }

    @GetMapping("/check")
    public ResponseEntity<ApiResponse<AuthStatusDto>> checkSession(HttpServletRequest httpRequest) {
        AuthStatusDto status = authService.checkSession(httpRequest);
        return ResponseEntity.ok(ApiResponse.success(status, "Session status checked"));
    }
}
