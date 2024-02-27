const express=require('express');
const path=require('path')
const socketIO = require('socket.io');
const http=require('http');
//initialization
const app= express();
const servidor =http.createServer(app);
const io=socketIO(servidor);
//settings
app.set('port',process.env.PORT || 3000);
 


//middelewares
//socket 
require('./socket')(io)

//static filrs
app.use(express.static(path.join(__dirname,'public')));



//starting the serverf
servidor.listen(app.get('port'),()=>{
   console.log('server on port 3000')

});