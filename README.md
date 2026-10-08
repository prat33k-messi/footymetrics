# ⚽ FOOTYMETRICS

**Professional Football Player Intelligence & Analytics Management System**

FootyMetrics is a full-stack, enterprise-grade football scouting and player performance analytics platform. Built with a **Spring Boot 3 (Java 17)** backend, **MySQL 8** database, and a high-end, monochrome (Black & White) **React 18 SPA (Vite)** with modern typography (`Space Grotesk`, `Inter`, `JetBrains Mono`).

---

## 🖤 Design System: Pure Monochrome

- **Palette**: Obsidian blacks (`#000000`, `#09090b`), slate grays, and stark contrast whites (`#ffffff`).
- **Typography**: 
  - **Headings**: `Space Grotesk` (clean, technical, bold geometric).
  - **Body / Interface**: `Inter` (readable, modern).
  - **Telemetry / Numerics**: `JetBrains Mono` (tabular numeric data).
- **Aesthetic**: Minimalist luxury athletic editorial aesthetic with subtle glassmorphic borders and crisp indicators.

---

## ⚡ Key Features

### 1. Complete Player Authentication Flow
- Athlete profile registration (`POST /register`) with club/league and position categorization.
- Secure sign-in (`POST /login`) with persistent local session storage.
- In-app password update (`POST /update`) and account removal (`POST /delete`).

### 2. Live Career Telemetry & Analytics Engine (New ✨)
- Real-time Goals (`maths`), Assists (`physics`), and Appearances (`chemistry`) tracking.
- Automated analytical telemetry:
  - **Goals Per Match (GPM)** calculation.
  - **Total Goal Contributions (G+A)**.
  - **Performance Impact Rating** (algorithmic 0.0 - 10.0 scale).
- In-app **Career Telemetry Editor** (`POST /marks/update`) to sync career totals with the database.

### 3. Global Scouting Directory & Leaderboard (New ✨)
- Live squad roster rankings (`GET /leaderboard`) sorted by performance rating and goals.
- Search players by handle or club name.
- Filter by tactical position (*Forward, Playmaker, Midfielder, Defender, Goalkeeper*).
- Individual rank badges (`#1`, `#2`, `#3`) with self-player indicator.

### 4. Match Performance Fixture Logger (New ✨)
- Record match fixtures (`POST /matches/log`) with opposing club, goals scored, assists provided, result (`WIN`, `DRAW`, `LOSS`), fixture date, and tactical match notes.
- Automatically increments career career totals upon recording.
- Detailed match history table with monochrome outcome badges (`GET /matches/{username}`).

### 5. Shareable Athlete Scouting Card (New ✨)
- One-click **Copy Scout Report** to generate and copy a scouting summary to clipboard for coaches and scouts.

---

## 🛠️ Architecture & Tech Stack

### Backend
- **Language**: Java 17 (OpenJDK)
- **Framework**: Spring Boot 3.3.4
- **ORM & Data**: Spring Data JPA & Hibernate
- **Database**: MySQL 8.0 (`footymetrics_db`)
- **Driver**: `mysql-connector-j`

### Frontend
- **Framework**: React 18 (SPA)
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **HTTP**: Axios
- **Deployment**: Vercel-ready with client-side SPA routing (`vercel.json`)

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Request Body / Param |
|--------|----------|-------------|----------------------|
| `POST` | `/register` | Register new athlete profile | `Users` JSON |
| `POST` | `/login` | Authenticate player | `LoginData` JSON |
| `POST` | `/update` | Update account password | `UpdatePassword` JSON |
| `POST` | `/delete` | Delete account & career marks | `DeleteData` JSON |
| `GET`  | `/stats/{username}` | Fetch live player telemetry & rating | Username path variable |
| `POST` | `/marks/update` | Update career totals (goals/assists/matches) | `MarksDto` JSON |
| `GET`  | `/players` | Retrieve all registered players | None |
| `GET`  | `/leaderboard` | Ranked leaderboard sorted by rating & goals | None |
| `POST` | `/matches/log` | Record a match fixture & update stats | `MatchLogRequest` JSON |
| `GET`  | `/matches/{username}` | Retrieve match history logs | Username path variable |

---

## 🏃 Local Setup & Run

### 1. Database
```sql
CREATE DATABASE IF NOT EXISTS footymetrics_db;
```

### 2. Backend (Spring Boot)
```bash
cd backend
mvn clean compile
mvn spring-boot:run
```
*Backend runs on `http://localhost:8080`.*

### 3. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`.*

---

## 🚀 Deploying to Vercel

The frontend includes configured `vercel.json` files for zero-config deployment on Vercel:

1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Set **Root Directory** to `frontend` (or leave default if importing the monorepo root).
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. *(Optional)* Add Environment Variable:
   - `VITE_API_BASE_URL` = Your hosted backend URL (e.g. on Railway, Render, or Fly.io).
   - If no backend is set, the frontend gracefully runs with interactive simulated telemetry preview!
6. Click **Deploy**.

---

## 📄 License
MIT License.
