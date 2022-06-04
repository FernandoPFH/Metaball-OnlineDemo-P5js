// Variavel Para Reajustar Os Pontos Baseados Na Posição Da Tela
var tamanhoAtualCanvas;

var grid

function setup() {
    createCanvas(windowWidth, windowHeight);
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    // Instancia O Grid
    grid = new Grid(20)

    // Decide O Valor E Ponto De Cada Ponto Baseado Num Algoritmo De Noise
    for (let x = 0; x < grid.numeroDePontos.x; x++) {
        let corDaLinha = color(0,255,0);
        if (x%2==0)
            corDaLinha = color(128,0,128);
        for (let y = 0; y < grid.numeroDePontos.y; y++)
            grid.setarValorDePonto(x,y,noise(x,y),corDaLinha);
    }
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