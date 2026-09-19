package com.portfolio.analytics.service.impl;

import com.portfolio.analytics.dto.AnalyticsSummaryDto;
import com.portfolio.analytics.dto.PageViewRequestDto;
import com.portfolio.analytics.entity.PageView;
import com.portfolio.analytics.repository.PageViewRepository;
import com.portfolio.analytics.service.AnalyticsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class AnalyticsServiceImpl implements AnalyticsService {

    private static final Logger log = LoggerFactory.getLogger(AnalyticsServiceImpl.class);

    private final PageViewRepository repository;

    public AnalyticsServiceImpl(PageViewRepository repository) {
        this.repository = repository;
    }

    @Override
    public void recordPageView(PageViewRequestDto request, String clientIp, String userAgent) {
        try {
            String ipHash = hashIp(clientIp);
            PageView pageView = new PageView(
                    request.getPagePath() != null ? request.getPagePath() : "/",
                    request.getReferrer(),
                    userAgent,
                    ipHash
            );
            repository.save(pageView);
            log.debug("Recorded page view for route: {}", request.getPagePath());
        } catch (Exception e) {
            log.warn("Failed to record page view telemetry: {}", e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public AnalyticsSummaryDto getAnalyticsSummary() {
        long totalViews = repository.count();
        long uniqueVisitors = repository.countDistinctVisitors();

        List<Object[]> groupedPages = repository.findViewsGroupedByPage();
        Map<String, Long> pageCounts = new LinkedHashMap<>();
        for (Object[] row : groupedPages) {
            String path = (String) row[0];
            Long count = ((Number) row[1]).longValue();
            pageCounts.put(path, count);
        }

        List<AnalyticsSummaryDto.RecentVisitDto> recentVisits = repository.findTop50ByOrderByVisitedAtDesc()
                .stream()
                .map(pv -> new AnalyticsSummaryDto.RecentVisitDto(pv.getPagePath(), pv.getReferrer(), pv.getVisitedAt()))
                .collect(Collectors.toList());

        return new AnalyticsSummaryDto(totalViews, uniqueVisitors, pageCounts, recentVisits);
    }

    private String hashIp(String ip) {
        if (ip == null || ip.isBlank()) {
            return "unknown";
        }
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(ip.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString().substring(0, 16);
        } catch (NoSuchAlgorithmException e) {
            return String.valueOf(ip.hashCode());
        }
    }
}
