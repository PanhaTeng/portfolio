package com.portfolio.analytics.service;

import com.portfolio.analytics.dto.AnalyticsSummaryDto;
import com.portfolio.analytics.dto.PageViewRequestDto;

/**
 * Public service contract for visitor telemetry and analytics.
 */
public interface AnalyticsService {

    void recordPageView(PageViewRequestDto request, String clientIp, String userAgent);

    AnalyticsSummaryDto getAnalyticsSummary();
}
