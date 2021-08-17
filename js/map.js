// Inicialización de variables

let horizontalSize = 0.941;
let verticalSize = 0.8;
let ratio = 0;

let mapImage;
let hogsmade;
let quidditch;
let forest;
let express;
let detailImage;

let horizontalPosition = 0;
let imageAspectRatio = 0;
let pulseRatio = 0;

let showDetails = false;

let hogsmadeX,
  hogsmadeY,
  quidditchX,
  quidditchY,
  forestX,
  forestY,
  expressX,
  expressY;

const hogsmadeTitle = "Hogsmeade Village";
const forestTitle = "Forbidden Forest";
const quidditchTitle = "Quidditch Pitch";
const expressTitle = "Hogwarts Express";

let detailTitle = "";

// Función para cambiar las imágenes
function preload() {
  mapImage = loadImage("assets/interactive_map.webp");
  hogsmade = loadImage("assets/hogsmade.png");
  quidditch = loadImage("assets/quidditch.jpg");
  forest = loadImage("assets/forest.jpg");
  express = loadImage("assets/express.jpg");
  detailImage = hogsmade;
}

// Función para crear el canvas en donde se va a mostrar el mapa e inicializar tamaños de cada elemento
function setup() {
  createCanvas(windowWidth, windowHeight);
  horizontalSize = windowWidth / mapImage.width;
  verticalSize = windowHeight / mapImage.height;
  ratio = min(horizontalSize, verticalSize);

  forestX = windowWidth / 2 - (mapImage.width * ratio) / 3.4;
  forestY = windowHeight / 2 - (mapImage.height * ratio) / 2.2;
  quidditchX = windowWidth / 2 + (mapImage.width * ratio) / 4.9;
  quidditchY = windowHeight / 2 - (mapImage.height * ratio) / 2.53;
  hogsmadeX = windowWidth / 2 + (mapImage.width * ratio) / 31;
  hogsmadeY = windowHeight / 2 + (mapImage.height * ratio) / 2.5;
  expressX = windowWidth / 2 - (mapImage.width * ratio) / 2.5;
  expressY = windowHeight / 2 + (mapImage.height * ratio) / 5.9;
}

// Función que corre para siempre y que actualiza el estado del mapa dibujando lo que haya que dibujar para cada estado:
// * Cuando el mapa no muesta información se muestra todo y pulsan los círculos por donde se puede cliquear
// * Cuando el mapa muestra información, abre el módulo de información y opaca el mapa
function draw() {
  background(255);

  push();
  imageMode(CENTER);
  image(
    mapImage,
    windowWidth / 2,
    windowHeight / 2,
    mapImage.width * ratio,
    mapImage.height * ratio
  );
  pop();

  if (showDetails) {
    drawDetailsBackground();
    drawDetails();
  } else {
    drawLocations();
  }

  push();
  textAlign(CENTER, CENTER)
  textSize(20)
  text("👇", mouseX, mouseY);
  pop();
}

// Colocar el fondo opaco sobre el mapa para acentuar la apareción del módulo de información
function drawDetailsBackground() {
  push();
  fill(0, 200);
  rectMode(CENTER);
  rect(
    windowWidth / 2,
    windowHeight / 2,
    mapImage.width * ratio,
    mapImage.height * ratio
  );
  pop();
}

// Función para añadir círculo que pulsan en el mapa dadas las coordenadas X, Y de estos
function drawLocations() {
  push();
  drawPulse(forestX, forestY);
  drawPulse(quidditchX, quidditchY);
  drawPulse(hogsmadeX, hogsmadeY);
  drawPulse(expressX, expressY);
  pop();

  pulse();
}

// Función para dibujar el pulso de cada círculo del mapa
function drawPulse(x, y) {
  push();
  noStroke();
  fill(255, 155, 0, 50 + pulseRatio);
  circle(x, y, ratio * 50 + pulseRatio);
  fill(255, 50 - pulseRatio);
  ellipseMode(CENTER);
  ellipse(x, y, ratio * 25 + pulseRatio);
  pop();
}

