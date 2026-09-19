package com.portfolio.auth.config;

import com.portfolio.auth.entity.AdminUser;
import com.portfolio.auth.repository.AdminUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Enterprise database initializer.
 * Automatically seeds the singleton administrator account if not present in SQLite,
 * encrypting credentials using salted BCrypt.
 */
@Component
public class AdminUserInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminUserInitializer.class);

    private final AdminUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${portfolio.admin.username:admin}")
    private String adminUsername;

    @Value("${portfolio.admin.password:Admin123!@#}")
    private String adminPassword;

    public AdminUserInitializer(AdminUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (!userRepository.existsByUsername(adminUsername)) {
            log.info("No admin user found. Provisioning root admin credential for: {}", adminUsername);
            String encodedPassword = passwordEncoder.encode(adminPassword);
            AdminUser admin = new AdminUser(adminUsername, encodedPassword, "ADMIN");
            userRepository.save(admin);
            log.info("Admin user successfully initialized with username: {}", adminUsername);
        } else {
            log.info("Admin user already provisioned: {}", adminUsername);
        }
    }
}
