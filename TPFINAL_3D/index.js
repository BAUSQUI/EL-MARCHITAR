let estaciones;
let modelado;
let data;
let flor;
let ZeroRadious = 75;
let OneRadious = 150;
let pos;
let angle = 0; // Ángulo de rotación
let orbitX, orbitY, orbitZ; 
let currentState;
let showHibiscus = true;
let showFlower = false;

function preload() {
    font = loadFont("CascadiaCode-Light.ttf");
    data = loadTable("data.csv", "csv", "header");
    img = loadImage("hibiscus.jpg");
    modelado = loadModel("3D_HIBISCUS.obj");
    flor = loadModel("FLOR1.obj");
    img2 = loadImage("textrosa.jpg");
   
}

function setup() {
    angleMode(DEGREES); 
    createCanvas(windowWidth, windowHeight, WEBGL);
    //background(30);
    textFont(font);
    estaciones = data.columns.slice(1);
    currentState = 'frutacion'; // Estado inicial

    
    let button = document.getElementById('toggleButton');
    button.addEventListener('click', toggleFlower);
    
}

function draw() {
   // background(30);
    ambientLight(255, 255, 255);
    if (showHibiscus) {
        mostrarHibiscus();
    } 
    if (showFlower) {
        mostrarFlower();
    }
}

function keyPressed() {
    if (key === '1') {
        currentState = 'floracion';
    } else if (key === '2') {
        currentState = 'frutacion';
    } else if (key === '3') {
        currentState = 'follaje';
    }
    loop(); // Permitir que draw() se ejecute de nuevo para actualizar el estado
}

function mostrarHibiscus() {
    texture(img);
    push();
    translate(-200, 100, -100); // Ajustar coordenadas para mover a la derecha
    rotateZ(180);
    rotateY(-angle); // Rotar en el eje Y (propio eje de hibiscus)
    translate(-10, 0, 400); 
    model(modelado);
    pop();

    angle += 0.8;
}

function mostrarFlower() {
    push();
    rotateZ(180);
    translate(orbitX + 300, orbitY + - 100, orbitZ); // Ajustar coordenadas para mover a la derecha
    ambientMaterial(255);
    model(flor);
    texture(img2);
    pop();

    let orbitRadius = 200;
    orbitX = orbitRadius * cos(angle);
    orbitY = orbitRadius * tan(angle);
    orbitZ = orbitRadius * sin(angle);
}

function toggleFlower() {
    showFlower = !showFlower;
}
