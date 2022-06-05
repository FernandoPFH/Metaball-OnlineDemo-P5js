// Variavel Para Reajustar Os Pontos Baseados Na Posição Da Tela
var tamanhoAtualCanvas;

var grid;
var metaball;
var metaball2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    frameRate(30);

    // Instancia O Grid
    grid = new Grid(10);

    metaball = new Metaball(createVector(width/2,height/2),45,color("red"),createVector(0,-150));
    metaball2 = new Metaball(createVector(width/2,height/2),45,color("blue"),createVector(0,150));

    // Decide O Valor E Ponto De Cada Ponto Baseado Num Algoritmo De Noise
    for (let x = 0; x < grid.numeroDePontos.x; x++)
        for (let y = 0; y < grid.numeroDePontos.y; y++)
            grid.setarValorDePonto(x,y,-1,color(0,0,0,0));
}

function draw() {
    background(51);

    metaball.andar();
    metaball2.andar();

    for (let x = 0; x < grid.numeroDePontos.x; x++)
        for (let y = 0; y < grid.numeroDePontos.y; y++) {
            grid.setarValorDePonto(x,y,-1,color(0,0,0,0));

            metaball.atualizarPonto(grid.pontos[x][y]);
            metaball2.atualizarPonto(grid.pontos[x][y]);
        }

    grid.desenhar();

    // metaball2.desenhar();
}

// Troca O Tamanho Do Canvas Quando O Tamanho Da Tela É Mudado
function windowResized() {
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    resizeCanvas(windowWidth, windowHeight);
}