package com.portfolio.web;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("dev")
class PortfolioApplicationTests {

    @Test
    void contextLoads() {
        // Confirms that all domain modules, beans, repositories, and security filter chains wire cleanly.
    }
}
