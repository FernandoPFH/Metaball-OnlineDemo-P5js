// Variavel Para Reajustar Os Ponto Baseado Na Posição Da Tela
var tamanhoAtualCanvas;

var grid

function setup() {
    createCanvas(windowWidth, windowHeight);
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);
    grid = new Grid(10)
}

function draw() {
    background(51);
    grid.desenhar();
}

// Troca O Tamanho Do Canvas Quando O Tamanho Da Tela É Mudado
function windowResized() {
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    resizeCanvas(windowWidth, windowHeight);
}