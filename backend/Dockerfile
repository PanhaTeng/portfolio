# ==============================================================================
# Enterprise Multi-Stage Dockerfile for Spring Boot 3.x Modular Monolith
# Stage 1: Build & Package with Maven
# Stage 2: Minimal Distroless / Temurin JRE Runtime with SQLite Persistent Volume
# ==============================================================================

# Stage 1: Build container
FROM maven:3.9.9-eclipse-temurin-17-alpine AS builder

WORKDIR /build

# Copy Maven parent & sub-module POMs first for optimal dependency layer caching
COPY pom.xml .
COPY portfolio-common/pom.xml portfolio-common/
COPY portfolio-contact/pom.xml portfolio-contact/
COPY portfolio-analytics/pom.xml portfolio-analytics/
COPY portfolio-auth/pom.xml portfolio-auth/
COPY portfolio-web/pom.xml portfolio-web/

# Download dependencies offline
RUN mvn dependency:go-offline -B

# Copy all source code modules
COPY portfolio-common/src portfolio-common/src
COPY portfolio-contact/src portfolio-contact/src
COPY portfolio-analytics/src portfolio-analytics/src
COPY portfolio-auth/src portfolio-auth/src
COPY portfolio-web/src portfolio-web/src

# Build production artifacts (skip tests in docker build for speed; run separately in CI)
RUN mvn clean package -DskipTests -B

# Stage 2: Production JRE Runtime
FROM eclipse-temurin:17-jre-alpine

# Install curl for container health check
RUN apk --no-cache add curl tzdata

# Create dedicated non-privileged user and persistent directory for SQLite database
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Ensure SQLite storage directory exists with proper permissions
RUN mkdir -p /data && chown -R appuser:appgroup /data /app

# Persistent volume mount point for SQLite database file
VOLUME ["/data"]

# Copy compiled executable JAR from builder stage
COPY --from=builder /build/portfolio-web/target/portfolio-web-1.0.0-SNAPSHOT.jar /app/app.jar

# Switch to unprivileged user for security compliance
USER appuser:appgroup

# Expose HTTP port (Render/Fly.io inject PORT environment variable)
ENV PORT=8080
ENV SQLITE_DB_PATH=/data/portfolio.db
ENV SPRING_PROFILES_ACTIVE=prod

EXPOSE 8080

# Health check probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:${PORT}/actuator/health || exit 1

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/app.jar"]
