# 🎯 SkillGap Analyzer - AI-Powered Resume & Job Fit Analysis

> **Enterprise-Grade Cloud-Native Application for Resume Analysis & Skill Gap Assessment using LLMs**

[![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0-green?style=flat-square&logo=spring)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React.js-Latest-blue?style=flat-square&logo=react)](https://react.dev/)
[![AWS](https://img.shields.io/badge/AWS-Cloud-FF9900?style=flat-square&logo=amazon-aws)](https://aws.amazon.com/)
[![AI-Powered](https://img.shields.io/badge/AI-Groq%20LLaMA%203-blueviolet?style=flat-square)](https://groq.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

---

## 📋 Overview

**SkillGap Analyzer** is a cutting-edge, production-grade web application that leverages **Large Language Models (LLMs)** to analyze resumes against job descriptions. It provides deep insights into:

✅ **Skill Gap Analysis** - Identify missing and below-proficiency skills  
✅ **ATS Compatibility** - Resume optimization for Applicant Tracking Systems  
✅ **Match Score** - Quantifiable job-fit percentage  
✅ **Matching Technologies** - Which tech stack aligns with JD  
✅ **AI-Powered Recommendations** - Actionable improvement suggestions  
✅ **PDF Resume Processing** - Direct file uploads with S3 storage  
✅ **JWT Authentication** - Secure user authentication  
✅ **Analysis History** - Track and compare multiple analyses  

**Perfect for:**
- 💼 Job seekers optimizing resumes
- 🏢 Recruiters evaluating candidate fit
- 👔 HR teams analyzing internal talent
- 📊 Career coaches providing guidance

---

## ✨ Key Features (v2.0 - Upgraded)

### 🤖 **AI-Powered Resume Analysis**
- **LLM Integration**: Uses Groq's LLaMA 3 for intelligent analysis
- **Resume PDF Processing**: Direct PDF upload and parsing via Apache PDFBox
- **Job Description Analysis**: Extract requirements from job postings
- **Semantic Understanding**: Deep NLP analysis beyond keyword matching

### 📊 **Comprehensive Skill Assessment**
- Match Score calculation (0-100%)
- Matching skills categorization
- Missing skills identification
- Below-proficiency skill detection
- Technology stack alignment

### 📄 **Resume Intelligence**
- ATS compatibility scoring
- Keyword optimization suggestions
- Format and structure analysis
- Content gap identification
- Improvement recommendations

### 👤 **User Authentication & Security**
- JWT-based authentication
- Secure registration/login
- User profile management
- Analysis history per user
- Role-based access control

### 💾 **Cloud Storage & Scalability**
- AWS S3 for resume storage
- AWS RDS MySQL for data persistence
- Elastic Beanstalk deployment
- Production-ready infrastructure

### 📈 **Analysis Dashboard**
- View past analyses
- Compare multiple job fits
- Track skill improvement over time
- Export recommendations as PDF

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React.js)                      │
│  - Resume Upload UI  - Job Description Input               │
│  - Analysis Results Display - History Dashboard            │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTPS
┌─────────────────────▼───────────────────────────────────────┐
│              API Gateway / Load Balancer                    │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│            Spring Boot Backend (Java 17)                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         REST Controllers (8 Endpoints)              │   │
│  │  - Auth Controller (Register, Login, Validate)      │   │
│  │  - Resume Controller (Upload, Process, Retrieve)    │   │
│  │  - Analysis Controller (Run Analysis, Get History)  │   │
│  └─────────────────────┬───────────────────────────────┘   │
│                        │                                    │
│  ┌─────────────────────▼───────────────────────────────┐   │
│  │         Service Layer (Business Logic)              │   │
│  │  - AuthService (JWT handling)                       │   │
│  │  - ResumeService (PDF processing)                   │   │
│  │  - AnalysisService (Gap analysis engine)            │   │
│  │  - LLMService (Groq API integration)                │   │
│  └─────────────────────┬───────────────────────────────┘   │
│                        │                                    │
│  ┌─────────────────────▼───────────────────────────────┐   │
│  │      Repository & Data Access Layer (JPA)           │   │
│  └─────────────────────┬───────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┬──────────────┐
        │             │             │              │
┌───────▼───┐ ┌──────▼────┐ ┌─────▼──────┐  ┌────▼────┐
│  AWS S3   │ │ AWS RDS   │ │ Groq LLM   │  │  Redis  │
│ (Resume   │ │ (MySQL DB)│ │  (Analysis)│  │ (Cache) │
│ Storage)  │ │           │ │            │  │         │
└───────────┘ └───────────┘ └────────────┘  └─────────┘
```

---

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Backend Language** | Java 17 | Core Application Logic |
| **Framework** | Spring Boot 4.0 | REST API & Web Framework |
| **Security** | Spring Security + JWT | Authentication & Authorization |
| **PDF Processing** | Apache PDFBox 3.0 | Resume Parsing |
| **AI/LLM** | Groq API (LLaMA 3) | Intelligent Analysis |
| **Database** | AWS RDS MySQL 8.0+ | Data Persistence |
| **File Storage** | AWS S3 | Resume & Document Storage |
| **Frontend** | React.js | User Interface |
| **Deployment** | AWS Elastic Beanstalk + Vercel | Cloud Hosting |
| **Build Tool** | Maven 3.8+ | Dependency Management |
| **ORM** | Spring Data JPA + Hibernate | Database Mapping |
| **Migration** | Flyway | Database Schema Management |
| **Documentation** | Springdoc OpenAPI | API Documentation |

---

## 🔌 API Endpoints

| # | Method | Endpoint | Auth | Description |
|---|--------|----------|------|-------------|
| 1 | POST | `/api/auth/register` | ❌ | User registration |
| 2 | POST | `/api/auth/login` | ❌ | User login with JWT token |
| 3 | POST | `/api/resume/upload` | ✅ | Upload PDF resume to S3 |
| 4 | GET | `/api/resume/{id}` | ✅ | Retrieve resume metadata |
| 5 | POST | `/api/analysis/run` | ✅ | Execute AI-powered gap analysis |
| 6 | GET | `/api/analysis/history` | ✅ | Get user's analysis history |
| 7 | GET | `/api/analysis/{id}` | ✅ | Retrieve specific analysis result |
| 8 | DELETE | `/api/analysis/{id}` | ✅ | Delete analysis record |

---

## 📊 Database Schema

```sql
users (id, email, password, firstName, lastName, createdAt)
  ├── resumes (id, userId, s3Key, fileName, fileSize, uploadedAt)
  │    └── [PDF stored in AWS S3]
  │
analyses (id, userId, resumeId, jobDescription, matchScore, 
          matchingSkills, missingSkills, suggestedImprovements, 
          atsScore, createdAt)
```

**Core Tables:**
- `users` - User accounts with JWT credentials
- `resumes` - Resume metadata and S3 references
- `analyses` - Analysis results and LLM outputs
- `refresh_tokens` - JWT token management (optional)

---

## 🚀 Getting Started

### Prerequisites
- **Java 17+** - JDK Installation
- **Maven 3.8+** - Build tool
- **MySQL 8.0+** - Database
- **AWS Account** - S3 bucket & RDS instance
- **Groq API Key** - LLM access
- **Node.js 16+** - Frontend (if running React locally)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/sauravbot19/SkillGapAnalyzer.git
cd SkillGapAnalyzer
```

#### 2. Backend Setup

**2a. Configure Database**
```bash
# Create MySQL database
mysql -u root -p < src/main/resources/db/migration/V1__initial_schema.sql
```

**2b. Update Application Properties**
```bash
# Edit src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/skillgapanalyzer
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

**2c. Set Environment Variables**
```bash
export AWS_ACCESS_KEY=your_aws_access_key
export AWS_SECRET_KEY=your_aws_secret_key
export GROQ_API_KEY=your_groq_api_key
```

**2d. Build & Run**
```bash
# Build
mvn clean install

# Run the application
mvn spring-boot:run

# Application starts on: http://localhost:8080
```

#### 3. Frontend Setup (React)
```bash
cd frontend
npm install
npm start
# Frontend runs on: http://localhost:3000
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Database
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=skillgapanalyzer
MYSQL_USER=root
MYSQL_PASSWORD=your_password

# AWS Configuration
AWS_ACCESS_KEY=your_aws_access_key_id
AWS_SECRET_KEY=your_aws_secret_access_key
AWS_S3_BUCKET=skillgapanalyzer-resume-storage
AWS_REGION=ap-south-1

# Groq LLM API
GROQ_API_KEY=your_groq_api_key
GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
GROQ_MODEL=llama-3.1-8b-instant

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_min_32_chars
JWT_EXPIRATION=86400000

# Application
SPRING_PROFILES_ACTIVE=prod
SERVER_PORT=8080
```

---

## 📝 API Usage Examples

### 1. User Registration
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### 2. User Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePassword123"
  }'

# Response: { "token": "jwt_token_here" }
```

### 3. Upload Resume
```bash
curl -X POST http://localhost:8080/api/resume/upload \
  -H "Authorization: Bearer jwt_token_here" \
  -F "file=@resume.pdf"

# Response: { "id": 1, "s3Key": "resumes/user123/resume.pdf", "fileName": "resume.pdf" }
```

### 4. Run Analysis
```bash
curl -X POST http://localhost:8080/api/analysis/run \
  -H "Authorization: Bearer jwt_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "resumeId": 1,
    "jobDescription": "We are looking for a Senior Java Developer with 5+ years of Spring Boot experience..."
  }'

# Response:
{
  "id": 1,
  "matchScore": 78,
  "matchingSkills": ["Java", "Spring Boot", "MySQL"],
  "missingSkills": ["Kubernetes", "AWS", "Docker"],
  "belowProficiencySkills": ["Spring Cloud"],
  "atsScore": 85,
  "suggestions": [
    "Add Kubernetes experience to skills section",
    "Emphasize AWS cloud projects",
    "Improve technical keywords for ATS"
  ]
}
```

### 5. Get Analysis History
```bash
curl -X GET http://localhost:8080/api/analysis/history \
  -H "Authorization: Bearer jwt_token_here"

# Response: Array of past analyses with timestamps
```

---

## 📂 Project Structure

```
SkillGapAnalyzer/
├── src/main/java/com/skillgap/
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── ResumeController.java
│   │   └── AnalysisController.java
│   ├── service/
│   │   ├── AuthService.java
│   │   ├── ResumeService.java
│   │   ├── AnalysisService.java
│   │   └── LLMService.java (Groq Integration)
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
│   │   ├── AnalysisResponse.java
│   │   └── ResumeUploadResponse.java
│   ├── security/
│   │   ├── JwtTokenProvider.java
│   │   ├── SecurityConfig.java
│   │   └── CustomUserDetailsService.java
│   ├── config/
│   │   ├── AmazonS3Config.java
│   │   ├── GroqConfig.java
│   │   └── CorsConfig.java
│   ├── exception/
│   │   ├── GlobalExceptionHandler.java
│   │   └── CustomExceptions.java
│   └── SkillGapApplication.java
│
├── src/main/resources/
│   ├── application.properties
│   ├── db/migration/
│   │   ├── V1__initial_schema.sql
│   │   └── V2__add_analysis_tables.sql
│   └── templates/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
│
├── pom.xml
├── README.md
├── .gitignore
└── docker-compose.yml (for local development)
```

---

## 🔄 Project Journey (v1.0 → v2.0)

### **Version 1.0 - Foundation**
Basic skill gap analysis system comparing user skills vs job role requirements:
- ✅ User & Role Management
- ✅ Skill proficiency tracking
- ✅ Gap calculation engine
- ✅ Basic recommendations

### **Version 2.0 - ResumeFit AI Upgrade** (Current)
Enterprise cloud-native AI-powered application with LLM integration:
- ✅ **AI Integration**: Groq LLaMA 3 for intelligent analysis
- ✅ **Cloud Infrastructure**: AWS S3, RDS, Elastic Beanstalk
- ✅ **PDF Processing**: Direct resume file uploads
- ✅ **Authentication**: JWT-based secure login
- ✅ **Frontend**: React.js dashboard
- ✅ **Analysis History**: Track and compare multiple analyses
- ✅ **ATS Optimization**: Resume scoring for ATS systems
- ✅ **Production Ready**: Fully scalable, enterprise-grade

### **Upgrade Highlights**
| Feature | v1.0 | v2.0 |
|---------|------|------|
| Resume Upload | ❌ | ✅ PDF to S3 |
| AI Analysis | ❌ | ✅ Groq LLaMA 3 |
| Authentication | ❌ | ✅ JWT Auth |
| Cloud Storage | ❌ | ✅ AWS S3 |
| Database | ✅ Local MySQL | ✅ AWS RDS |
| Frontend | ❌ | ✅ React.js |
| Deployment | Local | ✅ Elastic Beanstalk |
| ATS Scoring | ❌ | ✅ Yes |
| Analysis History | ❌ | ✅ Yes |

---

## 🧪 Testing

### Backend Testing
```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=AnalysisServiceTest

# Generate coverage report
mvn jacoco:report
```

### API Testing with Postman
- Import the Postman collection: `docs/SkillGapAnalyzer.postman_collection.json`
- Update variables: `base_url`, `jwt_token`
- Run test suite

### Frontend Testing
```bash
cd frontend
npm test
npm run coverage
```

---

## 🚢 Deployment

### AWS Elastic Beanstalk
```bash
# Install EB CLI
pip install awsebcli

# Initialize EB
eb init -p "Java 17 running on 64bit Amazon Linux 2" skillgapanalyzer

# Create environment and deploy
eb create production-env
eb deploy

# View logs
eb logs
```

### Vercel Frontend Deployment
```bash
cd frontend
npm run build
vercel --prod
```

---

## 📈 Future Enhancements (v3.0 Roadmap)

- 🎓 **Learning Paths**: Generate complete upskilling plans with resources
- 📊 **Analytics Dashboard**: Advanced metrics and trend analysis
- 👥 **Team Analysis**: Batch analysis for multiple candidates
- 🔐 **RBAC**: Role-based access control for enterprises
- 📱 **Mobile App**: Native iOS/Android application
- 🌐 **Multi-Language**: Support for multiple languages
- 🎯 **Interview Prep**: AI-powered interview question generator
- 📈 **Salary Insights**: Compensation data based on skills

---

## 🔐 Security Considerations

- ✅ JWT tokens with expiration
- ✅ CORS configuration for frontend
- ✅ Input validation & sanitization
- ✅ SQL injection prevention (Parameterized queries)
- ✅ Secure password hashing (BCrypt)
- ✅ AWS IAM roles for S3 access
- ✅ Environment variables for sensitive data
- ✅ HTTPS enforcement in production

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📞 Support & Contact

- 📧 **Email**: sauravbot19@gmail.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/sauravbot19/SkillGapAnalyzer/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/sauravbot19/SkillGapAnalyzer/discussions)
- 📖 **Documentation**: [API Docs](http://localhost:8080/swagger-ui.html) (local)

---

## 👨‍💻 Author

**Saurav** - Full-Stack Developer passionate about AI, Cloud, and scalable systems

- GitHub: [@sauravbot19](https://github.com/sauravbot19)
- LinkedIn: [Saurav's Profile](#)
- Portfolio: [sauravbot19.com](#)

---

## ⭐ Show Your Support

If this project helped you, please give it a star! ⭐

---

**Made with ❤️ for career development, AI innovation, and cloud engineering**