// Función auxiliar para añadir animación de pulso a todos los cículos del mapa
function pulse() {
  pulseRatio += 0.2;
  if (pulseRatio > 30) {
    pulseRatio = 0;
  }
}

// Función que dibuja el módulo de detalles sobre el mapa cuando se cliquea en un círculo
function drawDetails() {
  push();
  noStroke();
  rectMode(CENTER);
  imageMode(CENTER);
  fill(240, 208, 107);
  rect(
    windowWidth / 2,
    windowHeight / 2,
    (mapImage.width * ratio) / 2,
    (mapImage.height * ratio) / 2,
    10
  );
  image(
    detailImage,
    windowWidth / 2,
    windowHeight / 2 - windowHeight / 16,
    (mapImage.width * ratio) / 2,
    (mapImage.height * ratio) / 4
  );

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(windowWidth / 50);
  textFont("Poppins");
  textStyle(BOLD);
  text(
    detailTitle,
    windowWidth / 2,
    windowHeight / 2 + (mapImage.height * ratio) / 6
  );

  fill(0);
  strokeWeight(5);
  stroke(0);
  fill(240, 208, 107);
  text(
    "CLOSE",
    windowWidth / 2,
    windowHeight / 2 - (mapImage.height * ratio) / 3
  );
  pop();
}

function windowResized() {
  resize();
}

// Función auxiliar para actualizar el tamaño del mapa si la pantalla cambia de dimensiones
function resize() {
  horizontalSize = windowWidth / mapImage.width;
  verticalSize = windowHeight / mapImage.height;
  ratio = min(horizontalSize, verticalSize);
  createCanvas(windowWidth, windowHeight);

  forestX = windowWidth / 2 - (mapImage.width * ratio) / 3.4;
  forestY = windowHeight / 2 - (mapImage.height * ratio) / 2.2;
  quidditchX = windowWidth / 2 + (mapImage.width * ratio) / 4.9;
  quidditchY = windowHeight / 2 - (mapImage.height * ratio) / 2.53;
  hogsmadeX = windowWidth / 2 + (mapImage.width * ratio) / 31;
  hogsmadeY = windowHeight / 2 + (mapImage.height * ratio) / 2.5;
  expressX = windowWidth / 2 - (mapImage.width * ratio) / 2.5;
  expressY = windowHeight / 2 + (mapImage.height * ratio) / 5.9;
}


// Función para mostrar foto del sitio sobre el mapa cuando se cliquea un círculo y para salir del modulo de información también
function mouseClicked() {
  if (showDetails) {
    showDetails = false;
  }

  if (
    mouseX < expressX + ratio * 50 &&
    mouseX > expressX - ratio * 50 &&
    mouseY < expressY + ratio * 50 &&
    mouseY > expressY - ratio * 50
  ) {
    showDetails = true;
    detailTitle = expressTitle;
    detailImage = express;
  }

  if (
    mouseX < forestX + ratio * 50 &&
    mouseX > forestX - ratio * 50 &&
    mouseY < forestY + ratio * 50 &&
    mouseY > forestY - ratio * 50
  ) {
    showDetails = true;
    detailTitle = forestTitle;
    detailImage = forest;
  }

  if (
    mouseX < quidditchX + ratio * 50 &&
    mouseX > quidditchX - ratio * 50 &&
    mouseY < quidditchY + ratio * 50 &&
    mouseY > quidditchY - ratio * 50
  ) {
    showDetails = true;
    detailTitle = quidditchTitle;
    detailImage = quidditch;
  }

  if (
    mouseX < hogsmadeX + ratio * 50 &&
    mouseX > hogsmadeX - ratio * 50 &&
    mouseY < hogsmadeY + ratio * 50 &&
    mouseY > hogsmadeY - ratio * 50
  ) {
    showDetails = true;
    detailTitle = hogsmadeTitle;
    detailImage = hogsmade;
  }
}
