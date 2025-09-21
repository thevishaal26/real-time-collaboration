const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Import models and routes
const Document = require('./models/Document');
const documentRoutes = require('./routes/documents');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/documents', documentRoutes);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/collaborative-editor';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Store active users and document states
const activeUsers = new Map();
const documentRooms = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join document room
  socket.on('join-document', async (documentId, userName) => {
    try {
      socket.join(documentId);
      
      // Add user to active users
      activeUsers.set(socket.id, {
        id: socket.id,
        name: userName || `User ${socket.id.slice(0, 6)}`,
        documentId
      });

      // Get or create document
      let document = await Document.findById(documentId);
      if (!document) {
        document = new Document({
          _id: documentId,
          title: 'Untitled Document',
          content: 'Start typing here...'
        });
        await document.save();
      }

      // Send current document content to the joining user
      socket.emit('document-loaded', document);

      // Get users in this document room
      const roomUsers = Array.from(activeUsers.values())
        .filter(user => user.documentId === documentId);
      
      // Notify all users in the room about user list update
      io.to(documentId).emit('users-updated', roomUsers);

      console.log(`User ${userName} joined document ${documentId}`);
    } catch (error) {
      console.error('Error joining document:', error);
      socket.emit('error', 'Failed to join document');
    }
  });

  // Handle text changes
  socket.on('text-change', async (documentId, content) => {
    try {
      // Update document in database
      await Document.findByIdAndUpdate(documentId, { 
        content,
        lastModified: new Date()
      });

      // Broadcast change to all users in the document room except sender
      socket.to(documentId).emit('text-changed', content);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  });

  // Handle cursor position updates
  socket.on('cursor-change', (documentId, cursorPosition) => {
    const user = activeUsers.get(socket.id);
    if (user) {
      socket.to(documentId).emit('cursor-changed', {
        userId: socket.id,
        userName: user.name,
        position: cursorPosition
      });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      const { documentId } = user;
      activeUsers.delete(socket.id);

      // Update users list for the document room
      const roomUsers = Array.from(activeUsers.values())
        .filter(u => u.documentId === documentId);
      
      io.to(documentId).emit('users-updated', roomUsers);
      console.log(`User ${user.name} disconnected from document ${documentId}`);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});