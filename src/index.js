const express=require('express');
const path=require('path')
const socketIO = require('socket.io');
const http=require('http');
//initialization
var line_history=[];  
const app= express();
const servidor =http.createServer(app);
const io=socketIO(servidor);
var creadoHistory=[];  
//settings
app.set('port',process.env.PORT || 3000);
app.use(express.static(path.join(__dirname,'public')));
//require('./socket')(io)
// Conexión establecida con el socket
io.on('connection', (socket) => {
    socket.on('update_node', (data) => {
      //console.log(data); // Registrar los datos recibidos para la depuración
      // Almacenar la posición actualizada (tu lógica del lado del servidor aquí)
      const updatedData = { ...data }; // Clonar para evitar modificaciones
      // Difundir la actualización a todos los clientes conectados
      io.emit('node_updated', updatedData);
    });
    
    socket.on('creadop', (data) => {
        //console.log(data); // Registrar los datos recibidos para la depuración
        // Almacenar la posición actualizada (tu lógica del lado del servidor aquí)
        const updatedData = { ...data }; // Clonar para evitar modificaciones
        creadoHistory.push(updatedData);
         console.log(creadoHistory,'historial');
        // Difundir la actualización a todos los clientes conectados
        io.emit('creadoa', updatedData);
      
    
    });
     //socket.on('creadoa', (socket) => {
        // Enviar el historial al nuevo usuario
        for (let i in creadoHistory){
         console.log('prueba de buevo usuario')
         socket.emit('creadoa', creadoHistory[i]);
        }
     
        //});



  });
//static filr
//starting the serverf
servidor.listen(app.get('port'),()=>{
   console.log('server on port 3000')

});