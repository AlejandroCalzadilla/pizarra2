//const socket = require("../socket");

function init(){

    let mouse ={
       click:false,
       move: false,
       pos:{x:0,y:0},
       pos_prev:false
    };
    //canvas
    const canvas=document.getElementById('drawing');
    const context=canvas.getContext('2d');
    const width=window.innerWidth;
    const height=window.innerHeight;
    
    canvas.width=width;
    canvas.height=height;

     
     const socket=io();



    //cuandos haces click 
    canvas.addEventListener('mousedown',(e)=>{
     mouse.click=true;
     //console.log(mouse);

    });
    //cuando dejas de hacer click
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



       //le llega 
       socket.on('draw_line',data=>{
          console.log('hola')  ;
          const line =data.line;
          context.beginPath();
          //console.log(line[1].y )
          //console.log(line[1].x * width,'y', line[1].y * height)
          context.moveTo(line[0].x * width,line[1].y * height); 
          context.lineTo(line[1].x * width,line[1].y * height); 
          context.lineWhidth=2;
           context.stroke();
           
       })



         // le nevia 
         function mainLoop(){
               
          if(mouse.click && mouse.move && mouse.pos_prev){
             socket.emit('draw_line',{line:[mouse.pos, mouse.pos_prev]});
             mouse.move=false;
          }    
           mouse.pos_prev={x:mouse.pos.x,y:mouse.pos.y}             
            setTimeout(mainLoop,25);
         }
        mainLoop();

  
     


}

document.addEventListener('DOMContentLoaded',init)