# Epytodo 📝

A secure, Full-Stack Task Management Web Application built as part of the Epitech curriculum. This project combines a robust REST API backend with an intuitive web frontend, focused heavily on relational data integrity and defensive web security principles.

---

## 🌐 Web Architecture Overview

The application follows a classic client-server separation to ensure modularity and clean data flow:
- **Backend:** Powered by **Node.js** and **Express**, managing routing, core business logic, and database communication.
- **Frontend:** A clean web interface handling dynamic user registration, secure login sessions, and responsive task tracking dashboards.
- **Database:** **MySQL** handles relational storage, mapping users to their respective tasks securely.

---

## 🔐 Cybersecurity & Defensive Implementation

Instead of just building a functional web app, strict security constraints were implemented to protect user data and mitigate common web vulnerabilities:

*   **Cryptographic Password Hashing:** User passwords are never stored in plaintext. They are encrypted using secure cryptographic hashing algorithms (like `bcrypt`) during registration and verified securely upon login, preventing credential leaks in case of a database breach.
*   **Access Control & Multi-Tenancy Isolation:** A core security feature ensures strict data isolation. Middleware checks ownership on every request; a authenticated user is **strictly prevented from creating, viewing, updating, or deleting a todo belonging to someone else**.
*   **JWT-Based Authentication:** Stateless session management is handled via JSON Web Tokens (JWT). Protected routes require a valid token passed in the headers, securing the API endpoints against unauthorized access.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MySQL
- **Security:** JWT, Cryptographic Hashing (Bcrypt)
- **Frontend:** HTML5, CSS3, JavaScript (ES6)

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm installed
- MySQL Server running
