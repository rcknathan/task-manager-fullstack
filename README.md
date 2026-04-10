<h1 align="center">🧠 Task Manager Fullstack</h1>

<p align="center">
  A complete task management system with JWT authentication, built with Node.js backend and React frontend.
</p>

<p align="center">
  <a href="https://task-manager-fullstack-taupe.vercel.app" target="_blank">
    🔗 Access application
  </a>
</p>

---

## 🧩 About the Project

This is a complete fullstack project that allows:

* ✅ Create a user account
* 🔐 Authenticate using JWT
* 📝 Create tasks
* 📋 List tasks
* ✏️ Edit tasks
* ❌ Delete tasks

Each user has their own tasks (isolated through authentication).

---

## ⚙️ Technologies Used

### 🔙 Backend

* Node.js
* Express
* PostgreSQL (Supabase)
* JWT (Authentication)
* bcrypt (Password hashing)

### 🔜 Frontend

* React
* Axios
* LocalStorage (login persistence)

### ☁️ Deploy

* Backend: Render
* Frontend: Vercel
* Database: Supabase

---

## 🔐 Authentication

The system uses **JWT (JSON Web Token)**:

1. User logs in
2. Receives a token
3. Token is stored in `localStorage`
4. Sent automatically in protected requests

Example header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 🗄️ Database Structure

### `users` table

```sql
id SERIAL PRIMARY KEY
email TEXT UNIQUE NOT NULL
password TEXT NOT NULL
```

### `tasks` table

```sql
id SERIAL PRIMARY KEY
title TEXT NOT NULL
completed BOOLEAN DEFAULT false
user_id INTEGER REFERENCES users(id)
```

---

## 🔄 CRUD Features

| Method | Route      | Description |
| ------ | ---------- | ----------- |
| POST   | /tasks     | Create task |
| GET    | /tasks     | List tasks  |
| PUT    | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |

---

## 🌐 Deployment and Important Notes

### 🔴 Backend (Render)

The backend is hosted on **Render (free plan)**.

⚠️ **IMPORTANT:**

* The server may "sleep" after a few minutes of inactivity
* The first request may take ~30 seconds

💡 This is normal in free environments

---

### 🟢 Frontend (Vercel)

👉 https://task-manager-fullstack-taupe.vercel.app

* Automatic deploy via GitHub
* Optimized build
* Global CDN

---

### 🟣 Database (Supabase)

* Managed PostgreSQL
* Real data persistence

---

## 📁 Project Structure

```
task-manager-fullstack/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── db.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│
└── README.md
```

---

## 🧠 Technical Decisions

* JWT instead of sessions → more scalable
* PostgreSQL → real-world technology
* Frontend/backend separation → professional architecture
* Real deployment → practical experience

---

## 🚀 Running locally

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

---

## ⚠️ Environment Variables

### Backend (.env)

```env
DATABASE_URL=...
JWT_SECRET=...
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:3000
```

---

## 💡 Possible Improvements

* UI with Tailwind / Material UI
* Task filtering
* Pagination
* Refresh token
* Dark mode 🌙

---

## 👨‍💻 Author

Built by **Erick Nathan** 🚀

---

<p align="center">
  ⭐ If you liked it, leave a star on the repository!
</p>
