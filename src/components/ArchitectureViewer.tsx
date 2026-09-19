import React, { useState } from 'react';
import { Layers, FileCode, CheckCircle, Shield, Database, Server, Terminal, Copy } from 'lucide-react';

const ARCH_FILES: Record<string, { title: string; module: string; desc: string; code: string; language: string }> = {
  'pom.xml': {
    title: 'Root Maven BOM / POM',
    module: 'backend',
    desc: 'Aggregates all 5 submodules with centralized dependency versions for Spring Boot 3.3.3 and Java 17.',
    language: 'xml',
    code: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" ...>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.panhateng.portfolio</groupId>
    <artifactId>portfolio-parent</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>pom</packaging>

    <modules>
        <module>portfolio-common</module>
        <module>portfolio-contact</module>
        <module>portfolio-analytics</module>
        <module>portfolio-auth</module>
        <module>portfolio-web</module>
    </modules>

    <properties>
        <java.version>17</java.version>
        <spring.boot.version>3.3.3</spring.boot.version>
        <sqlite.version>3.46.1.0</sqlite.version>
        <hibernate.community.dialect.version>6.5.2.Final</hibernate.community.dialect.version>
    </properties>
</project>`
  },
  'SecurityConfig.java': {
    title: 'Spring Security 6 Configuration',
    module: 'portfolio-auth',
    desc: 'Configures HttpOnly session cookies, CORS whitelist, BCrypt password hashing, and role-based protection on /api/v1/admin/**',
    language: 'java',
    code: `@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, 
            AuthenticationManager authManager) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable()) // Stateless session-cookie architecture
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .maximumSessions(2)
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .anyRequest().permitAll()
            );

        return http.build();
    }
}`
  },
  'ContactService.java': {
    title: 'Contact Domain Contract (Interface)',
    module: 'portfolio-contact',
    desc: 'Encapsulates contact domain behavior. Other modules only communicate across this public contract.',
    language: 'java',
    code: `public interface ContactService {

    ContactMessageResponse submitMessage(ContactRequest request, String clientIp);

    List<ContactMessageResponse> getAllMessages();

    ContactMessageResponse markAsRead(Long id);

    void deleteMessage(Long id);
}`
  },
  'AnalyticsServiceImpl.java': {
    title: 'Telemetry Ingestion & IP Anonymizer',
    module: 'portfolio-analytics',
    desc: 'Uses SHA-256 with salt to anonymize visitor IPs while calculating distinct unique visitors for compliance.',
    language: 'java',
    code: `@Service
public class AnalyticsServiceImpl implements AnalyticsService {
    private final PageViewRepository pageViewRepository;
    private final AuditTrailLogger auditLogger;

    @Override
    @Transactional
    public void trackPageView(PageViewRequest request, String clientIp) {
        String hashedIp = hashIp(clientIp);
        PageView entity = PageView.builder()
            .pagePath(request.getPagePath())
            .referrer(request.getReferrer())
            .hashedIp(hashedIp)
            .build();

        pageViewRepository.save(entity);
    }
}`
  },
  'Dockerfile': {
    title: 'Multi-Stage Production Dockerfile',
    module: 'backend',
    desc: 'Builds a slim Temurin 17 JRE image, attaches persistent /data volume for SQLite, and non-root execution.',
    language: 'dockerfile',
    code: `FROM maven:3.9.8-eclipse-temurin-17-alpine AS builder
WORKDIR /build
COPY pom.xml .
COPY portfolio-common/pom.xml portfolio-common/
...
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
VOLUME /data
ENV SQLITE_DB_PATH=/data/portfolio.db
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`
  },
  'deploy-frontend.yml': {
    title: 'GitHub Actions Workflow',
    module: '.github/workflows',
    desc: 'Automates building Angular and deploying to GitHub Pages with SPA 404.html fallback routing.',
    language: 'yaml',
    code: `name: Deploy Angular Frontend to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
        working-directory: frontend
      - run: npx ng build --configuration production
        working-directory: frontend
      - run: cp frontend/dist/frontend/browser/index.html frontend/dist/frontend/browser/404.html
      - uses: actions/deploy-pages@v4`
  }
};

export const ArchitectureViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('pom.xml');
  const [copied, setCopied] = useState<boolean>(false);

  const fileData = ARCH_FILES[selectedFile];

  const handleCopy = () => {
    navigator.clipboard.writeText(fileData.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8">
      {/* Title */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 mb-1">
          <Layers className="w-4 h-4" />
          <span>BANKING-GRADE MODULAR MONOLITH SPECIFICATION</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Architecture Boundaries &amp; Production Source Code
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-2xl">
          Inspect how the 5 Spring Boot Maven modules and Angular standalone components communicate across rigid public interface contracts.
        </p>
      </div>

      {/* Module Overview Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <span className="text-xs font-mono font-bold text-blue-600 block mb-1">01. common</span>
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block">Shared Contracts</span>
          <p className="text-[11px] text-neutral-500 mt-1 leading-normal">
            ApiResponse&lt;T&gt;, BaseEntity, GlobalExceptionHandler, AuditTrailLogger.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <span className="text-xs font-mono font-bold text-emerald-600 block mb-1">02. contact</span>
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block">Inquiries Domain</span>
          <p className="text-[11px] text-neutral-500 mt-1 leading-normal">
            ContactService interface, SQLite JPA Entity, REST endpoints.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <span className="text-xs font-mono font-bold text-purple-600 block mb-1">03. analytics</span>
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block">Visitor Telemetry</span>
          <p className="text-[11px] text-neutral-500 mt-1 leading-normal">
            SHA-256 IP hashing, pageview counters, route aggregations.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <span className="text-xs font-mono font-bold text-amber-600 block mb-1">04. auth</span>
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block">Session Security</span>
          <p className="text-[11px] text-neutral-500 mt-1 leading-normal">
            Spring Security 6, HttpOnly cookie, BCrypt admin seeder.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <span className="text-xs font-mono font-bold text-rose-600 block mb-1">05. web</span>
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block">Bootstrap &amp; Config</span>
          <p className="text-[11px] text-neutral-500 mt-1 leading-normal">
            Main Application runner, Dockerfile, SQLite JPA dialect.
          </p>
        </div>
      </div>

      {/* File Explorer & Code Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: File List */}
        <div className="lg:col-span-4 bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-1">
          <span className="text-xs font-mono text-neutral-400 font-semibold px-2 mb-2 block uppercase tracking-wider">
            Key Architecture Artifacts
          </span>

          {Object.entries(ARCH_FILES).map(([filename, data]) => (
            <button
              key={filename}
              onClick={() => setSelectedFile(filename)}
              className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex flex-col ${
                selectedFile === filename
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
              }`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold">{filename}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 font-mono">
                  {data.module}
                </span>
              </div>
              <span className="text-[11px] text-neutral-500 mt-1">{data.title}</span>
            </button>
          ))}
        </div>

        {/* Right: Code Display */}
        <div className="lg:col-span-8 bg-neutral-900 text-neutral-100 rounded-2xl border border-neutral-800 shadow-md overflow-hidden">
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
            <div>
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-xs font-bold text-neutral-200">
                  {selectedFile}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">{fileData.desc}</p>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors">
              {copied ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-5 font-mono text-xs overflow-x-auto leading-relaxed text-neutral-300 bg-neutral-900 max-h-[500px]">
            <code>{fileData.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
