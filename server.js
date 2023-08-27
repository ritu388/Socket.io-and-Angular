const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const cors = require('cors'); 
const PORT = process.env.PORT || 3000;
app.use(cors());
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sendData', (data) => {
    // recieved a message from the client
    io.emit('receiveData', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});