// Variavel Para Reajustar Os Pontos Baseados Na Posição Da Tela
var tamanhoAtualCanvas;

var resolucaoDoGrid = 10;
var numeroDeMetaballs = 5;

var grid;
var metaballs = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    frameRate(30);

    // Instancia O Grid
    grid = new Grid(resolucaoDoGrid);

    // Decide O Valor E Ponto De Cada Ponto Baseado Num Algoritmo De Noise
    for (let x = 0; x < grid.numeroDePontos.x; x++)
        for (let y = 0; y < grid.numeroDePontos.y; y++)
            grid.setarValorDePonto(x,y,-(resolucaoDoGrid*3),null);

    // Cria Os Mataballs
    for (let index = 0; index < numeroDeMetaballs; index++)
        metaballs[index] = new Metaball();
}

function draw() {
    background(51);

    // Move Todas As Metaballs
    metaballs.forEach(metaball => {
        metaball.andar();
    });

    // Loopa Por Todos Os Pontos Do Grid
    for (let x = 0; x < grid.numeroDePontos.x; x++)
        for (let y = 0; y < grid.numeroDePontos.y; y++) {
            // Reseta Os Valores Dos Pontos
            grid.setarValorDePonto(x,y,-(resolucaoDoGrid*3),null);

            // Atualiza Os Pontos Baseado Na Distancia De Cada Metaball
            metaballs.forEach(metaball => {
                metaball.atualizarPonto(grid.pontos[x][y]);
            });
        }

    // Desenha O Grid
    grid.desenhar();

    // Desenha Todas As Metaballs
    metaballs.forEach(metaball => {
        metaball.desenhar();
    });
}

// Troca O Tamanho Do Canvas Quando O Tamanho Da Tela É Mudado
function windowResized() {
    // Atualiza A Posição Das Metaballs
    metaballs.forEach(metaball => {
        let novaPosicaoXDoPonto = (metaball.posicao.x - 0) * (windowWidth - 0) / (tamanhoAtualCanvas.x - 0) + 0;
        let novaPosicaoYDoPonto = (metaball.posicao.y - 0) * (windowHeight - 0) / (tamanhoAtualCanvas.y - 0) + 0;

        metaball.posicao = createVector(novaPosicaoXDoPonto,novaPosicaoYDoPonto);
    })

    tamanhoAtualCanvas = createVector(windowWidth, windowHeight);

    resizeCanvas(windowWidth, windowHeight);

    // Atualiza Os Pontos Do Grid
    grid.atualizarListaDePontos();
}