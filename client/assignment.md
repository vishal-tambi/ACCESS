# Mini User Management System

## 📄 Assessment Brief

Build a **User Management System** — a web application that manages user accounts with different roles and permissions.

The system must support:
- User authentication
- Role-based authorization
- Basic user lifecycle management

please focus on :
- Authentication flows
- API security
- Role-Based Access Control (RBAC)
- Clean architectural patterns

---

## 🛠️ Tech Stack Requirements

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Frontend
- next.js + tailwindcss + GSAP

### Authentication
- JWT or session-based authentication

### Password Hashing
- bcrypt or argon2

---

## 🎯 Task

Build a **full-stack web application** with the following features.

---

## 1️⃣ Backend Requirements

### Stack
- Node.js + Express
- MongoDB

---

### 🔐 Authentication

#### User Signup
- Email
- Password
- Full name
- Email format validation
- Password strength validation
- Authentication token generated on signup

#### User Login
- Email and password
- Credential verification
- Authentication token generated on login

#### Other Auth Features
- Endpoint to get current user information
- User logout functionality

---

### 👑 User Management — Admin Functions
- View all users (with pagination)
- Activate user accounts
- Deactivate user accounts

---

### 👤 User Management — User Functions
- View own profile information
- Update:
  - Full name
  - Email
- Change password

---

### 🔒 Security Requirements
- Password hashing using bcrypt or argon2
- Protected routes (authentication required)
- Role-Based Access Control (RBAC)
  - admin
  - user
- Input validation on all endpoints
- Consistent error response format
- Proper HTTP status codes
- Environment variables for sensitive data  
  - Example: JWT secret

---

## 2️⃣ Frontend Requirements

### 🔑 Login Page
- Email input
- Password input
- Client-side form validation
- Redirect to dashboard on success
- Error message display
- Link to signup page

---

### 📝 Signup Page
- Full name input
- Email input
- Password input
- Confirm password input
- Required field validation
- Email format validation
- Password strength validation
- Password confirmation matching
- Server-side error display
- Redirect to login on success

---

### 🗂️ Admin Dashboard
- Table displaying all users
- Columns:
  - Email
  - Full name
  - Role
  - Status
  - Actions
- Pagination (10 users per page)
- Activate user button
- Deactivate user button
- Confirmation dialog before actions
- Success/error notifications

---

### 🙍 User Profile Page
- Display user information
- Edit:
  - Full name
  - Email
- Change password section
- Save button
- Cancel button
- Success/error messages after updates

---

### 🧭 Navigation Bar
- Display logged-in user name
- Display user role
- Role-based navigation links
- Logout button
- Redirect to login after logout

---

### 🔐 Protected Routes
- Prevent unauthenticated access
- Admin-only pages restricted to admins
- Redirect to login for unauthorized users

---

### 🎨 User Interface Components
- Input fields with validation messages
- Primary action buttons
- Secondary action buttons
- Destructive action buttons
- Loading spinners during API calls
- Toast notifications:
  - Success
  - Error
  - Info
- Modal dialogs for confirmations
- Pagination for tables
- Clear error messages
- Responsive design:
  - Desktop
  - Mobile

---

## 3️⃣ Database Requirements

### 📦 User Collection Schema
- Unique email address (no duplicates)
- Securely hashed password
- Full name
- Role:
  - admin
  - user
- Status:
  - active
  - inactive
- Created date (auto-managed)
- Updated date (auto-managed)
- Last login timestamp

---

## 4️⃣ Additional Requirements
- Authentication:
  - Simple login system (JWT or session-based)
  - Only managers can use the tool
- Password hashing (bcrypt / argon2)
- JWT or session-based authentication
- Environment variables stored in `.env`
  - `.env` must be excluded via `.gitignore`
- CORS configuration for secure API access

---

## 🧪 Testing (Mandatory)
- At least **5 unit tests** for backend logic
- **Bonus:**
  - Integration tests
  - Frontend unit tests
- **Must be done**

---

## 🚨 Mandatory Section (Strict)

You must include:
- Unit & integration tests for:
  - Backend APIs and/or
  - Frontend components
- Dockerized setup:
  - Backend
  - Frontend
- CI/CD pipeline configuration:
  - GitHub Actions
- Caching for simulation results
