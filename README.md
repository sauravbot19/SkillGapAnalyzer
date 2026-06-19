# 🎯 SkillGapAnalyzer - AI-Powered Resume & Job Fit Analysis

> **Production-Grade Full-Stack Application for Resume Analysis & Skill Gap Assessment using LLMs**

[![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0-green?style=flat-square&logo=spring)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React.js-Latest-blue?style=flat-square&logo=react)](https://react.dev/)
[![AWS](https://img.shields.io/badge/AWS-Cloud-FF9900?style=flat-square&logo=amazon-aws)](https://aws.amazon.com/)
[![AI-Powered](https://img.shields.io/badge/AI-Groq%20LLaMA%203-blueviolet?style=flat-square)](https://groq.com/)

---

## 📋 Overview

**SkillGapAnalyzer** is a production-grade full-stack web application that uses **Large Language Models (LLMs)** to analyze resumes against job descriptions. Built as an upgrade from a basic skill-gap calculator (v1.0) to an AI-powered cloud-native platform (v2.0).

It provides:

✅ **AI-Powered Skill Gap Analysis** — Identify matching and missing skills using Groq LLaMA 3.1  
✅ **Match Score** — Quantifiable job-fit percentage (0–100%)  
✅ **PDF Resume Processing** — Upload PDF, extract text via PDFBox, store on AWS S3  
✅ **JWT Authentication** — Secure register/login with token-based auth  
✅ **Analysis History** — Track and revisit all past analyses  
✅ **Improvement Suggestions** — AI-generated actionable career recommendations  
✅ **React Frontend** — Clean, responsive UI with full end-to-end flow  

---

## ✨ Key Features

### 🤖 AI-Powered Resume Analysis
- **LLM Integration** — Groq API with LLaMA 3.1-8b-instant model
- **PDF Resume Processing** — Direct PDF upload and text extraction via Apache PDFBox
- **Semantic Skill Matching** — Alias-aware matching (e.g. Hibernate/JPA, Java 8+/Java 17, REST APIs/RESTful)
- **Accurate Gap Detection** — Only flags skills required in JD but missing from resume

### 📊 Comprehensive Skill Assessment
- Match percentage calculation (0–100%)
- Matching skills identification
- Missing skills identification
- AI-generated improvement suggestions
- Verdict: Weak / Moderate / Good / Strong Match

### 👤 User Authentication & Security
- JWT-based authentication (24hr expiry)
- Secure register and login
- All protected routes require valid Bearer token
- BCrypt password hashing

### ☁️ Cloud Storage
- AWS S3 for PDF resume storage (Mumbai region)
- MySQL database with Flyway schema migration
- Resume metadata stored with S3 URL reference

### 📈 Analysis Dashboard (React Frontend)
- Upload resume + paste job description
- View AI analysis result with skill pills
- View full analysis history
- Delete past analyses
- Responsive UI with no CSS framework dependency

---

## 🏗️ Architecture

```
[client] React Frontend (Vite) — localhost:5173

[lb] Load Balancer (AWS ALB) — planned

[service] Auth Service — /auth/**
[service] Resume Service — /resume/**
[service] Analysis Service — /analysis/**

[storage] AWS S3 — PDF storage
[database] MySQL (local / AWS RDS)
[external] Groq AI API — LLaMA 3.1

React Frontend → Spring Boot Backend : HTTPS + JWT Bearer Token

Auth Service → MySQL : validate credentials, store user
Auth Service → React : JWT token response

Resume Service → AWS S3 : upload PDF
Resume Service → MySQL : save resume metadata

Analysis Service → MySQL : fetch resume S3 URL
Analysis Service → AWS S3 : download PDF bytes
Analysis Service → PDFBox : extract plain text
Analysis Service → Groq AI API : POST prompt (resumeText + jobDescription)
Groq AI API → Analysis Service : JSON response
Analysis Service → MySQL : persist analysis result
Analysis Service → React : return analysis response
```

---

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Backend Language** | Java 17 | Core application logic |
| **Framework** | Spring Boot 4.0.2 | REST API + web framework |
| **Security** | Spring Security 7 + JWT (JJWT 0.11.5) | Auth & authorization |
| **PDF Processing** | Apache PDFBox 3.0.1 | Resume text extraction |
| **AI / LLM** | Groq API (LLaMA 3.1-8b-instant) | Intelligent analysis |
| **HTTP Client** | Spring WebFlux (WebClient) | Non-blocking Groq API calls |
| **Database** | MySQL 8.0 | Data persistence |
| **ORM** | Spring Data JPA + Hibernate 7 | Database mapping |
| **Migration** | Flyway | Schema version control |
| **File Storage** | AWS S3 (ap-south-1) | PDF resume storage |
| **Frontend** | React.js + Vite | User interface |
| **Routing** | React Router DOM | SPA navigation |
| **HTTP Client (FE)** | Axios | API calls + JWT interceptor |
| **Build Tool** | Maven 3.8+ | Dependency management |
| **API Docs** | Springdoc OpenAPI | Swagger UI |

---

## 🔌 API Endpoints

| # | Method | Endpoint | Auth | Description |
|---|--------|----------|------|-------------|
| 1 | POST | `/auth/register` | ❌ | User registration |
| 2 | POST | `/auth/login` | ❌ | User login, returns JWT token |
| 3 | POST | `/resume/upload` | ✅ | Upload PDF resume to AWS S3 |
| 4 | POST | `/analysis/start` | ✅ | Run AI-powered resume analysis |
| 5 | GET | `/analysis/history` | ✅ | Get all analyses for logged-in user |
| 6 | GET | `/analysis/{id}` | ✅ | Get specific analysis result |
| 7 | DELETE | `/analysis/{id}` | ✅ | Delete analysis record |

---

## 📊 Database Schema

```sql
-- Users table
users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  created_at DATETIME
)

-- Resumes table
resumes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT REFERENCES users(id),
  s3_url VARCHAR(500),
  file_name VARCHAR(255),
  uploaded_at DATETIME
)

-- Analyses table
analyses (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  resume_id BIGINT REFERENCES resumes(id),
  jd_text TEXT,
  match_percentage INT,
  matching_skills TEXT,
  missing_skills TEXT,
  suggestions TEXT,
  verdict VARCHAR(50),
  created_at DATETIME
)
```

Managed by **Flyway** — schema auto-created on first run via `V1__init_schema.sql`.

---

## 🚀 Getting Started

### Prerequisites
- **Java 17+**
- **Maven 3.8+**
- **MySQL 8.0+**
- **Node.js 18+**
- **AWS Account** — S3 bucket
- **Groq API Key** — [console.groq.com](https://console.groq.com)

---

### Backend Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/sauravbot19/SkillGapAnalyzer.git
cd SkillGapAnalyzer
```

#### 2. Create MySQL Database
```sql
CREATE DATABASE skillgapanalyzer;
```

#### 3. Configure application.properties
Copy the example file and fill in your real values:
```bash
cp src/main/resources/application.properties.example src/main/resources/application.properties
```

Edit `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/skillgapanalyzer
spring.datasource.username=root
spring.datasource.password=YOUR_DB_PASSWORD

aws.access-key=YOUR_AWS_ACCESS_KEY
aws.secret-key=YOUR_AWS_SECRET_KEY
aws.s3.bucket=your-s3-bucket-name
aws.s3.region=ap-south-1

groq.api.key=YOUR_GROQ_API_KEY
groq.model=llama-3.1-8b-instant

jwt.secret=YOUR_JWT_SECRET_MIN_32_CHARS
jwt.expiration=86400000
```

#### 4. Run the Backend
```bash
mvn spring-boot:run
# Backend starts on: http://localhost:8080
# Swagger UI: http://localhost:8080/swagger-ui.html
```

---

### Frontend Setup

```bash
cd sgafrontend
npm install
npm run dev
# Frontend starts on: http://localhost:5173
```

---

## 📝 API Usage Examples

### 1. Register
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Saurav Tayade",
    "email": "saurav@example.com",
    "password": "test12345"
  }'

# Response:
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "name": "Saurav Tayade",
  "email": "saurav@example.com"
}
```

### 2. Login
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "saurav@example.com",
    "password": "test12345"
  }'

# Response:
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "name": "Saurav Tayade",
  "email": "saurav@example.com"
}
```

### 3. Upload Resume
```bash
curl -X POST http://localhost:8080/resume/upload \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..." \
  -F "file=@resume.pdf"

# Response:
{
  "id": 1,
  "s3Url": "https://your-bucket.s3.ap-south-1.amazonaws.com/uuid_resume.pdf",
  "fileName": "resume.pdf",
  "uploadedAt": "2026-06-19T10:00:00"
}
```

### 4. Start Analysis
```bash
curl -X POST http://localhost:8080/analysis/start \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "resumeId": 1,
    "jobDescription": "Looking for Java Backend Developer with Spring Boot, REST APIs, MySQL, AWS..."
  }'

# Response:
{
  "analysisId": 1,
  "matchPercentage": 83,
  "matchingSkills": "Java, Spring Boot, REST APIs, MySQL, AWS",
  "missingSkills": "Kubernetes, Docker",
  "suggestions": "Consider gaining experience with Kubernetes to strengthen containerization skills. Highlight your AWS experience more prominently in the resume. Add Docker to your skillset to align with modern DevOps practices.",
  "verdict": "Good Match"
}
```

### 5. Get History
```bash
curl -X GET http://localhost:8080/analysis/history \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..."
```

---

## 📂 Project Structure

```
SkillGapAnalyzer/
├── src/main/java/com/skillgap/analyzer/
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── ResumeController.java
│   │   └── AnalysisController.java
│   ├── service/
│   │   ├── AuthService.java
│   │   ├── ResumeUploadService.java
│   │   ├── PdfTextExtractorService.java
│   │   ├── AnalysisService.java
│   │   └── GroqAiService.java
│   ├── repository/
│   │   ├── UserRepository.java
│   │   ├── ResumeRepository.java
│   │   └── AnalysisRepository.java
│   ├── entity/
│   │   ├── User.java
│   │   ├── Resume.java
│   │   └── Analysis.java
│   ├── dto/
│   │   ├── LoginRequest.java
│   │   ├── RegisterRequest.java
│   │   ├── AuthResponse.java
│   │   ├── AnalysisRequest.java
│   │   └── AnalysisResponse.java
│   ├── security/
│   │   ├── JwtUtil.java
│   │   ├── JwtAuthFilter.java
│   │   └── SecurityConfig.java
│   ├── config/
│   │   ├── AwsS3Config.java
│   │   ├── WebClientConfig.java
│   │   └── AppConfig.java
│   └── SkillGapAnalyzerApplication.java
│
├── src/main/resources/
│   ├── application.properties          ← local only, in .gitignore
│   ├── application.properties.example  ← safe template, no real secrets
│   └── db/migration/
│       └── V1__init_schema.sql
│
├── sgafrontend/                        ← React Frontend (Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── UploadResume.jsx
│   │   │   ├── AnalysisResult.jsx
│   │   │   └── History.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── pom.xml
├── .gitignore
└── README.md
```

---

## 🔄 Project Journey (v1.0 → v2.0)

### Version 1.0 — Foundation
Basic skill gap analysis with manual role/skill management:
- ✅ User & Role Management
- ✅ Skill proficiency tracking
- ✅ Gap calculation engine

### Version 2.0 — SkillGapAnalyzer (Current)
Full-stack AI-powered resume analysis platform:
- ✅ Groq LLaMA 3.1 AI integration
- ✅ PDF resume upload + text extraction
- ✅ AWS S3 cloud storage
- ✅ JWT authentication
- ✅ React.js frontend (Vite)
- ✅ Analysis history with delete
- ✅ Accurate skill aliasing in prompts

| Feature | v1.0 | v2.0 |
|---------|------|------|
| Resume Upload | ❌ | ✅ PDF to S3 |
| AI Analysis | ❌ | ✅ Groq LLaMA 3.1 |
| JWT Auth | ❌ | ✅ |
| Cloud Storage | ❌ | ✅ AWS S3 |
| Frontend | ❌ | ✅ React + Vite |
| Analysis History | ❌ | ✅ |
| Skill Aliasing | ❌ | ✅ |

---

## 📈 Planned — v3.0 Roadmap

- ☁️ **AWS Elastic Beanstalk** — Backend cloud deployment
- 🌐 **Vercel** — Frontend deployment
- 📊 **Analytics Dashboard** — Skill trend tracking over time
- 🎯 **Interview Prep** — AI-generated interview questions based on JD

---

## 🔐 Security

- ✅ JWT tokens with 24hr expiry
- ✅ BCrypt password hashing
- ✅ CORS configured for frontend origin
- ✅ SQL injection prevention via JPA parameterized queries
- ✅ AWS credentials via environment variables only
- ✅ `application.properties` in `.gitignore` — never committed

---


## 👨‍💻 Author

**Saurav Tayade** — Java Developer

- GitHub: [@sauravbot19](https://github.com/sauravbot19)
- LinkedIn: [linkedin.com/in/saurav-tayade](https://www.linkedin.com/in/saurav-tayade-1147011b5/)
- Email: tayadesaurav190@gmail.com

---

## ⭐ Show Your Support

If this project helped you, please give it a star! ⭐

---

**Built with Java 17 · Spring Boot 4 · React · AWS · Groq AI**
