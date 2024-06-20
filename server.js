// server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const angkotRoutes = require('./routes/angkotRoutes');
const routeRoutes = require('./routes/routeRoutes');
const { PrismaClient } = require('@prisma/client');
const seed = require('./scripts/seed'); // Import the seed script

const prisma = new PrismaClient();
prisma.$connect()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((e) => {
    console.error('Failed to connect to database', e);
  });

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

app.use('/api/angkots', angkotRoutes);
app.use('/api/routes', routeRoutes); // Use the route routes

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('updateLocation', async (data) => {
    const { id, lat, lng, isUser } = data;
    try {
      if (isUser) {
        await prisma.user.update({
          where: { id },
          data: { lat, lng },
        });
      } else {
        await prisma.angkot.update({
          where: { id },
          data: { lat, lng },
        });
      }
      socket.broadcast.emit('locationUpdate', data);
    } catch (error) {
      console.error('Failed to update location:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, async () => {
  console.log('Server is running on port 3000');
  
  // try {
  //   await seed();
  //   console.log('Database seeded successfully');
  // } catch (e) {
  //   console.error('Failed to seed database:', e);
  //   process.exit(1);
  // }
});
