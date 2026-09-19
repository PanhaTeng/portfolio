package com.portfolio.analytics.controller;

import com.portfolio.analytics.dto.PageViewRequestDto;
import com.portfolio.analytics.service.AnalyticsService;
import com.portfolio.common.dto.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @PostMapping("/track")
    public ResponseEntity<ApiResponse<Void>> trackPageView(
            @Valid @RequestBody PageViewRequestDto request,
            HttpServletRequest httpRequest) {

        String clientIp = extractClientIp(httpRequest);
        String userAgent = httpRequest.getHeader("User-Agent");

        analyticsService.recordPageView(request, clientIp, userAgent);
        return ResponseEntity.ok(ApiResponse.success(null, "Page view telemetry recorded"));
    }

    private String extractClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
