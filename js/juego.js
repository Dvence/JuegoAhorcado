let palabras = ['ALURA', 'ORACLE',  'CSS', 'HTML', 'SCRIPT', 'MOUSE', 'SOFTWARE', 'DIEGO'];
let error = document.querySelector(".error");
let success = document.querySelector(".exito");
let regex = /^[a-zA-Z]+$/g;
let btnIrAgregaPalabra = document.querySelector("#btn-agregar-palabra");
let btnComienzo = document.querySelector("#btn-iniciar-juego");
let btnVolverDesdeAgregar = document.querySelector("#volverDesdeAgregar");
let btnVolver = document.querySelector("#volver");
let btnAgregaNuevaPalabra = document.querySelector("#btnAgregaPalabra");
let btnReiniciar = document.querySelector("#btn-reIniciar-juego");
let ganador = document.querySelector(".gano");
let perdedor = document.querySelector(".perdio");
let mayusculas = /[A-Z]/;
let palabra = "";
let intentos = 0;
let errores = 0;
let letras = [];
let aciertos = [];
let letrasErradas = [];

let victoria = false;
let derrota = false;

function winOrLost(){
    console.log("aciertos: "+ aciertos.length, "letras: "+ letras.length, "intentos: "+ intentos, "errores: "+ errores);

    if (letras.length == (aciertos.length)) {
        ganador.classList.remove("hide");
        victoria = true;
        killCanvas();
    }
    if (intentos == 0) {
        perdedor.classList.remove("hide");
        derrota = true;
        dibujarCara();
        killCanvas();
        
    }
}
document.addEventListener("keypress", function(event){
    let tecla = (event.key).toUpperCase();
    if (tecla.match(mayusculas)){
        letras = palabra.split('');     
        calcularAciertos(tecla);
    }
    winOrLost();
});
function calcularAciertos(tecla){
    if (!aciertos.includes(tecla)) {
        for (let i = 0; i < letras.length; i++){
            let letra = letras[i];
            let cantidadLetras = [];
            if (tecla == letra && !cantidadLetras.includes(tecla)) {
                rightLetter(i);
                cantidadLetras.push(tecla);
                
                if(letras.length != aciertos.length) {
                    cantidadLetras.forEach((char) => aciertos.push(char));
          
                };   
            }   
        }
    }
    if (!letras.includes(tecla) && !letrasErradas.includes(tecla)) {        
        intentos-=1;
        errores+=1;
        letrasErradas.push(tecla);          
        wrongLetter(tecla, intentos);
        dibujarDesdichado();
    }
}
btnReiniciar.addEventListener("click", function(){
    reiniciarJuego();
});
btnVolver.addEventListener("click", function(){
    changeDomToHome(".juego");  
});
btnComienzo.addEventListener("click", function() {
    changeDom(".inicio", ".juego");
    intentos = 6;
    palabra = pickSecretWord();
    llamarCanvas();
    clearScreen();
    drawLines();
    dibujarHorca();
    dibujarDesdichado();

});
btnIrAgregaPalabra.addEventListener("click", function() {
    changeDom(".inicio", ".agregarPalabra");
});
function reiniciarJuego(){
    intentos = 6;
    errores = 0;
    letras = [];
    aciertos = [];
    letrasErradas = [];
    victoria = false;
    derrota = false;
    finalizado = false;
    palabra = pickSecretWord();
    ganador.classList.add("hide");
    perdedor.classList.add("hide");
    llamarCanvas();
    clearScreen();
    drawLines();
    dibujarHorca();
    dibujarDesdichado();
}
function killCanvas(){
    canvas = null;
}
function pickSecretWord(){   
    return palabras[Math.floor(Math.random()*palabras.length)];
} 
var canvas;
function llamarCanvas(){
    canvas = document.getElementById("ahorcado-canvas").getContext('2d');
}
btnAgregaNuevaPalabra.addEventListener("click", function(event) {
    event.preventDefault();

    let form = document.querySelector("#nuevaPalabra");
    let palabra = (form.palabra.value);
    if (palabra.match(regex)){
        if (!error.classList.contains("hide")){
            error.classList.add("hide");
        }
        palabras.push((palabra).toUpperCase());
        success.classList.remove("hide");
        form.reset();
        setTimeout(() => {
            success.classList.add("hide");
        },2000);
    }
    else {
        error.classList.remove("hide");
        form.reset();
    }
}); 
btnVolverDesdeAgregar.addEventListener("click", function(){
    changeDomToHome(".agregarPalabra");
});
 function rightLetter(index){
    canvas.font = 'bold 48px Inter';
    canvas.lineWidth= 6;
    canvas.lineCap = "round";
    canvas.lineJoin = "round";
    canvas.fillStyle = "#0a3871";
    let ancho = 610/palabra.length;
    canvas.fillText(palabra[index], 240+(ancho*index), 420);
}
function wrongLetter(letra, intentos){
    canvas.font = 'bold 40px Inter';
    canvas.lineWidth= 6;
    canvas.lineCap = "round";
    canvas.lineJoin = "round";
    canvas.fillStyle = "#0a3871";
    canvas.fillText(letra, 135+(40*(10-intentos)), 510, 40);
}
function changeDom(actual, proximo){
    document.querySelector(actual).classList.add("hide");
    document.querySelector(proximo).classList.remove("hide");
}
function changeDomToHome(actual){
    document.querySelector(".inicio").classList.remove("hide");
    document.querySelector(actual).classList.add("hide");
}

