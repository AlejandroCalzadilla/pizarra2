import { Actor } from './actor.js';
import { LifeLine } from './lifeline.js';

const dropZone = document.getElementById("actorCanvas");
const ctx = dropZone.getContext("2d");
let nodes = [];
let selectedNode = null;
let x, y, t, l;
let xp,yp;
let i=1;
function inicializarElementoArrastrable(elemento) {
  elemento.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("text/plain", elemento.id);
  });

  dropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
  });
}

// Inicializar los elementos arrastrables una vez al cargar la página
const draggableElement1 = document.getElementById("draggableElement");
const draggableElement2 = document.getElementById("draggable2");

inicializarElementoArrastrable(draggableElement1);
inicializarElementoArrastrable(draggableElement2);

// Al soltar el elemento
dropZone.addEventListener("drop", function (event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain");
  const draggedElement = document.getElementById(data);
  const canvasRect = dropZone.getBoundingClientRect();
  const x = event.clientX - canvasRect.left;
  const y = event.clientY - canvasRect.top;

  // Verificar cuál es el elemento arrastrable y actuar en consecuencia
  if (draggedElement === draggableElement1) {
    ctx.fillStyle = "#3498db";
    if(i==1){
    const actor = new Actor();
    actor.drawActor(x, y);
    nodes.push({ actor });
    console.log(nodes);
    }else{
      const actor = new Actor();
      actor.drawActor(x, y);
      nodes.push({ actor });
      console.log(nodes);
    }

    
  } else if (draggedElement === draggableElement2) {
    ctx.fillStyle = "#ff0000";  
    const actor = new LifeLine();
    actor.drawActor(x, y);
    actor.texto='objeto' ;
    nodes.push({ actor });
    console.log(nodes);
  }
});

// Al hacer clic en un elemento
function clicEnElemento(event) {
  var rect = dropZone.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;
  let bool = false;

  for (let index = 0; index < nodes.length; index++) {
    if (
      mouseX >= nodes[index].actor.x &&
      mouseX <= nodes[index].actor.x + nodes[index].actor.ancho &&
      mouseY >= nodes[index].actor.y &&
      mouseY <= nodes[index].actor.y + nodes[index].actor.alto
    ) {
      selectedNode = index;
       nodes[selectedNode].actor.color='#FF3C33';
            bool = true;
    }
  }

  return bool;
}

// Al iniciar el arrastre
function iniciarArrastre() {
  if (clicEnElemento(event)) {
    nodes[selectedNode].actor.arrastrando = true;
    dropZone.style.cursor = 'grabbing';
  }
}

// Al detener el arrastre
function detenerArrastre() {
  if (nodes.length !== 0) {
    nodes[selectedNode].actor.arrastrando = false;
    //nodes[selectedNode].actor.color='#000000'
    dropZone.style.cursor = 'grab';
  }
}

// Al mover el elemento
function actualizarPosicionElemento(event) {
  if (nodes.length !== 0) {
    if (nodes[selectedNode].actor.arrastrando) {
      var rect = dropZone.getBoundingClientRect();
      t = nodes[selectedNode].actor.x = event.clientX - rect.left - nodes[selectedNode].actor.ancho / 2;
      l = nodes[selectedNode].actor.y = event.clientY - rect.top - nodes[selectedNode].actor.alto / 2;

      ctx.clearRect(0, 0, dropZone.width, dropZone.height);

      for (let index = 0; index < nodes.length; index++) {
        x = nodes[index].actor.x;
        y = nodes[index].actor.y;
        nodes[index].actor.drawActor(x, y);
      }
      //nodes[selectedNode].actor.color='#000000';
      nodes[selectedNode].actor.drawActor(t, l);
    }
  }
}

// Eventos de clic para iniciar/detener el arrastre y mover el elemento
dropZone.addEventListener('mousedown', iniciarArrastre);
dropZone.addEventListener('mouseup', detenerArrastre);
dropZone.addEventListener('mousemove', actualizarPosicionElemento);
