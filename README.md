# ACCESS | Elite User Management System

**ACCESS** is a premium, secure, and scalable user management platform designed for modern enterprises. It provides a robust backend for handling authentication, user roles, and profile management, coupled with a high-performance, visually stunning frontend interface.

## 🚀 Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Notifications**: Sonner

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Caching**: [Redis](https://redis.io/)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Bcrypt

### DevOps & Tools
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Testing**: Jest (Backend Integration Tests)
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 🛠️ Setup Instructions (Local)

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or setup in Cloud)
- Redis (Running locally or setup in Cloud)
- Docker Desktop (Optional, for containerized run)

### Option A: Using Docker (Recommended)
Run the entire application stack with a single command:
```bash
docker compose up --build
```
The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

### Option B: Manual Setup

#### 1. Backend Setup
```bash
cd server
npm install
npm start
```
*Server runs on port 5000.*

#### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
*Frontend runs on port 3000.*

---

## 🔑 Environment Variables

Create a `.env` file in the `server` directory and `client` root directory with the following variables:

### Backend (`server/.env`)
| Variable | Description |
| :--- | :--- |
| `PORT` | Server Port (default: 5000) |
| `MONGO_URI` | MongoDB Connection String |
| `JWT_SECRET` | Secret key for signing JWTs |
| `REDIS_URL` | Redis Connection String (e.g., redis://localhost:6379) |
| `NODE_ENV` | Environment mode (development/production) |
| `CLIENT_URL` | URL of the frontend (for CORS) |

### Frontend (`client/.env.local`)
| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Backend API URL (e.g., http://localhost:5000/api) |

---

## ☁️ Deployment Instructions

### Frontend (Vercel)
1.  Push code to GitHub.
2.  Import project into Vercel.
3.  Set Root Directory to `client`.
4.  Add Environment Variable: `NEXT_PUBLIC_API_URL`.
5.  Deploy.

### Backend (Render)
1.  Push code to GitHub.
2.  Create new Web Service on Render.
3.  Set Root Directory to `server`.
4.  Add Environment Variables (`MONGO_URI`, `JWT_SECRET`, `REDIS_URL`, `CLIENT_URL`).
5.  Deploy.

---

## 📡 API Documentation

### Authentication
`POST /api/auth/register`
- **Body**: `{ "name": "John", "email": "john@example.com", "password": "securepassword" }`
- **Response**: `{ "token": "jwt_token", "user": { ... } }`

`POST /api/auth/login`
- **Body**: `{ "email": "john@example.com", "password": "securepassword" }`
- **Response**: `{ "token": "jwt_token", "user": { ... } }`

### User Management (Admin Only)
`GET /api/users`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: List of all users (Cached with Redis).

`GET /api/users/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Detailed user object.

`PATCH /api/users/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "status": "active" | "inactive" }`
- **Response**: Updated user object.

### Profile
`PUT /api/users/profile`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ "name": "...", "bio": "...", "phone": "..." }`
- **Response**: Updated profile.

---
**Purple Merit Technologies**
