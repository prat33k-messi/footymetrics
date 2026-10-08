# ⚽ FootyMetrics

**Football Player Performance & Analytics Management System**

FootyMetrics is a full-stack web application designed for football player performance tracking, scouting, and career analytics. Built with a modern **Spring Boot 3** backend and a sleek dark-themed **React Single Page Application (SPA)**.

---

## 🚀 Features (Current Release)

- **Player Authentication Flow**: Complete registration and login system with client-side credential persistence (`localStorage`).
- **Protected Player Dashboard**: Dedicated dashboard displaying athlete career performance metrics (Goals, Assists, Matches) and club profile information.
- **Credential Management**: Built-in password update and account deletion flows.
- **Robust REST API**: Built on Spring Boot with Spring Data JPA and MySQL 8.
- **Modern UI**: Futuristic, stadium-inspired dark theme built with React and custom CSS.

---

## 🛠️ Architecture & Tech Stack

### Backend
- **Language & Runtime**: Java 17 / OpenJDK
- **Framework**: Spring Boot 3.3.4
- **ORM & Data**: Spring Data JPA & Hibernate
- **Database Driver**: MySQL Connector/J (`mysql-connector-j`)
- **Database**: MySQL 8.0 (`footymetrics_db`)

### Frontend
- **Framework**: React 18
- **Tooling**: Vite
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Styling**: Modern dark stadium aesthetic with custom responsive CSS

---

## 📂 Project Structure

```
fotymetrics/
├── backend/                               # Spring Boot Maven Project
│   ├── pom.xml                            # Dependencies & plugins
│   └── src/
│       ├── main/java/com/example/footymetrics/
│       │   ├── FootymetricsApplication.java # Spring Boot entry point
│       │   ├── Users.java                  # User/Player entity
│       │   ├── Marks.java                  # Career performance metrics entity
│       │   ├── UserRepository.java         # User JPA repository
│       │   ├── MarksRepository.java        # Career marks JPA repository
│       │   ├── UserController.java         # REST Authentication controller
│       │   ├── LoginData.java              # Login DTO
│       │   ├── UpdatePassword.java         # Password update DTO
│       │   └── DeleteData.java             # Account delete DTO
│       └── main/resources/
│           └── application.properties      # Database & Hibernate configuration
│
└── frontend/                              # React Single Page Application (Vite)
    ├── package.json                       # Dependencies & scripts
    ├── vite.config.js                     # Configured for port 3000
    ├── index.html                         # Entry HTML
    └── src/
        ├── App.js                         # Router setup (/, /reg, /log, /dboard)
        ├── main.jsx                       # React DOM root
        ├── index.css                      # Global theme & layout styling
        └── components/
            ├── Home.jsx                   # Landing / Welcome view
            ├── Register.jsx               # Player registration form
            ├── Login.jsx                  # Player sign-in form
            └── Dashboard.jsx              # Protected career metrics view
```

---

## ⚙️ Prerequisites

1. **Java Development Kit (JDK 17+)**
2. **Apache Maven 3.8+**
3. **Node.js (v18+) & npm**
4. **MySQL Server 8.0** running on `localhost:3306`
   - Default credentials: User `root`, Password `root` (configurable in `application.properties`)

---

## 🏃 Getting Started

### 1. Database Setup
Ensure MySQL is running. The database `footymetrics_db` is automatically created on first boot by Spring Boot if it doesn't already exist.

```sql
CREATE DATABASE IF NOT EXISTS footymetrics_db;
```

### 2. Backend Setup & Run

Open a terminal in `backend/`:

```bash
cd backend
mvn clean compile
```

Run the application:
```bash
mvn spring-boot:run
```
*Backend server will start at `http://localhost:8080`.*

### 3. Frontend Setup & Run

Open a separate terminal in `frontend/`:

```bash
cd frontend
npm install
npm run dev
```
*Frontend will launch at `http://localhost:3000`.*

---

## 🔌 API Endpoints

| Method | Endpoint    | Description                     | Request Body |
|--------|-------------|---------------------------------|--------------|
| `POST` | `/register` | Register a new player           | `Users` JSON (`username`, `email`, `password`, `branch`, `role`) |
| `POST` | `/login`    | Authenticate player             | `LoginData` JSON (`username`, `password`) |
| `POST` | `/update`   | Change account password         | `UpdatePassword` JSON (`username`, `password`, `npassword`) |
| `POST` | `/delete`   | Delete player account           | `DeleteData` JSON (`username`, `password`) |

---

## 📄 License
MIT License.
