package com.portfolio.auth.service.impl;

import com.portfolio.auth.dto.AuthStatusDto;
import com.portfolio.auth.dto.LoginRequestDto;
import com.portfolio.auth.entity.AdminUser;
import com.portfolio.auth.repository.AdminUserRepository;
import com.portfolio.auth.service.AuthService;
import com.portfolio.common.audit.AuditTrailLogger;
import com.portfolio.common.exception.UnauthorizedException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthServiceImpl.class);

    private final AdminUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuditTrailLogger auditTrailLogger;
    private final SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();

    public AuthServiceImpl(AdminUserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           AuditTrailLogger auditTrailLogger) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.auditTrailLogger = auditTrailLogger;
    }

    @Override
    public AuthStatusDto login(LoginRequestDto request, HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        String username = request.getUsername().trim();
        String clientIp = extractClientIp(httpRequest);

        log.info("Attempting admin login for username: {} from IP: {}", username, clientIp);

        AdminUser user = userRepository.findByUsername(username)
                .filter(AdminUser::isActive)
                .orElse(null);

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            auditTrailLogger.logSecurityEvent(username, "LOGIN_FAILED", clientIp, false);
            throw new UnauthorizedException("Invalid username or password");
        }

        // Establish Spring Security Context
        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
        Authentication auth = new UsernamePasswordAuthenticationToken(user.getUsername(), null, authorities);

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(auth);
        SecurityContextHolder.setContext(context);

        // Store context in HTTP session for cookie-based session persistence
        securityContextRepository.saveContext(context, httpRequest, httpResponse);

        auditTrailLogger.logSecurityEvent(username, "LOGIN_SUCCESS", clientIp, true);
        return AuthStatusDto.authenticated(user.getUsername(), user.getRole());
    }

    @Override
    public void logout(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = (auth != null) ? auth.getName() : "ANONYMOUS";
        String clientIp = extractClientIp(httpRequest);

        SecurityContextHolder.clearContext();

        HttpSession session = httpRequest.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        auditTrailLogger.logSecurityEvent(username, "LOGOUT", clientIp, true);
    }

    @Override
    @Transactional(readOnly = true)
    public AuthStatusDto checkSession(HttpServletRequest httpRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getName())) {
            String username = auth.getName();
            String role = auth.getAuthorities().stream()
                    .map(a -> a.getAuthority().replace("ROLE_", ""))
                    .findFirst()
                    .orElse("ADMIN");
            return AuthStatusDto.authenticated(username, role);
        }

        return AuthStatusDto.unauthenticated();
    }

    private String extractClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
