// Variavel Para Reajustar Os Pontos Baseados Na Posição Da Tela
var tamanhoAtualCanvas;

var grid;
var metaballs = [];
var metaball;
var metaball2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    frameRate(30);

    // Instancia O Grid
    grid = new Grid(10);

    // Decide O Valor E Ponto De Cada Ponto Baseado Num Algoritmo De Noise
    for (let x = 0; x < grid.numeroDePontos.x; x++)
        for (let y = 0; y < grid.numeroDePontos.y; y++)
            grid.setarValorDePonto(x,y,-1,color(0,0,0,0));

    for (let index = 0; index < 20; index++)
        metaballs[index] = new Metaball();
}

function draw() {
    background(51);

    metaballs.forEach(metaball => {
        metaball.andar();
    });

    for (let x = 0; x < grid.numeroDePontos.x; x++)
        for (let y = 0; y < grid.numeroDePontos.y; y++) {
            grid.setarValorDePonto(x,y,-1,color(0,0,0,0));

            metaballs.forEach(metaball => {
                metaball.atualizarPonto(grid.pontos[x][y]);
            });
        }

    grid.desenhar();

    // metaball2.desenhar();
}

// Troca O Tamanho Do Canvas Quando O Tamanho Da Tela É Mudado
function windowResized() {
    metaballs.forEach(metaball => {
        let novaPosicaoXDoPonto = (metaball.posicao.x - 0) * (windowWidth - 0) / (tamanhoAtualCanvas.x - 0) + 0;
        let novaPosicaoYDoPonto = (metaball.posicao.y - 0) * (windowHeight - 0) / (tamanhoAtualCanvas.y - 0) + 0;

        metaball.posicao = createVector(novaPosicaoXDoPonto,novaPosicaoYDoPonto);
    })

    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    resizeCanvas(windowWidth, windowHeight);
}