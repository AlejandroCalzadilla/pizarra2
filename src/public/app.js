//const socket = require("../socket");

function init(){



    //el mouse
    let mouse ={
       click:false,
       move: false,
       pos:{x:0,y:0},
       pos_prev:false
    };





    //canvas dibujar 
    const canvas=document.getElementById('drawing');
    const context=canvas.getContext('2d');
    const width=window.innerWidth;
    const height=window.innerHeight;
    canvas.width=width;
    canvas.height=height;     


    
     //para el socket 
    const socket=io();



   //tengo las 3 


    //cuandos haces click     tengo esta opcion  
    canvas.addEventListener('mousedown',(e)=>{
     mouse.click=true;
     //console.log(mouse);
    });




    //cuando dejas de hacer click tengo esta opcion 
    canvas.addEventListener('mouseup',(e)=>{
       mouse.click=false;
      // console.log(mouse)

    })
     
    //cunado se esta movimiento    
    canvas.addEventListener('mousemove',(e)=>{
        mouse.pos.x=e.clientX/width;
        mouse.pos.y=e.clientY/height;
        mouse.move=true;
       //console.log(mouse)
    });







     ///el socket --------------------------------------------------




        // cuando le llega dibujar  
       socket.on('draw_line',data=>{
             
          const line =data.line;
          console.log(line)
          //dibuja 
          context.beginPath();
          context.moveTo(line[0].x * width,line[1].y * height); 
          context.lineTo(line[1].x * width,line[1].y * height); 
          context.lineWhidth=2;
          context.stroke();
           
       })


          // pasas 
         function mainLoop(){
          //si le diste click lo moviste y lo soltaste      
          if(mouse.click && mouse.move && mouse.pos_prev){
            // se le pasa
             socket.emit('draw_line',{line:[mouse.pos, mouse.pos_prev]});
             mouse.move=false;
          }    

          //  posicion previa igual a 
           mouse.pos_prev={x:mouse.pos.x , y:mouse.pos.y}             
            setTimeout(mainLoop,25);
         }
        mainLoop();

   //----------------------------------------------------

    
      




}

document.addEventListener('DOMContentLoaded',init)