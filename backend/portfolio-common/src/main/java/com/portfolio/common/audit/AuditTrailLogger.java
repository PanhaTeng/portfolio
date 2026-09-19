package com.portfolio.common.audit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.Instant;

/**
 * Lightweight enterprise audit trail logger.
 * Captures critical business actions (submissions, logins, status updates) with temporal
 * and actor context formatted for structured log ingestion.
 */
@Component
public class AuditTrailLogger {

    private static final Logger auditLog = LoggerFactory.getLogger("AUDIT_TRAIL");

    public void logAction(String actor, String action, String resource, String details) {
        auditLog.info("[AUDIT] timestamp={} | actor={} | action={} | resource={} | details={}",
                Instant.now(),
                actor != null ? actor : "ANONYMOUS",
                action,
                resource,
                details != null ? details : "N/A");
    }

    public void logSecurityEvent(String actor, String eventType, String clientIp, boolean success) {
        auditLog.info("[SECURITY_AUDIT] timestamp={} | actor={} | event={} | ip={} | outcome={}",
                Instant.now(),
                actor != null ? actor : "UNKNOWN",
                eventType,
                clientIp != null ? clientIp : "UNKNOWN",
                success ? "SUCCESS" : "FAILURE");
    }
}
