# URL Shortening Application 🚀

[![Netlify Status](https://api.netlify.com/api/v1/badges/e1e0ba60-19b3-45a8-8b7a-ce42331f1ee9/deploy-status)](https://app.netlify.com/sites/shorta/deploys)
[![Website](https://img.shields.io/website?down_message=offline&up_message=online&url=https%3A%2F%2Fshort.dasbharat.com/)](https://short.dasbharat.com/)

### Live Demo 🌐
[Visit the live website here!](https://short.dasbharat.com/)

## Overview 📄

This is a URL shortening application designed as a personal project to showcase my full-stack development skills. The app allows users to shorten URLs, manage them (update or delete), and view stats for each shortened URL.

- **Frontend**: React (Vite)
- **Backend**: Express.js
- **Database**: SQLite
- **Hosting**: 
  - Frontend: Netlify
  - Backend: Render.com

---

## Features ✨

- **Shorten URLs**: Quickly generate shortened versions of long URLs.
- **Update URLs**: Modify existing shortened URLs.
- **Delete URLs**: Remove shortened URLs from the database.
- **View Stats**: Check statistics like how many times the shortened URL was accessed.
- **Redirect**: Seamlessly redirect users to the original URL when accessing the shortened URL.

---

## Table of Contents 📚

- Getting Started
- Frontend
- Backend
- API Endpoints
- Technologies Used
- Future Improvements

---

## Getting Started 🚀

Follow the steps below to set up the project locally:

### Prerequisites 📦

- Node.js (v14 or higher)
- SQLite
- Git

### Clone the Repository 🛠️

```bash
git clone https://github.com/BharatDas04/shortenURL.git
cd shortenURL
```

### Install the Frontend dependencies 🛠️

```bash
cd frontend
npm install
```

### Install the Backend dependencies 🛠️

```bash
cd backend
npm install
```

### Running Locally 🖥️

#### Frontend
```bash
cd frontend
npm run dev
```
#### Backend
```bash
cd backend
npm start
```
#### .env
```bash
Make sure to update .env file.
```

## Frontend 🖼️

### Features
- #### React with Vite: 
Fast and modern front-end development using Vite as a build tool.
- #### Tailwind CSS:
Used for styling the application efficiently.
- #### Deployment
The frontend is deployed on Netlify, providing a smooth and fast experience for users.

---
## Backend 🖼️

### Features
- #### Express.js: 
Backend logic and RESTful API to handle URL shortening, management, and redirection.
- #### SQLite:
Lightweight database for storing URLs and their associated metadata.
- #### Deployment
The backend is hosted on Render.com, providing scalable and reliable performance for handling API requests.

## API Endpoints 🔗

### Below are the main API endpoints that power the application:
- #### POST /shorten - Create a shortened URL.
- #### PUT /shorten/update - Update a shortened URL.
- #### GET /shorten/:code/stats - Get stats for a specific shortened URL.
- #### DELETE /shorten/delete - Delete a shortened URL.
- #### GET /shorten/* - Redirect to the original URL using the shortened URL.

---
## Technologies Used 🛠️

### Frontend:
- #### React.js (with Vite for fast builds).
- #### Tailwind CSS (for modern and responsive styling).
### Backend:
- #### Node.js (with Express.js for server-side logic).
- #### SQLite (for database management).
### Deployment:
- #### Netlify (for hosting the frontend).
- #### Render.com (for hosting the backend).

---
## Future Improvements 🌱

- #### User Authentication:
  Allow users to sign up, log in, and manage their URLs.
- #### Custom Shortened URLs:
  Let users choose their own custom URL codes.
- #### Analytics Dashboard:
  Create a dashboard for more detailed insights and analytics.
- #### Click Tracking:
  Track individual click data with timestamps and IP addresses (anonymized).

---
## Contact 📧
- #### Feel free to reach out to me via [LinkedIn](https://www.linkedin.com/in/bharatdas04/) or email me at 2002bharatdas@gmail.com.
- #### [Project Link](https://roadmap.sh/projects/url-shortening-service)


