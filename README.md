# AIC-CicakBelajar
---

# Wastara — Community-Powered Trash Reporting PWA

A progressive web app (PWA) that allows citizens to report trash pileups and enables cleanup personnel to locate and address them. Designed to improve environmental responsiveness through community participation.

---

## Overview

Wastara is a lightweight and mobile-first web app built for ease of reporting and coordination. It connects:

- Citizens — who report trash in public areas
- Organizers — designated trash pickup personnel (manual admin approval required)
- Admins — who oversee and approve organizers and monitor cleanup efforts

The app is targeted for communities such as those in Jakarta, Indonesia, where coordination and visibility are essential for efficient waste management.

---

## Features

Regular User

- Register and log in
- Report trash by location
- View submission history
- Cancel or edit pending reports

Organizer (Pickup Worker)

- Register with approval workflow
- View assigned trash locations
- Mark pickups as completed
- Track personal pickup history

Admin

- Approve or reject organizer accounts
- Monitor volume of trash reports
- View daily statistics (basic version)

---

## Pages

| Page                  | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| Landing Page           | App overview with call to action and login/register buttons                 |
| Login Page             | Dual login (User and Organizer) with redirects                              |
| Registration Page      | Registration for Users or Organizers with optional document upload          |
| User Dashboard         | Report trash (auto-locate), view recent activity and statistics             |
| My Reports Page        | Manage submitted reports (status, edit, cancel)                             |
| Organizer Dashboard    | View nearby trash reports and mark as picked                               |
| Admin Panel (Basic)    | Approve or reject organizers, view system-wide reports                      |
| Pending Approval Page  | Displays pending status message for unapproved organizers                   |
| Settings Page (Optional)| Profile editing, password change, logout                                   |

---

## Tech Stack

Frontend

- React (with Vite or Create React App)
- React Router
- Tailwind CSS
- PWA support via Workbox or Vite PWA plugin

Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads (optional)

Other Tools

- Git + GitHub
- Postman for API testing
- Railway or Render for backend hosting
- Vercel for frontend deployment

---

## MVP Scope

| Feature                          | Included |
|----------------------------------|----------|
| User and Organizer registration  | Yes      |
| Organizer approval system        | Yes      |
| Trash reporting with location    | Yes      |
| Organizer dashboard              | Yes      |
| Admin interface (basic)          | Yes      |
| Map clustering / Heatmaps        | Yes       |
| WhatsApp/Notification integration| No       |
| Settings page                    | Optional |

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
