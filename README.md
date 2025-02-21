# User Management App

## Overview

This is a **User Management App** built with **React (Frontend)** and **Node.js with Express (Backend)**. It supports **user authentication**, **role management**, and **secure API access** using **JWT-based authentication**. The backend uses **MongoDB** for data storage and handles profile images using **local file storage**.

---

## Table of Contents

- [Backend](#backend)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Server](#running-the-server)
- [Frontend](#frontend)
  - [Features](#features-1)
  - [Tech Stack](#tech-stack-1)
  - [Installation](#installation-1)
  - [Running the Frontend](#running-the-frontend)
- [Project Structure](#project-structure)
- [License](#license)

---

## Backend

### Features

- User authentication (Sign up, Login, Logout)
- Role-based access control (Admin, User, etc.)
- JWT-based authentication
- Profile picture upload (using **Multer & local file storage**)
- Secure password hashing (using **bcrypt**)
- CRUD operations for users
- Dashboard metrics

### Tech Stack

- **Node.js** - Backend runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT-based authentication
- **multer** - Image upload using local storage
- **dotenv** - Environment variable management

### Installation

#### 1. Clone the repository

```sh
git clone https://github.com/Vipuljainmca/user-managment.git
cd user-management-app/backend
```

#### 2. Install dependencies

```sh
npm install
```

#### 3. Setup environment variables

Create a `.env` file in the backend root directory and add the following:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
UPLOADS_FOLDER=uploads/
```

### Running the Server

To start the backend server in development mode:

```sh
npm run dev
```

For production:

```sh
npm start
```

---

## Frontend

### Features

- User authentication with JWT
- Role-based navigation and access control
- Redux for state management
- Responsive UI using Ant Design
- Dashboard displaying user metrics

### Tech Stack

- **React.js** - Frontend framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - API requests
- **Ant Design** - UI components
- **Day.js & Moment.js** - Date handling

### Installation

#### 1. Navigate to frontend directory

```sh
cd ../frontend
```

#### 2. Install dependencies

```sh
npm install
```

### Running the Frontend

To start the frontend in development mode:

```sh
npm start
```

For production build:

```sh
npm run build
```

---

## Project Structure

```
user-management-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── uploads/
│   ├── index.js
│   ├── package.json
│   ├── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
│
└── README.md
```

---

## License

This project is licensed under the **ISC License**. Feel free to modify and use it as per your needs.

