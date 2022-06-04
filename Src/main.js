// Variavel Para Reajustar Os Pontos Baseados Na Posição Da Tela
var tamanhoAtualCanvas;

var grid;
var metaball;
var metaball2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    // Instancia O Grid
    grid = new Grid(15)

    metaball = new Metaball(createVector(width/2,height/2),45,color("red"),createVector(15,15));
    metaball2 = new Metaball(createVector(width/2,height/2),45,color("blue"),createVector(-15,-15));

    // Decide O Valor E Ponto De Cada Ponto Baseado Num Algoritmo De Noise
    for (let x = 0; x < grid.numeroDePontos.x; x++) {
        for (let y = 0; y < grid.numeroDePontos.y; y++)
            grid.setarValorDePonto(x,y,0,color("black"));
    }
}

function draw() {
    background(51);

    // grid.resetarValorECorDosPOntos();

    // metaball.andar();
    // metaball2.andar();
    metaball.atualizarPontos(grid.pontos);
    metaball2.atualizarPontos(grid.pontos);

    grid.desenhar();

    metaball2.desenhar();
}

// Troca O Tamanho Do Canvas Quando O Tamanho Da Tela É Mudado
function windowResized() {
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    resizeCanvas(windowWidth, windowHeight);
}