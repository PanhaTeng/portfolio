# Modular Enterprise Portfolio & Admin Portal

> A production-ready, enterprise-grade personal portfolio platform engineered with an **Angular standalone frontend**, a **Spring Boot 3.x Modular Monolith backend**, **SQLite embedded persistence**, and **Spring Security session-based authentication**.

---

## 🏛️ Architecture & Domain Module Boundaries

Unlike toy CRUD apps where everything is bundled into a single package, this backend is built as a **Modular Monolith** inspired by enterprise core-banking domain boundaries.

```
backend/
├── pom.xml                        # Parent aggregator POM & dependency management BOM
├── portfolio-common/              # Domain-agnostic contracts, DTO envelopes, audit & errors
│   ├── dto/ApiResponse.java       # Standard enterprise response envelope {success, data, message, timestamp}
│   ├── exception/                 # Centralized @ControllerAdvice & domain exception hierarchy
│   ├── audit/AuditTrailLogger.java# Structured audit logger for compliance & security events
│   └── entity/BaseEntity.java     # MappedSuperclass providing temporal audit timestamps
│
├── portfolio-contact/             # Inbound inquiries & message management domain
│   ├── service/ContactService.java# Public Contract Interface (Dependency Inversion Boundary)
│   ├── service/impl/              # Internal implementation hidden from other modules
│   ├── entity/ContactMessage.java # SQLite JPA Entity for contact inquiries
│   ├── repository/                # Spring Data JPA Repository
│   └── controller/                # Public (POST /contact) and Admin (GET/PATCH/DELETE /admin/contact)
│
├── portfolio-analytics/           # Visitor telemetry & page-view counting domain
│   ├── service/AnalyticsService.java # Public Contract Interface
│   ├── service/impl/              # Internal implementation with SHA-256 IP anonymization
│   ├── entity/PageView.java       # SQLite JPA Entity for page view telemetry
│   ├── repository/                # Query aggregates for unique visitors & route breakdown
│   └── controller/                # Public (POST /analytics/track) and Admin (GET /admin/analytics)
│
├── portfolio-auth/                # Admin identity, session security & RBAC domain
│   ├── config/SecurityConfig.java # Spring Security 6 session filter chain & HttpOnly cookies
│   ├── config/AdminUserInitializer# Startup CommandLineRunner seeding admin with BCrypt
│   ├── service/AuthService.java   # Public Authentication Contract
│   ├── entity/AdminUser.java      # Admin credentials & role entity
│   └── controller/AuthController  # Login, logout, and session check endpoints
│
└── portfolio-web/                 # Main runnable entry point & container deployment wiring
    ├── PortfolioApplication.java  # Spring Boot Application bootstrap
    ├── application.yml            # Profile configuration (dev/prod profiles)
    └── Dockerfile                 # Multi-stage production container with persistent SQLite volume
```

### Why This Architecture?

1. **Dependency Inversion Between Modules**:
   Modules depend exclusively on public interfaces (e.g. `ContactService`, `AnalyticsService`, `AuthService`). Internal entities, repositories, and implementation classes are strictly private to each module. This guarantees that modules can be refactored, unit tested, or extracted into microservices without cascading breaking changes.
2. **Normalized API Response Envelopes**:
   Every endpoint consistently outputs the `ApiResponse<T>` envelope. Client applications never need to guess the structure of error or success payloads:
   ```json
   {
     "success": true,
     "message": "Message marked as read",
     "data": { ... },
     "timestamp": "2026-09-18T23:55:00Z",
     "errorCode": null
   }
   ```
3. **Session-Based Authentication (HttpOnly Cookies)**:
   Instead of error-prone client-side JWT storage in `localStorage` (which is vulnerable to XSS attacks), authentication utilizes a server-managed HTTP session with a secure `JSESSIONID` HttpOnly cookie.
4. **SQLite + Hibernate Community Dialect**:
   SQLite is zero-cost, serverless, and stores the entire database in a single file (`/data/portfolio.db`). With WAL (Write-Ahead Logging) and a persistent disk volume, it handles portfolio traffic effortlessly with zero monthly database hosting expenses.
5. **Lightweight Enterprise Audit Trail**:
   All critical mutations (message submissions, admin logins, status updates) trigger `AuditTrailLogger`, emitting structured temporal logs with actor attribution and IP hashes.

---

## 🚀 Quick Start & Local Development

### Prerequisites
- **Java**: OpenJDK 17 or higher
- **Maven**: 3.9+ (or use `./mvnw`)
- **Node.js**: v18 or v20 LTS
- **Angular CLI**: `npm install -g @angular/cli`

---

### 1. Running the Spring Boot Backend

```bash
cd backend

# Build and package all modules
mvn clean install

# Run the web module with the dev profile
mvn spring-boot:run -pl portfolio-web
```

The backend starts on `http://localhost:8080`.

