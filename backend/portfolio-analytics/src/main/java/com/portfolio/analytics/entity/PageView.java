package com.portfolio.analytics.entity;

import com.portfolio.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "analytics_page_views")
public class PageView extends BaseEntity {

    @Column(name = "page_path", nullable = false, length = 200)
    private String pagePath;

    @Column(name = "referrer", length = 500)
    private String referrer;

    @Column(name = "user_agent", length = 300)
    private String userAgent;

    @Column(name = "ip_hash", length = 64)
    private String ipHash;

    @Column(name = "visited_at", nullable = false)
    private Instant visitedAt;

    public PageView() {
    }

    public PageView(String pagePath, String referrer, String userAgent, String ipHash) {
        this.pagePath = pagePath;
        this.referrer = referrer;
        this.userAgent = userAgent;
        this.ipHash = ipHash;
        this.visitedAt = Instant.now();
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

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public String getIpHash() {
        return ipHash;
    }

    public void setIpHash(String ipHash) {
        this.ipHash = ipHash;
    }

    public Instant getVisitedAt() {
        return visitedAt;
    }

    public void setVisitedAt(Instant visitedAt) {
        this.visitedAt = visitedAt;
    }
}
