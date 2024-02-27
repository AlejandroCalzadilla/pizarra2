

import { LifeLine} from './lifeline.js';

//console.log(drawActor(5,10));
const draggableElement = document.getElementById("draggable2");
const dropZone = document.getElementById("actorCanvas");
const ctx = dropZone.getContext("2d");
let nodes = []; //matriz de nodos para almacenarlos 
let selectedNode = null; //para almacenar el nodo selccionado
let arcos = [];
let x; let y, t, l;
document.addEventListener("DOMContentLoaded", function () {
  draggableElement.addEventListener("dragstart", function (event) { // Iniciar el arrastre
    console.log(draggableElement.id)
    event.dataTransfer.setData("text/plain", draggableElement.id);
  });
  // Evitar comportamiento por defecto del arrastre
  dropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  // Manejar el evento de soltar
  dropZone.addEventListener("drop", function (event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);
    // Obtener las coordenadas del canvas y del elemento arrastrado
    const canvasRect = dropZone.getBoundingClientRect();
    const x = event.clientX - canvasRect.left;
    const y = event.clientY - canvasRect.top;
    ctx.fillStyle = "#3498db";
    //ctx.fillRect(x, y, draggedElement.offsetWidth, draggedElement.offsetHeight);
    const actor1 = new LifeLine();
    console.log(actor1)
    actor1.drawActor(x, y)
    nodes.push({ actor1 });
  });
});


//si alguien toca al elemento
function clicEnElemento(event) {
  var rect = dropZone.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;
  let bool = false
  for (let index = 0; index < nodes.length; index++) {
    // console.log('x',mouseX,'y',mouseY,'Ax',nodes[index].Aalto,'Af',nodes[index].Ax+nodes[index].Aancho);
    console.log(nodes[index].actor1.x)
    if (mouseX >= nodes[index].actor1.x && mouseX <= nodes[index].actor1.x + nodes[index].actor1.ancho &&
      mouseY >= nodes[index].actor1.y && mouseY <= nodes[index].actor1.y + nodes[index].actor1.alto) { selectedNode = index; bool = true; }
  }
  return bool
}

// Evento de clic para iniciar el arrastre
dropZone.addEventListener('mousedown', function (event) {
  /* if (clicEnElemento(event) && !bloquearMovimiento) {
     actorCanvas.Aarrastrando = true;
     dropZone.style.cursor = 'grabbing';
  } */
  if (clicEnElemento(event)) {
    nodes[selectedNode].actor1.arrastrando = true;
    dropZone.style.cursor = 'grabbing';
  }
});

// Evento de soltar para detener el arrastre
dropZone.addEventListener('mouseup', function () {
    if(!nodes){
     nodes[selectedNode].actor1.arrastrando = false;
     dropZone.style.cursor = 'grab';
    }
});


// Evento de movimiento del mouse para actualizar la posición del elemento durante el arrastre
dropZone.addEventListener('mousemove', function (event) {
  if (!nodes) {
    if (nodes[selectedNode].actor1.arrastrando) {
      var rect = dropZone.getBoundingClientRect();
      t = nodes[selectedNode].actor1.x = event.clientX - rect.left - nodes[selectedNode].actor1.ancho / 2;
      l = nodes[selectedNode].actor1.y = event.clientY - rect.top - nodes[selectedNode].actor1.alto / 2;
      ctx.clearRect(0, 0, dropZone.width, dropZone.height);

      for (let index = 0; index < nodes.length; index++) {
        if (index != selectedNode)
          console.log(index, selectedNode)
        x = nodes[index].actor1.x;
        y = nodes[index].actor1.y;
        nodes[index].actor1.drawActor(x, y)
      }
      nodes[selectedNode].actor1.drawActor(t, l)
    }
  }
});