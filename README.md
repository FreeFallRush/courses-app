# React Courses App

A full-stack React application for managing courses and authors.
This project was developed as part of the EPAM React training program and covers React fundamentals, forms, routing, Redux, and async state management.

---

## Live Demo

- Frontend: https://freefallrush-courses-app.netlify.app
- Backend API (Render): https://react-courses-app-1.onrender.com/api

---

## Important Note (Backend Loading)

The backend is hosted on Render (free tier).

The server may take **20–60 seconds to start** after inactivity.
If the app doesn’t work immediately:

- Open: https://react-courses-app-1.onrender.com/api
- Wait until it loads
- Then refresh the frontend app

---

## 📡 Backend & Swagger (EPAM)

The backend API is **provided by EPAM (not developed by me)** and deployed separately.

Swagger documentation:
https://react-courses-app-1.onrender.com/api

### How to use Swagger

1. Open the Swagger link
2. Wait for it to fully load (important ⚠️)
3. Expand any endpoint (e.g. `/login`, `/courses/all`)
4. Click **"Try it out"**
5. Execute requests directly from the browser

---

## Admin Access

Use these credentials to test full functionality:

```bash
email: admin@email.com
password: admin123
```

### Admin abilities:

- Create courses
- Update courses
- Delete courses
- Add authors

---

## Features

### 1️⃣ React Components

- Header with logo and logout
- Courses list
- CourseCard (course preview)
- CourseInfo (detailed view)
- EmptyCourseList
- Reusable Button & Input components

Each course includes:

- Title
- Description
- Authors
- Duration (hh:mm format)
- Creation date

---

### 2️⃣ Forms & Validation

Built using React hooks (`useState`).

#### Authentication

- Registration (name, email, password)
- Login (email, password)
- Validation for all fields

#### Course Creation (Admin)

- Add title & description
- Set duration
- Create authors
- Assign/remove authors
- Save new courses

---

### 3️⃣ Routing

Implemented using react-router-dom

Routes:

```
/login
/registration
/courses
/courses/:courseId
/courses/add
/courses/update/:courseId
```

Features:

- Protected routes
- Navigation & redirects
- Dynamic routing (`useParams`)

---

### 4️⃣ State Management (Redux Toolkit)

Global state managed with Redux Toolkit

Store structure:

```
store
├── user
├── courses
└── authors
```

Manages:

- Authentication state
- Courses list
- Authors list

---

### 5️⃣ Async Logic (Redux Thunk)

Async operations handled via Redux Thunk:

- Login / Registration
- Fetch courses & authors
- Add / update / delete courses
- Add authors
- Logout
- Get current user

All API logic is centralized in:

```
src/services.ts
```

---

## Role-Based Access

### Admin

- Full CRUD on courses
- Add authors

### Regular User

- View courses
- View course details

Protected using:

```
PrivateRoute component
```

---

## 🛠 Tech Stack

- React + TypeScript
- Vite
- Redux Toolkit
- React Redux
- React Router
- Redux Thunk
- Jest + Testing Library

---

## Project Structure

```
src
├── common
├── components
├── helpers
├── store
├── services.ts
├── App.tsx
└── main.tsx
```

---

## ▶️ Installation

```bash
git clone https://github.com/yourusername/react-courses-app.git
cd react-courses-app
npm install
npm run dev
```

---

## Testing

```bash
npm run test
```

---

## Notes

- Backend is external (EPAM training server)
- First request may be slow (Render free tier)
- Admin role required for course management

![React](https://img.shields.io/badge/React-18-blue)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
