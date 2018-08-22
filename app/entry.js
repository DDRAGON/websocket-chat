import io from 'socket.io-client';

const socket = io('http://localhost:3000');
socket.on('hello', (data) => {
   console.log('hello come!');
   console.log(data.message);
});

socket.emit('hello', { message: 'nyan nyan' });
