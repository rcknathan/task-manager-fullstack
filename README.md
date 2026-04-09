# 🚀 Task Manager Full-Stack

Full-stack task management application with authentication, user isolation, and complete CRUD operations.

## 🔥 Features

* User authentication (JWT)
* Protected routes
* Full CRUD for tasks
* User-specific data isolation
* RESTful API architecture

## 🛠 Tech Stack

**Backend**

* Node.js
* Express
* PostgreSQL
* JWT Authentication

**Frontend**

* React
* Fetch API
* LocalStorage (Auth persistence)

## 📌 API Endpoints

### Auth

* `POST /auth/register`
* `POST /auth/login`

### Tasks (Protected)

* `GET /tasks`
* `POST /tasks`
* `PUT /tasks/:id`
* `DELETE /tasks/:id`

## 🔐 Authentication

All task routes require a Bearer Token (JWT).

## 💻 Running Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## 📈 Project Highlights

* Clean architecture (services, controllers, routes)
* Secure user-based data handling
* Real-world full-stack structure
* Scalable and maintainable codebase

## 🎯 Status

Completed & fully functional
