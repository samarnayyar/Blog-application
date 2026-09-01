# 🌿 Nature Blogs — Full-Stack MERN Application

A modern, responsive, full-stack blog platform built with the **MERN** stack (MongoDB, Express.js, React 19, Node.js), styled with **Tailwind CSS v4**, and bundled with **Vite**.

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-v7-646CFF?logo=vite&logoColor=white)

---

## ✨ Features

- 📰 **Dynamic 5-Column Grid Layout**: Responsive grid showcasing blog previews with smooth hover lift and image zoom animations.
- 🔄 **Grid / List View Switcher**: Toggle between a dense multi-column grid and a clean vertical reading list.
- 🔒 **Author-Protected Post Editing**: Secure verification modal protecting the edit route using author passcode verification.
- 👁️ **2D Real-Time View Counter**: Automatically tracks and increments views when an article is read.
- 📝 **Full CRUD Operations**: Create, read, edit, and delete articles with rich text and image support.
- 💬 **Interactive Comments Section**: Add and view real-time comments on individual blog posts.
- ⚡ **High-Performance Architecture**: GPU-accelerated background layer eliminating scroll jank, paired with a custom smooth scrollbar.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, React Router DOM 7, Tailwind CSS v4, Vite 7 |
| **Backend** | Node.js, Express.js 5, Morgan, CORS, Dotenv |
| **Database** | MongoDB Atlas (Cloud NoSQL) via Mongoose 8 |
| **Dev Tools** | Nodemon, ESLint |

---

## 📁 Project Structure

```bash
blog-application/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components (BlogCard, Navbar, etc.)
│   │   ├── layout/         # Main layout wrapper
│   │   ├── pages/          # Pages (Home, BlogDetails, CreatePost, EditPost)
│   │   ├── App.jsx         # App routes & GPU-accelerated background
│   │   └── main.jsx        # App entry point
│   ├── package.json
│   └── vite.config.js      # Vite config with API reverse proxy
│
├── server/                 # Backend REST API
│   ├── models/             # Mongoose schemas (Blog, Comments)
│   ├── .env.example        # Environment variable template
│   ├── index.js            # Express server & API routes
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB Atlas** account (or local MongoDB)

---

### 2. Setup Backend (`server`)

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   * Create a `.env` file in the `server` folder (or copy from `.env.example`):
     ```env
     PORT=3000
     MONGO_URI=your_mongodb_atlas_connection_string
     CLIENT_URL=http://localhost:5173
     ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   Server will run at: `http://localhost:3000`

---

### 3. Setup Frontend (`client`)

1. In a new terminal, navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
   Client will launch at: `http://localhost:5173`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | API Health Check |
| `GET` | `/api/blogs` | Get all blog posts (sorted by newest) |
| `GET` | `/api/blogs/:id` | Get single blog post (`?increment=true` to count view) |
| `POST` | `/api/blogs` | Create a new blog post |
| `PUT` | `/api/blogs/:id` | Update an existing blog post |
| `DELETE`| `/api/blogs/:id` | Delete a blog post |
| `POST` | `/api/blogs/:id/comments` | Add a comment to a blog post |

---

## 🔒 Security & Best Practices

- **Zero-leak Git policy**: Sensitive database credentials and `.env` files are ignored by git.
- **CORS Protection**: Configured with strict origin checks to protect backend resources.
- **Modular Component Design**: Clean separation of concerns between client and server architectures.

---

## 👨‍💻 Author

**Samar Nayyar**
- GitHub: [@samarnayyar](https://github.com/samarnayyar)
