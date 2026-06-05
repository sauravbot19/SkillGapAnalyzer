# 🎯 Skill Gap Analyzer

> **A Powerful Backend System for Career Development & Skill Assessment**

[![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4-green?style=flat-square&logo=spring)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-Database-blue?style=flat-square&logo=mysql)](https://www.mysql.com/)
[![Maven](https://img.shields.io/badge/Maven-Build-C71A36?style=flat-square&logo=apache-maven)](https://maven.apache.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

---

## 📋 Overview

**Skill Gap Analyzer** is an intelligent backend system that bridges the gap between **current employee skills** and **required job role competencies**. It provides actionable insights, gap analysis, and personalized recommendations to guide career development and talent management.

Perfect for:
- 💼 **HR & Talent Management** teams
- 👤 **Individual Career Development**
- 🏢 **Enterprise Skill Tracking**
- 📊 **Workforce Planning & Analytics**

---

## ✨ Key Features

### 📊 **Comprehensive Skill Analysis**
- Compare user skills against job role requirements
- Identify skill gaps and proficiency mismatches
- Generate detailed gap reports with actionable metrics

### 🎓 **Intelligent Recommendations**
- Personalized learning suggestions based on gaps
- Prioritized skill improvement paths
- Classification: Start Learning | Improve Skills | Already Proficient

### 🔧 **Flexible Skill Management**
- Create and manage unlimited skills and proficiency levels
- Map skills to job roles with precision
- Track skill proficiency on customizable scales

### 👥 **User & Role Management**
- Create and manage users with skill portfolios
- Define job roles with specific skill requirements
- Establish skill-to-role mappings with required proficiency

### 🚀 **RESTful API**
- Complete REST API for seamless integration
- Well-documented endpoints with clear request/response contracts
- Ready for frontend integration

---

## 🏗️ Architecture

```
┌─────────────┐
│ Controller  │ (REST Endpoints)
└──────┬──────┘
       │
┌──────▼──────┐
│  Service    │ (Business Logic)
└──────┬──────┘
       │
┌──────▼──────────┐
│ Repository      │ (Data Access)
└──────┬──────────┘
       │
┌──────▼──────────┐
│    Database     │ (MySQL)
└─────────────────┘
```

**Clean Layered Architecture** ensures:
- ✅ Separation of concerns
- ✅ Easy testing & maintenance
- ✅ Scalability & extensibility
- ✅ Clear code organization

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Java** | 17 | Core Language |
| **Spring Boot** | 4 | Framework |
| **Spring Data JPA** | Latest | ORM & Database Access |
| **MySQL** | 8.0+ | Database |
| **Lombok** | Latest | Boilerplate Reduction |
| **Maven** | 3.8+ | Build Tool |

---

## 📦 Project Modules

### **v1.0 Release** - Complete Feature Set

#### ✅ **SGA 0.1** - User & Skill Management
- Create and manage users
- Create and manage skills
- Map users to skills with proficiency levels (1-5 scale)

#### ✅ **SGA 0.2** - Role Management
- CRUD operations for job roles
- Role descriptions and metadata
- Enable/disable roles

#### ✅ **SGA 0.3** - Role-Skill Mapping
- Define required skills for job roles
- Set required proficiency levels per skill
- Flexible skill requirement management

#### ✅ **SGA 0.4** - Gap Analysis Engine
- Compare user skills vs role requirements
- Identify missing skills
- Flag skills below required proficiency
- Generate comprehensive gap reports

#### ✅ **SGA 0.5** - Smart Recommendations
- Analyze gaps and generate recommendations
- Suggest learning paths
- Prioritize skill improvements
- Actionable guidance for career development

---

## 🔌 API Endpoints

### **Users & Skills**
```
POST   /api/users               → Create new user
GET    /api/users               → Fetch all users
GET    /api/users/{id}          → Get user details
PUT    /api/users/{id}          → Update user

POST   /api/skills              → Create new skill
GET    /api/skills              → Fetch all skills
GET    /api/skills/{id}         → Get skill details

POST   /api/user-skills         → Assign skill to user
PUT    /api/user-skills/{id}    → Update user skill proficiency
DELETE /api/user-skills/{id}    → Remove skill from user
```

### **Roles & Mappings**
```
POST   /api/roles               → Create new role
GET    /api/roles               → Fetch all roles
GET    /api/roles/{id}          → Get role details
PUT    /api/roles/{id}          → Update role
DELETE /api/roles/{id}          → Delete role

POST   /api/role-skills         → Map skill to role
GET    /api/role-skills/{roleId} → Get role's required skills
PUT    /api/role-skills/{id}    → Update role skill requirement
DELETE /api/role-skills/{id}    → Remove skill from role
```

### **Analysis & Insights**
```
GET    /api/skill-gap/user/{userId}/role/{roleId}
       → Run skill gap analysis for user vs role

GET    /api/recommendations/user/{userId}/role/{roleId}
       → Get personalized recommendations
```

---

## 📊 Database Schema

```sql
users (id, name, email, ...)
  ├── user_skills (userId, skillId, proficiency)
  │    └── skills (id, name, description)
  │
roles (id, name, description, ...)
  └── role_skills (roleId, skillId, requiredProficiency)
       └── skills (id, name, description)
```

**5 Core Tables:**
- `users` - Employee/user profiles
- `skills` - Available skills catalog
- `user_skills` - User skill proficiencies (1-5 scale)
- `roles` - Job role definitions
- `role_skills` - Role requirements

---

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- MySQL 8.0 or higher
- Maven 3.8 or higher

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sauravbot19/SkillGapAnalyzer.git
   cd SkillGapAnalyzer
   ```

2. **Setup Database**
   ```sql
   CREATE DATABASE skillgap;
   ```

3. **Configure Application**
   - Open `src/main/resources/application.yml`
   - Update MySQL credentials:
     ```yaml
     spring:
       datasource:
         url: jdbc:mysql://localhost:3306/skillgap
         username: YOUR_USERNAME
         password: YOUR_PASSWORD
       jpa:
         hibernate:
           ddl-auto: update
     ```

4. **Build & Run**
   ```bash
   # Build with Maven
   mvn clean install
   
   # Run the application
   mvn spring-boot:run
   ```

5. **Access the API**
   - Application will run on: `http://localhost:8080`
   - Test endpoints using Postman

---

## 📝 Usage Example

### Create a User
```json
POST /api/users
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Create Skills
```json
POST /api/skills
{
  "name": "Java",
  "description": "Java Programming Language"
}

POST /api/skills
{
  "name": "Spring Boot",
  "description": "Spring Framework for Backend Development"
}
```

### Assign Skills to User
```json
POST /api/user-skills
{
  "userId": 1,
  "skillId": 1,
  "proficiency": 4
}
```

### Create a Job Role
```json
POST /api/roles
{
  "name": "Senior Backend Engineer",
  "description": "Java/Spring Backend Development"
}
```

### Map Skills to Role
```json
POST /api/role-skills
{
  "roleId": 1,
  "skillId": 1,
  "requiredProficiency": 5
}
```

### Get Gap Analysis
```
GET /api/skill-gap/user/1/role/1
```

**Response:**
```json
{
  "userId": 1,
  "roleId": 1,
  "matchScore": 78,
  "missingSkills": ["Kubernetes"],
  "skillsToImprove": ["Spring Boot"],
  "proficientSkills": ["Java"]
}
```

### Get Recommendations
```
GET /api/recommendations/user/1/role/1
```

**Response:**
```json
{
  "recommendations": [
    {
      "skill": "Kubernetes",
      "status": "START_LEARNING",
      "priority": "HIGH"
    },
    {
      "skill": "Spring Boot",
      "status": "IMPROVE",
      "priority": "MEDIUM"
    }
  ]
}
```

---

## 📂 Project Structure

```
SkillGapAnalyzer/
├── src/main/java/com/skillgap/
│   ├── controller/        # REST Controllers
│   ├── service/           # Business Logic
│   ├── repository/        # Data Access
│   ├── model/             # Entity Classes
│   ├── dto/               # Data Transfer Objects
│   ├── exception/         # Custom Exceptions
│   └── SkillGapApplication.java
├── src/main/resources/
│   ├── application.yml    # Configuration
│   └── schema.sql         # Database Schema
├── pom.xml               # Maven Dependencies
└── README.md
```

---

## 🧪 Testing

- Built with **Postman** collection ready for endpoint testing
- All endpoints have been validated with sample requests
- Can be extended with JUnit & Mockito for unit tests

---

## 🔄 Workflow

```
1. Create Users & Skills
   ↓
2. Define Job Roles & Requirements
   ↓
3. Map Skills to Users
   ↓
4. Run Gap Analysis
   ↓
5. Get Personalized Recommendations
   ↓
6. Track Skill Improvements
```

---

## 📈 Future Enhancements (v2.0 Roadmap)

- 🎓 Learning Path Generation with suggested resources
- 📊 Advanced analytics and trend reporting
- 👥 Team skill matrix and workforce planning
- 🎯 Career progression tracking
- 🔐 Role-based access control (RBAC)
- 📱 Mobile application
- 🌐 Web dashboard & UI

---

## 💡 Use Cases

### **HR & Talent Management**
- Identify skill gaps in your workforce
- Plan training and development programs
- Match employees to roles
- Build succession plans

### **Individual Career Development**
- Understand skill requirements for target roles
- Get personalized learning recommendations
- Track skill improvement progress
- Plan career growth

### **Enterprise Solutions**
- Maintain a skills inventory
- Identify upskilling opportunities
- Reduce recruiting costs with internal mobility
- Improve employee retention

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support & Questions

- 📧 Email: sauravbot19@gmail.com
- 🐛 Found a bug? Open an issue
- 💬 Have suggestions? Feel free to contribute

---

## 👨‍💻 Author

**Saurav** - Backend Developer passionate about clean code and scalable systems

- GitHub: [@sauravbot19](https://github.com/sauravbot19)
- Project: [SkillGapAnalyzer](https://github.com/sauravbot19/SkillGapAnalyzer)

---

## ⭐ Show Your Support

If this project helped you, please give it a star! ⭐

---

**Made with ❤️ for better career development and workforce management**
