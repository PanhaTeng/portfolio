package com.portfolio.analytics.dto;

import java.time.Instant;
import java.util.List;
import java.util.Map;

public class AnalyticsSummaryDto {

    private long totalPageViews;
    private long uniqueVisitors;
    private Map<String, Long> pageViewsByRoute;
    private List<RecentVisitDto> recentVisits;

    public AnalyticsSummaryDto() {
    }

    public AnalyticsSummaryDto(long totalPageViews, long uniqueVisitors, Map<String, Long> pageViewsByRoute, List<RecentVisitDto> recentVisits) {
        this.totalPageViews = totalPageViews;
        this.uniqueVisitors = uniqueVisitors;
        this.pageViewsByRoute = pageViewsByRoute;
        this.recentVisits = recentVisits;
    }

    public long getTotalPageViews() {
        return totalPageViews;
    }

    public void setTotalPageViews(long totalPageViews) {
        this.totalPageViews = totalPageViews;
    }

    public long getUniqueVisitors() {
        return uniqueVisitors;
    }

    public void setUniqueVisitors(long uniqueVisitors) {
        this.uniqueVisitors = uniqueVisitors;
    }

    public Map<String, Long> getPageViewsByRoute() {
        return pageViewsByRoute;
    }

    public void setPageViewsByRoute(Map<String, Long> pageViewsByRoute) {
        this.pageViewsByRoute = pageViewsByRoute;
    }

    public List<RecentVisitDto> getRecentVisits() {
        return recentVisits;
    }

    public void setRecentVisits(List<RecentVisitDto> recentVisits) {
        this.recentVisits = recentVisits;
    }

    public static class RecentVisitDto {
        private String pagePath;
        private String referrer;
        private Instant visitedAt;

        public RecentVisitDto() {
        }

        public RecentVisitDto(String pagePath, String referrer, Instant visitedAt) {
            this.pagePath = pagePath;
            this.referrer = referrer;
            this.visitedAt = visitedAt;
        }

        public String getPagePath() {
            return pagePath;
        }

        public void setPagePath(String pagePath) {
            this.pagePath = pagePath;
        }

        public String getReferrer() {
            return referrer;
        }

        public void setReferrer(String referrer) {
            this.referrer = referrer;
        }

        public Instant getVisitedAt() {
            return visitedAt;
        }

        public void setVisitedAt(Instant visitedAt) {
            this.visitedAt = visitedAt;
        }
    }
}