// CANVAS
function drawLines(){

    canvas.lineWidth = 6;
    canvas.lineCap = "round";
    canvas.lineJoin = "round";
    canvas.strokeStyle = "#0a3871";
    canvas.beginPath();
    
    let ancho = 610/palabra.length;
    for (let i = 0; i< palabra.length; i++) {
        canvas.moveTo(230+(ancho*i), 440);
        canvas.lineTo(280+(ancho*i), 440);
    }
    canvas.stroke();
    canvas.closePath();
}
function clearScreen(){
    canvas.clearRect(0,0,900,560);
}
function dibujarHorca(){
dibujarBase();
dibujarColumna();
dibujarSosten();
dibujarSoga();
}
function dibujarDesdichado(){
    switch(errores){
        case 1:
            dibujarCabeza();
            break;
        case 2:
            dibujarTronco();
            break;
        case 3:
            dibujarBrazoIzquierdo();
            break;
        case 4:
            dibujarBrazoDerecho();
            break;
        case 5:
            dibujarPiernaIzquierda();
            break;
        case 6:
            dibujarPiernaDerecha();
            break;
        
    }
    
    
}
function dibujarBase(){
 
    canvas.lineWidth = 10;
    canvas.lineCap = "round";
    canvas.lineJoin = "round";
    canvas.strokeStyle = "#0a3871";
    canvas.beginPath();
    canvas.moveTo(405,350);
    canvas.lineTo(530,350);
    canvas.stroke();
    canvas.closePath();
    

}
function dibujarColumna(){

    canvas.lineWidth = 7;
    canvas.lineCap = "round";
    canvas.lineJoin = "round";
    canvas.strokeStyle = "#0a3871";
    canvas.beginPath();
    canvas.moveTo(400,350);
    canvas.lineTo(400,50);
    canvas.stroke();
    canvas.closePath(); 
    
  
}
function dibujarSosten(){

    canvas.lineWidth = 5;
    canvas.lineCap = "round";
    canvas.lineJoin = "round";
    canvas.strokeStyle = "#0a3871";
    canvas.beginPath();
    canvas.moveTo(400,50);
    canvas.lineTo(527,50);
    canvas.stroke();
    canvas.closePath();
    

}
function dibujarSoga(){

    canvas.lineWidth = 5;
    canvas.lineCap = "round";
    canvas.lineJoin = "round";
    canvas.strokeStyle = "#0a3871";
    canvas.beginPath();
    canvas.moveTo(530,50);
    canvas.lineTo(530,78);
    canvas.stroke();
    canvas.closePath();
    
  
}
function dibujarCabeza(){
  
    canvas.lineWidth = 3;
    canvas.lineCap = "round";
    canvas.lineJoin = "round";
    canvas.strokeStyle = "#0a3871";
    canvas.beginPath();
    canvas.arc(530, 109, 30, 0, (2*Math.PI));
    canvas.stroke();
    
}
function dibujarCara(){

    canvas.lineWidth = 3;
    canvas.lineCap = "round";
    canvas.lineJoin = "round";
    canvas.strokeStyle = "#0a3871";
    canvas.beginPath();
    //ojo izq
    canvas.moveTo(525,105);
    canvas.lineTo(515,112);
    canvas.moveTo(515,105);
    canvas.lineTo(525,112);
    //ojo derecho
    canvas.moveTo(545,105);
    canvas.lineTo(535,112);
    canvas.moveTo(535,105);
    canvas.lineTo(545,112);
    //dibujar boca
    canvas.moveTo(515,122);
    canvas.lineTo(520,128);
    canvas.lineTo(525,122);
    canvas.lineTo(530,128);
    canvas.lineTo(535,122);
    canvas.lineTo(540,128);
    canvas.lineTo(545,122);
    canvas.stroke();
    canvas.closePath();
    
 
}
function dibujarTronco(){
    
    canvas.lineWidth = 3;
    canvas.lineCap = "round";
    canvas.lineJoin = "round";
    canvas.strokeStyle = "#0a3871";
    canvas.beginPath();
    canvas.moveTo(530,140);
    canvas.lineTo(530,240);
    canvas.stroke();
    canvas.closePath();
    
  
}
function dibujarPiernaIzquierda(){
  
    canvas.lineWidth = 3;
    canvas.lineCap = "round";
    canvas.lineJoin = "round";
    canvas.strokeStyle = "#0a3871";
    canvas.beginPath();
    canvas.moveTo(530,240);
    canvas.lineTo(505,290);
    canvas.stroke();
    canvas.closePath();
   

}
function dibujarPiernaDerecha(){
   
    canvas.lineWidth = 3;
    canvas.lineCap = "round";
    canvas.lineJoin = "round";
    canvas.strokeStyle = "#0a3871";
    canvas.beginPath();
    canvas.moveTo(530,240);
    canvas.lineTo(555,290);
    canvas.stroke();
    canvas.closePath();
    

}
function dibujarBrazoIzquierdo(){
 
    canvas.lineWidth = 3;
    canvas.lineCap = "round";
    canvas.lineJoin = "round";
    canvas.strokeStyle = "#0a3871";
    canvas.beginPath();
    canvas.moveTo(530,170);
    canvas.lineTo(505,200);
    canvas.stroke();
    canvas.closePath();
 
}
function dibujarBrazoDerecho(){
    canvas.lineWidth = 3;
    canvas.lineCap = "round";
    canvas.lineJoin = "round";
    canvas.strokeStyle = "#0a3871";
    canvas.beginPath();
    canvas.moveTo(530,170);
    canvas.lineTo(555,200);
    canvas.stroke();
    canvas.closePath();

}




