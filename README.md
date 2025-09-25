```markdown
# Edu360 🎓

Edu360 is a **full-stack web application** designed to streamline academic activity management for students, teachers, and admins. It provides role-based dashboards, a post system, and secure authentication with a responsive and attractive UI.

🔗 **Live Demo:** [Edu360](https://edu360-frontend.s3-website.ap-south-1.amazonaws.com/)

---

## 📌 Project Overview

Edu360 enables students to upload and track activities, teachers to verify submissions and create posts, and admins to manage global announcements.  
It is built using **React.js** (frontend) and **Spring Boot** (backend), with **JWT-based authentication** for security and deployed on **AWS**.

---

## 🚀 Features

- **User Authentication**
  - JWT-based login, register, and OTP verification.
- **Role Management**
  - `STUDENT`, `TEACHER`, and `ADMIN`.
- **Student Dashboard**
  - Upload activities.
  - View verified/pending activities.
  - Manage profile.
- **Teacher Dashboard**
  - Verify student activities.
  - Manage pending/verified activities.
  - Create posts.
- **Admin Dashboard**
  - Create global posts.
  - Manage all posts.
- **Profile Setup Flow**
  - Both students and teachers set up profiles before accessing dashboards.
- **Posts System**
  - Create, view, and manage posts (role-based).
- **Responsive UI**
  - Tailwind CSS styling with **Lucide icons**.

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Lucide Icons

### Backend
- Spring Boot
- Spring Security (JWT)
- JPA / Hibernate
- MySQL

### Deployment
- Frontend → AWS S3 (Static Website Hosting)
- Backend → AWS EC2
- Database → AWS RDS (MySQL)

---

## 📂 Folder Structure (Frontend)

```

edu360-frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/              # API calls
│   ├── assets/           # Static assets
│   ├── components/       # Reusable UI components
│   ├── context/          # Auth & global context
│   ├── pages/            # Page-level components (Dashboard, Login, Register, etc.)
│   ├── routes/           # Route definitions
│   ├── styles/           # Global styles
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Tailwind setup
└── package.json

````

---

## ⚡ Getting Started

### Prerequisites
- Node.js (>= 16.x)
- Java (>= 17)
- MySQL (>= 8.0)
- Maven (for backend build)

### Clone the Repository
```bash
git clone https://github.com/your-username/edu360.git
cd edu360
````

---

## 🖥 Frontend Setup

```bash
cd edu360-frontend
npm install
npm run dev   # Start development server
```

---

## ⚙️ Backend Setup

1. Configure **application.properties**:

   ```properties
   spring.datasource.url=jdbc:mysql://<RDS-ENDPOINT>:3306/edu360
   spring.datasource.username=<DB-USERNAME>
   spring.datasource.password=<DB-PASSWORD>
   jwt.secret=<your-jwt-secret>
   ```

2. Run backend:

   ```bash
   mvn spring-boot:run
   ```

---

## 🏗 Build & Deployment

### Frontend

```bash
npm run build
# Deploy /dist folder to AWS S3 bucket (static hosting enabled)
```

### Backend

```bash
mvn clean package
# Deploy generated JAR to AWS EC2
java -jar target/Edu360-0.0.1-SNAPSHOT.jar
```

---

## 🌍 Live Demo

🔗 [Edu360](https://edu360-frontend.s3-website.ap-south-1.amazonaws.com/)

---

## 👨‍💻 Contributors

- [Tarak Ram](https://github.com/Tarakram798996) – Backend Development (Spring Boot, MySQL, JWT Security)  
- [Charan Sai](https://github.com/charan-sai-ramisetti) – Deployment (AWS EC2, S3, RDS)  
- [Raghava](https://github.com/Raghava-2812) – Frontend Development (React.js, Tailwind CSS, UI/UX)  

---

## 📜 License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute it with attribution.

---

```

Would you like me to also add **API endpoint documentation** (login, register, posts, etc.) in the README so contributors can test backend APIs easily?
```
