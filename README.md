REAL-TIME COLLABORATIVE TEXT EDITOR

COMPANY: CODTECH IT SOLUTIONS

NAME: VishaL

INTERN ID: CT04DY127

DOMAIN: FULL STACK WEB DEVELOPMENT

BATCH DURATION: August 22nd, 2025 to September 22nd, 2025

MENTOR NAME: VINISH VATS

DESCRIPTION OF TASK PERFORMED :

As a part of my CODTECH internship, I developed a Real-time Collaborative Text Editor using the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. The goal of this project was to create a simple but fully functional tool that allows multiple users to edit the same document simultaneously and see live updates in real-time.

The backend is built with Node.js and Express, with Socket.IO enabling real-time WebSocket communication. MongoDB is used for document persistence, allowing changes to be automatically saved and loaded. Mongoose is used for schema modeling, and RESTful API endpoints handle document operations. Users can also see who else is currently online, with avatars displayed in real-time.

The frontend is built with React 18, using hooks like useState, useEffect, and useRef to manage state and DOM interactions. Users can join documents via shareable IDs, see live updates, and view word/character counts. The interface is fully responsive for desktop and mobile devices.

Challenges faced during development included managing real-time synchronization across multiple clients, handling connection errors, and ensuring smooth document persistence without performance issues. These were addressed using Socket.IO events, debounced updates, and proper MongoDB indexing.

This project demonstrates full-stack web development, real-time collaborative applications, and API integration, making it both practical and visually interactive. Users can experience seamless collaboration with live updates, user presence tracking, and persistent storage.

OUTPUT OF THE TASK
<img width="1897" height="907" alt="image" src="https://github.com/user-attachments/assets/ad7cc472-246b-419d-bcf1-0f63d997a62d" />




KEY FEATURES
Backend (Node.js + Express + Socket.IO)

Real-time WebSocket communication

MongoDB integration with Mongoose

Document persistence and auto-save

User presence tracking

RESTful API endpoints

Frontend (React 18)

Real-time text synchronization

Live user list with colored avatars

Word/character counting

Responsive design for desktop and mobile

Connection status indicators

PROJECT STRUCTURE
collaborative-editor/
├── backend/
│   ├── models/
│   │   └── Document.js
│   ├── routes/
│   │   └── documentRoutes.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── .env
└── README.md

ENVIRONMENT VARIABLES
Backend .env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/collaborative-editor
CLIENT_URL=http://localhost:3000
DEBUG=true

Frontend .env
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_API_URL=http://localhost:5000/api


💡 For MongoDB Atlas, replace MONGODB_URI with your cloud connection string.

SETUP & INSTALLATION
1. Backend Setup
cd backend
npm install
# Copy the .env content above
npm start
# Or for development with auto-restart:
npm run dev

2. Frontend Setup
cd frontend
npm install
# Copy the .env content above
npm start

3. MongoDB Setup

Option A: Local MongoDB

Install MongoDB Community Server: https://www.mongodb.com/try/download/community

Start MongoDB service

Use URI: mongodb://localhost:27017/collaborative-editor

Option B: MongoDB Atlas (Cloud)

Create a free account at https://www.mongodb.com/cloud/atlas

Create a cluster and database

Copy connection string into .env

TESTING REAL-TIME COLLABORATION

Open http://localhost:3000 in two different browser windows.

Enter different user names but the same document ID.

Start typing and watch live updates in real-time.

FUTURE IMPROVEMENTS

Rich text formatting (bold, italic, lists)

User authentication and access control

Version history and undo/redo

File export (PDF/Word)

AUTHOR

Developed by VishaL 🚀
