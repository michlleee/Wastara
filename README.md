# AIC-CicakBelajar
---

# Wastara — Community-Powered Trash Reporting Web Application

A web application that allows citizens to report trash pileups and enables cleanup personnel to locate and address them. Designed to improve environmental responsiveness through community participation.

---

## Overview

Wastara is a lightweight and mobile-first web app built for ease of reporting and coordination. It connects:

- Citizens — who report trash in public areas
- Organizers — designated trash pickup personnel (manual admin approval required)

The app is targeted for communities such as those in Jakarta, Indonesia, where coordination and visibility are essential for efficient waste management.

---

## Features

Regular User

- Register and log in
- Report trash by location
- View total reports & completed pickups
- Cancel pending reports

Organizer (Pickup Worker)

- Register with approval workflow
- Request & view assigned trash locations
- Mark pickups as completed
- Cancel pickups

---

## Pages


- Landing Page:
Modern landing page showcasing Wastara's features, vision & mission, and FAQs. Includes hero section, about us, problem statement, features overview and footer.
- User Registration:
Sign up form for regular users with email/password or Google OAuth. Collects basic user information.
- Organizer Registration:
Two-step registration for waste management organizers. Requires organization details, WhatsApp number and KTP document upload.
- Login Page:
Unified login page with role toggle between User/Organizer. Supports both traditional and Google OAuth authentication.
- User Dashboard:
Central hub for users to submit trash reports, view their reporting history, and track pickup status. Features report statistics and quick-action reporting button.
- Add Report Page:
Dedicated form for users to submit new trash reports with location detection, photo upload and description fields.
- Organizer Dashboard:
Command center for waste management teams to view assigned pickups, optimize routes using AI clustering, and manage cleanup operations within their service radius.

---

## Tech Stack

Frontend

- React (with Vite or Create React App)
- React Router
- Tailwind CSS

Backend
- Node.js with Express
- MongoDB with Mongoose
- Bcrypt for password hashing
- CORS for cross-origin requests between frontend and backend

Deployment
- MongoDB Atlas for database
- Vercel for frontend
- Railway for backend

Other Tools
- Git + GitHub
- Postman for API testing
- Railway for backend hosting
- Vercel for frontend deployment

---

## Local Setup

1. Clone the repository:
```
    git clone https://github.com/michlleee/trashtrack.git
    cd trashtrack
```
2. Install frontend dependencies:
```
    cd client
    npm install
    npm run dev
```
3. Install backend dependencies:
```
    cd ../server
    npm install
    npm run dev
```
4. Create environment variables:

Create a .env file inside the /server directory with the following content:
```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
```
---

## Folder Structure
```
    /client
      /src
        /pages
        /components
        /contexts
        /services

    /server
      /routes
      /models
      /middleware
      server.js
```
---

## Future Improvements

- Offline reporting capabilities via service workers
- SMS or WhatsApp notifications for organizers
- Admin analytics dashboard with charts
- AI image recognition for trash classification

---
