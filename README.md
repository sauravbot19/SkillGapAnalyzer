<!DOCTYPE html>
<html>
<body>

<h1>Skill Gap Analyzer API</h1>
<p><strong>Spring Boot Backend Project — v1.0</strong></p>

<p>
I built this project to practice backend development with a real-world use case.
The idea is simple — given a user's current skills and a job role they're targeting,
the system figures out what's missing and what needs improvement.
Started small and kept adding modules until it felt complete enough to call it 1.0.
</p>

<hr>

<h2>Tech Stack</h2>
<ul>
  <li>Java 17</li>
  <li>Spring Boot 4</li>
  <li>Spring Data JPA</li>
  <li>MySQL</li>
  <li>Lombok</li>
  <li>Maven</li>
  <li>Postman for testing</li>
</ul>

<hr>

<h2>Architecture</h2>
<p>Standard layered architecture — Controller → Service → Repository → Database</p>
<p>Nothing fancy, just keeping things clean and separated.</p>

<hr>

<h2>What's Implemented</h2>

<h3>SGA0.1 — User & Skill Management</h3>
<ul>
  <li>Create users and skills</li>
  <li>Map users to their skills with proficiency levels</li>
</ul>

<h3>SGA0.2 — Role Management</h3>
<ul>
  <li>CRUD for job roles</li>
</ul>

<h3>SGA0.3 — Role-Skill Mapping</h3>
<ul>
  <li>Attach required skills to a role</li>
  <li>Set required proficiency per skill</li>
</ul>

<h3>SGA0.4 — Gap Analysis</h3>
<ul>
  <li>Compares what the user has vs what the role needs</li>
  <li>Flags missing skills and skills below required level</li>
</ul>

<h3>SGA0.5 / v1.0 — Recommendations</h3>
<ul>
  <li>Takes the gap result and turns it into suggestions</li>
  <li>Tells you whether to start learning, improve, or you're already good</li>
</ul>

<hr>

<h2>API Endpoints</h2>

<h3>Users & Skills</h3>
<table border="1" cellpadding="6">
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>POST</td><td>/users</td><td>Create user</td></tr>
<tr><td>GET</td><td>/users</td><td>Get all users</td></tr>
<tr><td>POST</td><td>/skills</td><td>Create skill</td></tr>
<tr><td>GET</td><td>/skills</td><td>Get all skills</td></tr>
<tr><td>POST</td><td>/user-skills</td><td>Map user to skill</td></tr>
</table>

<h3>Roles</h3>
<table border="1" cellpadding="6">
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>POST</td><td>/roles</td><td>Create role</td></tr>
<tr><td>GET</td><td>/roles</td><td>Get all roles</td></tr>
<tr><td>GET</td><td>/roles/{id}</td><td>Get role by ID</td></tr>
<tr><td>DELETE</td><td>/roles/{id}</td><td>Delete role</td></tr>
</table>

<h3>Role-Skill Mapping</h3>
<table border="1" cellpadding="6">
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>POST</td><td>/role-skills</td><td>Map skill to role</td></tr>
</table>

<h3>Gap Analysis</h3>
<table border="1" cellpadding="6">
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>GET</td><td>/skill-gap/user/{userId}/role/{roleId}</td><td>Run gap analysis</td></tr>
</table>

<h3>Recommendations</h3>
<table border="1" cellpadding="6">
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>GET</td><td>/recommendations/user/{userId}/role/{roleId}</td><td>Get recommendations</td></tr>
</table>

<hr>

<h2>Database</h2>
<p>5 tables: users, skills, user_skills, roles, role_skills</p>

<hr>

<h2>Running Locally</h2>
<ol>
  <li>Clone the repo</li>
  <li>Create the database: <code>CREATE DATABASE skillgap;</code></li>
  <li>Update <code>application.yml</code> with your DB credentials</li>
  <li>Run the app</li>
</ol>

<hr>

<h2>Status</h2>
<p>
v1.0 is done. Covers everything I originally planned — user skills, roles, gap analysis, and recommendations.
Might add learning path suggestions or a basic UI later, but for now this is a complete backend module.
</p>

</body>
</html>
