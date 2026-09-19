package com.portfolio.analytics.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class PageViewRequestDto {

    @NotBlank(message = "Page path cannot be blank")
    @Size(max = 200, message = "Page path cannot exceed 200 characters")
    private String pagePath;

    @Size(max = 500, message = "Referrer URL cannot exceed 500 characters")
    private String referrer;

    public PageViewRequestDto() {
    }

    public PageViewRequestDto(String pagePath, String referrer) {
        this.pagePath = pagePath;
        this.referrer = referrer;
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
}
