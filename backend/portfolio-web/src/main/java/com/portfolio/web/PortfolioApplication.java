package com.portfolio.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Portfolio Modular Monolith Entrypoint.
 * Scans all domain modules (common, contact, analytics, auth) using Spring component scan,
 * JPA repository detection, and entity mapping.
 */
@SpringBootApplication(scanBasePackages = "com.portfolio")
@EntityScan(basePackages = "com.portfolio")
@EnableJpaRepositories(basePackages = "com.portfolio")
public class PortfolioApplication {

    private static final Logger log = LoggerFactory.getLogger(PortfolioApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(PortfolioApplication.class, args);
        log.info("=================================================================");
        log.info("Portfolio Modular Monolith initialized and ready for requests!");
        log.info("Architecture: Modular Monolith (common, contact, analytics, auth, web)");
        log.info("Database: SQLite via Spring Data JPA");
        log.info("Security: Session-based HttpOnly cookie protection for /api/v1/admin/**");
        log.info("=================================================================");
    }
}
