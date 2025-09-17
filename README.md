# Wastara — Community-Powered Trash Reporting Web Application

A web application that allows citizens to report trash pileups and enables cleanup personnel to locate and address them. Designed to improve environmental responsiveness through community participation.

Access the website here! --> https://wastara-frontend.vercel.app/

---

## Screenshots

<details>
  
<summary>Click to expand</summary>


**Landing Page**  
<img width="1911" height="906" alt="Landing Page" src="https://github.com/user-attachments/assets/be9045cd-b3dc-478f-8498-cb0a87b3358b" />

**User Dashboard**  
<img width="1911" height="904" alt="User Dashboard" src="https://github.com/user-attachments/assets/88630113-3ef1-4196-9d36-387d683073da" />

**Organizer Dashboard**  
<img width="1901" height="902" alt="Organizer Dashboard" src="https://github.com/user-attachments/assets/484230f5-707d-482f-80bd-5cdfd015f63e" />

</details>

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

## AI Routing Logic

Wastara includes a Python-based backend module that helps organizers focus on the most important trash reports by ranking and filtering them intelligently. This ensures faster response times and more efficient routing.

### How It Works

- **Urgency Scoring**  
  Each report is scored based on:
  - **Time**: Older reports are more urgent, using a log-scale scoring model.
  - **Text**: Description is analyzed using a combination of:
    - Keyword detection (e.g., *bau*, *beracun*)
    - Large Language Model via the Groq API (LLaMA 3.1)
  - **Distance**: Reports closer to the organizer are prioritized.

  > If the Groq API is unavailable, the system uses keyword scoring as a fallback.

- **Smart Filtering**  
  Only reports within a given working radius (default: 5 km) are considered. The system then selects the top K most urgent reports (default: 10).

- **Optimized Routing**  
  The selected reports are reordered to minimize travel distance using:
  - A **Nearest Neighbor** heuristic
  - A **2-Opt algorithm** for further route refinement

- **System Output Includes**:
  - Optimized report order for pickup
  - Estimated total distance (in km)
  - Google Maps link for the route
  - Summary stats (e.g., how many reports were excluded or selected)

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

---

## Future Improvements

- Offline reporting capabilities via service workers
- SMS or WhatsApp notifications for organizers
- Admin analytics dashboard with charts
- AI image recognition for trash classification

---
