# Paschal Omereife | Full-Stack Software Engineer Portfolio

[![Live Portfolio](https://img.shields.io/badge/Live%20Portfolio-Vercel-black?logo=vercel)](https://paschalomereife.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite)]
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-0055FF?logo=framer)]
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)]
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)](https://render.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> A modern, interactive, full-stack portfolio website showcasing my work, skills, experience, and projects as a Full-Stack Software Engineer.

🔗 **Live Portfolio:** [paschalomereife.vercel.app](https://paschalomereife.vercel.app)

---

## 📸 Screenshots

### 🏠 Homepage

![Portfolio Homepage](screenshots/homepage.png)

### 👨🏽‍💻 About / Profile

![About Section](screenshots/about.png)

### 🚀 Projects

![Projects Section](screenshots/projects.png)

### 📩 Contact

![Contact Section](screenshots/contact.png)


---

## ✨ Overview

This repository contains the complete source code for my personal portfolio website, including both the **React frontend** and **Node.js/Express backend API**.

The portfolio was designed to provide a professional representation of my technical skills, experience, projects, and services while demonstrating my ability to build and deploy full-stack web applications.

The application combines a modern, highly interactive frontend with a secure backend API responsible for contact form processing, email notifications, database integration, validation, and security.

---

## 🎨 Frontend

The frontend is a responsive React application built with **Vite**, **Tailwind CSS**, and **Framer Motion**.

### Frontend Features

- Modern glassmorphism-inspired interface
- Fully responsive design from mobile to 4K displays
- Custom interactive cursor
- Smooth page and component animations
- Masonry project showcase
- Live project previews using Microlink API
- Lazy loading for images and components
- Code splitting for improved performance
- Image fallback handling
- SEO-friendly metadata
- Open Graph and Twitter card support
- GitHub statistics integration
- Integrated contact form
- Responsive navigation and mobile menu
- Interactive project cards
- Professional skills and experience sections

---

## ⚙️ Backend API

The backend is a Node.js and Express REST API that powers the portfolio's dynamic functionality.

### Backend Features

#### 🔐 Security

- Helmet security headers
- CORS configuration
- Rate limiting
- Input validation and sanitization
- Environment-based configuration
- Centralized error handling

#### 📧 Email System

- Contact form processing
- Email notifications
- Automated user responses
- Structured email templates
- Nodemailer integration

#### 🗄️ Database

- MongoDB Atlas integration
- Mongoose ODM
- Structured data models
- Environment-based database configuration

#### ⚡ Performance & Reliability

- Optimized API responses
- Error handling middleware
- Request logging
- Rate-limit protection
- Environment-specific configuration

---

## 🛠️ Tech Stack

### Frontend

- React 18
- Vite
- JavaScript
- Tailwind CSS
- Framer Motion
- React Masonry CSS
- React Intersection Observer
- Microlink API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemailer
- dotenv
- express-rate-limit
- Helmet
- CORS

### Development & Deployment

- Git
- GitHub
- VS Code
- Vercel
- Render
- MongoDB Atlas

---

## 📁 Project Structure

```text
my-portfolio/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── screenshots/
│   ├── homepage.png
│   ├── about.png
│   ├── projects.png
│   └── contact.png
│
├── .gitignore
└── README.md