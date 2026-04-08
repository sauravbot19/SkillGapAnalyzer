<!DOCTYPE html>
<html>
<body>

<h1>🚀 Skill Gap Analyzer API (SGA 1.0)</h1>
<p><strong>Spring Boot Backend Project</strong></p>

<p>
Skill Gap Analyzer is a backend system that identifies the gap between a user’s current skills and the skills required for a target job role.
This project demonstrates clean backend architecture, scalable system design, and real-world development practices.
Version <strong>1.0</strong> represents a complete learning milestone covering user skills, roles, gap analysis, and recommendations.
</p>

<hr>

<h2>🛠 Tech Stack</h2>
<ul>
  <li><strong>Java 17</strong></li>
  <li><strong>Spring Boot 4</strong></li>
  <li>Spring Data JPA</li>
  <li>MySQL</li>
  <li>Lombok</li>
  <li>Maven</li>
  <li>Postman – API testing</li>
</ul>

<hr>

<h2>🏗 Architecture</h2>
<p><strong>Controller → Service → Repository → Database</strong></p>
<p>
Layered architecture ensures separation of concerns, maintainability, and scalability similar to enterprise backend systems.
</p>

<hr>

<h2>📦 Modules Implemented</h2>

<h3>✅ SGA0.1 — User Skill Management</h3>
<ul>
  <li>Create Users</li>
  <li>Create Skills</li>
  <li>Map Users with Skills</li>
  <li>Track proficiency levels</li>
</ul>

<h3>✅ SGA0.2 — Role Management System</h3>
<ul>
  <li>Create Roles</li>
  <li>View All Roles</li>
  <li>View Role by ID</li>
  <li>Delete Roles</li>
</ul>

<h3>✅ SGA0.3 — Role-Skill Mapping</h3>
<ul>
  <li>Map required skills to roles</li>
  <li>Define required proficiency per role</li>
</ul>

<h3>✅ SGA0.4 — Skill Gap Analysis Engine</h3>
<ul>
  <li>Compares user skills with role requirements</li>
  <li>Identifies missing skills</li>
  <li>Detects skills needing improvement</li>
  <li>Returns structured gap analysis response</li>
</ul>

<h3>✅ SGA0.5 — Skill Recommendation Engine</h3>
<ul>
  <li>Generates learning recommendations based on skill gaps</li>
  <li>Suggests whether to start, improve, or maintain a skill</li>
  <li>Transforms analysis into actionable career guidance</li>
</ul>

<p><strong>🎯 SGA0.5 is released as SGA1.0 (Final Version).</strong></p>

<hr>

<h2>🌐 API Endpoints</h2>

<h3>👤 Users & Skills</h3>
<table border="1" cellpadding="6">
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>POST</td><td>/users</td><td>Create user</td></tr>
<tr><td>GET</td><td>/users</td><td>Get all users</td></tr>
<tr><td>POST</td><td>/skills</td><td>Create skill</td></tr>
<tr><td>GET</td><td>/skills</td><td>Get all skills</td></tr>
<tr><td>POST</td><td>/user-skills</td><td>Map user to skill</td></tr>
</table>

<h3>🎯 Roles</h3>
<table border="1" cellpadding="6">
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>POST</td><td>/roles</td><td>Create role</td></tr>
<tr><td>GET</td><td>/roles</td><td>Get all roles</td></tr>
<tr><td>GET</td><td>/roles/{id}</td><td>Get role by ID</td></tr>
<tr><td>DELETE</td><td>/roles/{id}</td><td>Delete role</td></tr>
</table>

<h3>🔗 Role Skills</h3>
<table border="1" cellpadding="6">
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>POST</td><td>/role-skills</td><td>Map skill to role</td></tr>
</table>

<h3>📊 Gap Analysis</h3>
<table border="1" cellpadding="6">
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>GET</td><td>/skill-gap/user/{userId}/role/{roleId}</td><td>Analyze skill gap</td></tr>
</table>

<h3>💡 Recommendations</h3>
<table border="1" cellpadding="6">
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>GET</td><td>/recommendations/user/{userId}/role/{roleId}</td><td>Get skill improvement recommendations</td></tr>
</table>

<hr>

<h2>🗄 Database Tables</h2>
<ul>
  <li>users</li>
  <li>skills</li>
  <li>user_skills</li>
  <li>roles</li>
  <li>role_skills</li>
</ul>

<hr>

<h2>▶️ Run Locally</h2>
<ol>
  <li>Clone the repository</li>
  <li>Create MySQL database:</li>
</ol>

<pre>CREATE DATABASE skillgap;</pre>

<ol start="3">
  <li>Update <code>application.yml</code> with DB credentials</li>
  <li>Run the Spring Boot application</li>
</ol>

<hr>

<h2>🧪 Testing</h2>
<p>All APIs are tested using <strong>Postman</strong>.</p>

<hr>

<h2>🏁 Project Status</h2>
<p>
<strong>SGA 1.0 Completed.</strong><br>
This version represents a full backend learning implementation of a real-world skill analysis system.
Further enhancements like learning paths or UI integration can be future extensions.
</p>

<hr>

<h2>👨‍💻 Author</h2>
<p>
Backend learning project focused on real-world architecture, clean code practices, and scalable system design.
</p>

</body>
</html>
