
function createWebSocketServer(io) {

   io.on('connection', function (socket) {
      console.log('connection came!');

      socket.on('hello', function (data) {
         console.log('hello came!');
         socket.emit('hello', { message: 'thank you hello!' });
      });
   });

}




module.exports = {
   createWebSocketServer: createWebSocketServer
};