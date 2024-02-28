module.exports = io=>{
    
   //le envia un vecctor  
   var line_history=[];  
    
    io.on('connection',socket=>{
        console.log('new user connected ddasdas');
          
        //esto es cuando un usuario nuevo se despliega el historial 
       for (let i in line_history){
          console.log(line_history ,'history')
           socket.emit('draw_line',{line:line_history[i]});

       }   
        socket.on('draw_line',data=>{
             //console.log(data ,'data');
             console.log(data.line)
             line_history.push(data.line);
          io.emit('draw_line',{line:data.line});       
       }) 
    })
}