- **Health Check**: `GET http://localhost:8080/actuator/health`
- **SQLite Database**: Automatically created at `./data/portfolio.db`
- **Default Admin User**:
  - Username: `admin`
  - Password: `Admin123!@#`

#### Customizing Admin Credentials via Environment Variables
```bash
export ADMIN_USERNAME="mycustomadmin"
export ADMIN_PASSWORD="SuperSecretPassword99!"
export CORS_ALLOWED_ORIGINS="http://localhost:4200,https://<your-username>.github.io"
mvn spring-boot:run -pl portfolio-web
```

---

### 2. Running the Angular Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start local dev server
npm start
```

Navigate to `http://localhost:4200`. The frontend will automatically route requests to `http://localhost:8080/api/v1` with cookies enabled.

---

## 🔐 Admin Authentication Flow

1. Navigate to `http://localhost:4200/admin/login` (or click **Admin Login** in the navbar).
2. Enter the administrator credentials:
   - **Username**: `admin`
   - **Password**: `Admin123!@#` (or your configured `ADMIN_PASSWORD` env var).
3. Upon authentication, Spring Boot issues a `JSESSIONID` session cookie.
4. The Angular `authGuard` verifies your session and unlocks the **Admin Console** at `/admin/dashboard`:
   - **Inbound Messages**: View, mark as read, and delete contact submissions.
   - **Visitor Telemetry**: Inspect total hits, unique visitors, page breakdowns, and recent visits.
   - **System Status**: Monitor modular monolith component health and database status.
5. Clicking **Terminate Session** invalidates the HTTP session on the backend and redirects to the home page.

---

## 🌐 Production Deployment

### A. Deploy Frontend to GitHub Pages (Automated via GitHub Actions)

The repository includes a ready-to-use GitHub Actions workflow at `.github/workflows/deploy-frontend.yml`.

#### Step-by-Step Instructions:
1. **Create a GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of modular portfolio"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** → **Pages** (in the left sidebar).
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. **Trigger Deployment**:
   - Pushing any commit to the `main` branch automatically triggers `.github/workflows/deploy-frontend.yml`.
   - The workflow runs `ng build --configuration production --base-href "/<repo-name>/"` and copies `index.html` to `404.html` so that Angular client-side routing works flawlessly on GitHub Pages!
   - Your live site will be accessible at: `https://<your-username>.github.io/<repo-name>/`.

---

### B. Deploy Backend to Render (with Persistent SQLite Disk)

Render provides web service hosting with persistent disk support.

1. **Connect GitHub Repo to Render**:
   - Create an account on [Render.com](https://render.com).
   - Click **New** → **Web Service** → Connect your GitHub repository.
2. **Configure Settings**:
   - **Runtime**: `Docker`
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Docker Context**: `backend`
   - **Instance Type**: Free or Starter
3. **Attach a Persistent Disk**:
   - In the service settings, scroll to **Disks** → Click **Add Disk**.
   - **Name**: `sqlite-data`
   - **Mount Path**: `/data`
   - **Size**: 1 GB (plenty for millions of records in SQLite)
4. **Configure Environment Variables**:
   Add the following environment variables under **Environment**:
   - `ADMIN_USERNAME`: `your_admin_name`
   - `ADMIN_PASSWORD`: `your_secure_password`
   - `CORS_ALLOWED_ORIGINS`: `https://<your-username>.github.io`
   - `SQLITE_DB_PATH`: `/data/portfolio.db`
   - `SPRING_PROFILES_ACTIVE`: `prod`
   - `SESSION_COOKIE_SECURE`: `true`
5. **Deploy**:
   - Click **Create Web Service**.
   - Render will build the multi-stage Docker image and launch the container on an HTTPS URL (e.g. `https://portfolio-backend.onrender.com`).

---

### C. Deploy Backend to Fly.io (Alternative)

```bash
cd backend

# Initialize Fly app
fly launch --no-deploy

# Create persistent storage volume for SQLite
fly volumes create portfolio_data --size 1 --region sea

# Mount volume in fly.toml
# [mounts]
#   source = "portfolio_data"
#   destination = "/data"

# Set secrets
fly secrets set ADMIN_USERNAME="admin" ADMIN_PASSWORD="your-strong-password" CORS_ALLOWED_ORIGINS="https://<your-username>.github.io"

# Deploy
fly deploy
```

---

## 🎨 Customizing Content

All portfolio content is decoupled from components. Update your details in:
- `frontend/src/app/core/data/portfolio-data.ts` (or `seed-data.json`):
  - `PORTFOLIO_INFO`: Name, title, bio, stats, and social links.
  - `SKILL_CATEGORIES`: Technical capabilities and proficiency levels.
  - `PROJECTS`: Featured projects, tags, descriptions, and GitHub links.
  - `EXPERIENCES`: Work history, achievements, and tech stack tags.

---

## 📄 License & Ownership
Created for personal portfolio and production deployment. Licensed under the MIT License.
