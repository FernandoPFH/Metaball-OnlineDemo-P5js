class Grid {
    constructor (espacoEntrePontos) {
        this.espacoEntrePontos = espacoEntrePontos;
        this.numeroDePontos = createVector((int)(width/espacoEntrePontos) + 1,(int)(height/espacoEntrePontos) + 1);

        this.pontos = this.atualizarListaDePontos();
    }

    // Atualiza A Lista De Pontos
    atualizarListaDePontos() {
        // Cria Uma Lista De 2 Dimensões Com O Tamanho Do Número De Pontos
        let pontos = new Array(this.numeroDePontos.x);
        for (let index = 0; index < this.numeroDePontos.x; index++) {
            pontos[index] = new Array(this.numeroDePontos.y);
        }

        // Popula A Lista Com Pontos De Valor Padrão "0"
        for (let x = 0; x < this.numeroDePontos.x; x++)
            for (let y = 0; y < this.numeroDePontos.y; y++)
                pontos[x][y] = new Ponto(createVector(x*this.espacoEntrePontos,y*this.espacoEntrePontos),0);

        // Retorna A Lista De Pontos
        return pontos;
    }

    // Seta Valor De Ponto Baseado Na Posição
    setarValorDePonto(posX,posY,valor,cor) {
        this.pontos[posX][posY].valor = valor;
        this.pontos[posX][posY].cor = cor;
    }

    resetarValorECorDosPOntos() {
        this.pontos.forEach(linhaDePontos => {
            linhaDePontos.forEach(ponto => {
                ponto.valor = -1;
                ponto.cor = color(0,0,0,0);
            });
        });
    }

    calculoDeCor(listaDeCor, listaDeValor) {
        if (listaDeCor.length <= 1)
            return listaDeCor[0];

        let listaDeCorProcessado = [];
        let listaDeValorProcessado = [];

        for (let indiceDaCor = 0; indiceDaCor < listaDeCor.length - 1; indiceDaCor++) {
            let valorDeLerp = listaDeValor[indiceDaCor]/(listaDeValor[indiceDaCor] + listaDeValor[indiceDaCor + 1]);

            listaDeCorProcessado.push(lerpColor(listaDeCor[indiceDaCor],listaDeCor[indiceDaCor + 1],valorDeLerp));
            listaDeValorProcessado.push(valorDeLerp);
        }

        return this.calculoDeCor(listaDeCorProcessado,listaDeValorProcessado);
    }

    // Desenha O Meio Do Algoritmo De Marching Squares
    desenharMeioDoMarchingSquares(pontoSuperiorEsquerdo,pontoSuperiorDireito,pontoInferiorEsquerdo,pontoInferiorDireito) {
        // Converte O Valor Dos Pontos Em Um Número Total Binário Que É Usado Como O Indice Do Algoritmo
        let marchingSquareIndice = (pontoSuperiorEsquerdo.valor >= 0) * 8 + (pontoSuperiorDireito.valor >= 0) * 4 + (pontoInferiorDireito.valor >= 0) * 2 + (pontoInferiorEsquerdo.valor >= 0) * 1;

        let valorSuperiorEsquerdo = Math.abs(pontoSuperiorEsquerdo.valor);
        let valorSuperiorDireito = Math.abs(pontoSuperiorDireito.valor);
        let valorInferiorDireito = Math.abs(pontoInferiorDireito.valor);
        let valorInferiorEsquerdo = Math.abs(pontoInferiorEsquerdo.valor);

        // Criação Dos Pontos Entre Os Pontos De Referencia
        let pontoMeioCima = createVector(pontoSuperiorEsquerdo.posicao.x + (valorSuperiorEsquerdo/(valorSuperiorEsquerdo + valorSuperiorDireito)) * this.espacoEntrePontos,pontoSuperiorEsquerdo.posicao.y);
        let pontoMeioEsquerdo = createVector(pontoSuperiorEsquerdo.posicao.x,pontoSuperiorEsquerdo.posicao.y + (valorSuperiorEsquerdo/(valorSuperiorEsquerdo + valorInferiorEsquerdo)) * this.espacoEntrePontos);
        let pontoMeioDireito = createVector(pontoSuperiorDireito.posicao.x,pontoSuperiorDireito.posicao.y + (valorSuperiorDireito/(valorSuperiorDireito + valorInferiorDireito)) * this.espacoEntrePontos);
        let pontoMeioBaixo = createVector(pontoInferiorEsquerdo.posicao.x + (valorInferiorEsquerdo/(valorInferiorEsquerdo + valorInferiorDireito)) * this.espacoEntrePontos,pontoInferiorEsquerdo.posicao.y)

        let listaDeCores = [];

        let listaDeValores = [];

        if (pontoSuperiorEsquerdo.cor != null) {
            listaDeCores.push(pontoSuperiorEsquerdo.cor);
            listaDeValores.push(valorSuperiorEsquerdo);
        }

        if (pontoSuperiorDireito.cor != null) {
            listaDeCores.push(pontoSuperiorDireito.cor);
            listaDeValores.push(valorSuperiorDireito);
        }

        if (pontoInferiorEsquerdo.cor != null) {
            listaDeCores.push(pontoInferiorEsquerdo.cor);
            listaDeValores.push(valorInferiorDireito);
        }

        if (pontoInferiorDireito.cor != null) {
            listaDeCores.push(pontoInferiorDireito.cor);
            listaDeValores.push(valorInferiorEsquerdo);
        }

        let corFigura = this.calculoDeCor(listaDeCores,listaDeValores);

        // Retira As Linhas E Preenche Com A Cor Calculada
        if (corFigura != null) {
            noStroke();
            fill(corFigura);
        }

        // Começa A Figura
        beginShape();

        // Baseado No Indice É Decido Quais Dos Pontos Devem Ser Adicionados À Figura
        switch (marchingSquareIndice) {
            case 0:
                break;

            case 1:
                vertex(pontoMeioEsquerdo.x,pontoMeioEsquerdo.y);
                vertex(pontoMeioBaixo.x,pontoMeioBaixo.y);
                vertex(pontoInferiorEsquerdo.posicao.x,pontoInferiorEsquerdo.posicao.y);
                break;
                
            case 2:
                vertex(pontoMeioBaixo.x,pontoMeioBaixo.y);
                vertex(pontoMeioDireito.x,pontoMeioDireito.y);
                vertex(pontoInferiorDireito.posicao.x,pontoInferiorDireito.posicao.y);
                break;
            
            case 3:
                vertex(pontoMeioEsquerdo.x,pontoMeioEsquerdo.y);
                vertex(pontoMeioDireito.x,pontoMeioDireito.y);
                vertex(pontoInferiorDireito.posicao.x,pontoInferiorDireito.posicao.y);
                vertex(pontoInferiorEsquerdo.posicao.x,pontoInferiorEsquerdo.posicao.y);
                break;
        
            case 4:
                vertex(pontoMeioCima.x,pontoMeioCima.y);
                vertex(pontoMeioDireito.x,pontoMeioDireito.y);
                vertex(pontoSuperiorDireito.posicao.x,pontoSuperiorDireito.posicao.y);
                break;
    
            case 5:
                vertex(pontoMeioEsquerdo.x,pontoMeioEsquerdo.y);
                vertex(pontoMeioCima.x,pontoMeioCima.y);
                vertex(pontoSuperiorDireito.posicao.x,pontoSuperiorDireito.posicao.y);
                vertex(pontoMeioDireito.x,pontoMeioDireito.y);
                vertex(pontoMeioBaixo.x,pontoMeioBaixo.y);
                vertex(pontoInferiorEsquerdo.posicao.x,pontoInferiorEsquerdo.posicao.y);
                break;

            case 6:
                vertex(pontoMeioCima.x,pontoMeioCima.y);
                vertex(pontoMeioBaixo.x,pontoMeioBaixo.y);
                vertex(pontoInferiorDireito.posicao.x,pontoInferiorDireito.posicao.y);
                vertex(pontoSuperiorDireito.posicao.x,pontoSuperiorDireito.posicao.y);
                break;

            case 7:
                vertex(pontoMeioEsquerdo.x,pontoMeioEsquerdo.y);
                vertex(pontoMeioCima.x,pontoMeioCima.y);
                vertex(pontoSuperiorDireito.posicao.x,pontoSuperiorDireito.posicao.y);
                vertex(pontoInferiorDireito.posicao.x,pontoInferiorDireito.posicao.y);
                vertex(pontoInferiorEsquerdo.posicao.x,pontoInferiorEsquerdo.posicao.y);
                break;

            case 8:
                vertex(pontoMeioEsquerdo.x,pontoMeioEsquerdo.y)
                vertex(pontoMeioCima.x,pontoMeioCima.y);
                vertex(pontoSuperiorEsquerdo.posicao.x,pontoSuperiorEsquerdo.posicao.y);
                break;

            case 9:
                vertex(pontoMeioCima.x,pontoMeioCima.y);
                vertex(pontoMeioBaixo.x,pontoMeioBaixo.y);
                vertex(pontoInferiorEsquerdo.posicao.x,pontoInferiorEsquerdo.posicao.y);
                vertex(pontoSuperiorEsquerdo.posicao.x,pontoSuperiorEsquerdo.posicao.y);
                break;

            case 10:
                vertex(pontoMeioEsquerdo.x,pontoMeioEsquerdo.y);
                vertex(pontoMeioBaixo.x,pontoMeioBaixo.y);
                vertex(pontoInferiorDireito.posicao.x,pontoInferiorDireito.posicao.y);
                vertex(pontoMeioDireito.x,pontoMeioDireito.y);
                vertex(pontoMeioCima.x,pontoMeioCima.y);
                vertex(pontoSuperiorEsquerdo.posicao.x,pontoSuperiorEsquerdo.posicao.y);
                break;

            case 11:
                vertex(pontoMeioCima.x,pontoMeioCima.y);
                vertex(pontoMeioDireito.x,pontoMeioDireito.y);
                vertex(pontoInferiorDireito.posicao.x,pontoInferiorDireito.posicao.y);
                vertex(pontoInferiorEsquerdo.posicao.x,pontoInferiorEsquerdo.posicao.y);
                vertex(pontoSuperiorEsquerdo.posicao.x,pontoSuperiorEsquerdo.posicao.y);
                break;

            case 12:
                vertex(pontoMeioEsquerdo.x,pontoMeioEsquerdo.y);
                vertex(pontoMeioDireito.x,pontoMeioDireito.y);
                vertex(pontoSuperiorDireito.posicao.x,pontoSuperiorDireito.posicao.y);
                vertex(pontoSuperiorEsquerdo.posicao.x,pontoSuperiorEsquerdo.posicao.y);
                break;

            case 13:
                vertex(pontoMeioBaixo.x,pontoMeioBaixo.y);
                vertex(pontoMeioDireito.x,pontoMeioDireito.y);
                vertex(pontoSuperiorDireito.posicao.x,pontoSuperiorDireito.posicao.y);
                vertex(pontoSuperiorEsquerdo.posicao.x,pontoSuperiorEsquerdo.posicao.y);
                vertex(pontoInferiorEsquerdo.posicao.x,pontoInferiorEsquerdo.posicao.y);
                break;

            case 14:
                vertex(pontoMeioEsquerdo.x,pontoMeioEsquerdo.y);
                vertex(pontoMeioBaixo.x,pontoMeioBaixo.y);
                vertex(pontoInferiorDireito.posicao.x,pontoInferiorDireito.posicao.y);
                vertex(pontoSuperiorDireito.posicao.x,pontoSuperiorDireito.posicao.y);
                vertex(pontoSuperiorEsquerdo.posicao.x,pontoSuperiorEsquerdo.posicao.y);
                break;

            case 15:
                vertex(pontoSuperiorEsquerdo.posicao.x,pontoSuperiorEsquerdo.posicao.y);
                vertex(pontoSuperiorDireito.posicao.x,pontoSuperiorDireito.posicao.y);
                vertex(pontoInferiorDireito.posicao.x,pontoInferiorDireito.posicao.y);
                vertex(pontoInferiorEsquerdo.posicao.x,pontoInferiorEsquerdo.posicao.y);
                break;
            
        }

        // Termina A Figura
        endShape(CLOSE);
    }

    // Desenha O Contorno Do Algoritmo De Marching Squares
    desenharContornoDoMarchingSquares(pontoSuperiorEsquerdo,pontoSuperiorDireito,pontoInferiorEsquerdo,pontoInferiorDireito) {
        // Converte O Valor Dos Pontos Em Um Número Total Binário Que É Usado Como O Indice Do Algoritmo
        var marchingSquareIndice = (pontoSuperiorEsquerdo.valor >= 0) * 8 + (pontoSuperiorDireito.valor >= 0) * 4 + (pontoInferiorDireito.valor >= 0) * 2 + (pontoInferiorEsquerdo.valor >= 0) * 1;

        let valorSuperiorEsquerdo = Math.abs(pontoSuperiorEsquerdo.valor);
        let valorSuperiorDireito = Math.abs(pontoSuperiorDireito.valor);
        let valorInferiorDireito = Math.abs(pontoInferiorDireito.valor);
        let valorInferiorEsquerdo = Math.abs(pontoInferiorEsquerdo.valor);

        // Criação Dos Pontos Entre Os Pontos De Referencia
        var pontoMeioCima = createVector(pontoSuperiorEsquerdo.posicao.x + (valorSuperiorEsquerdo/(valorSuperiorEsquerdo + valorSuperiorDireito)) * this.espacoEntrePontos,pontoSuperiorEsquerdo.posicao.y);
        var pontoMeioEsquerdo = createVector(pontoSuperiorEsquerdo.posicao.x,pontoSuperiorEsquerdo.posicao.y + (valorSuperiorEsquerdo/(valorSuperiorEsquerdo + valorInferiorEsquerdo)) * this.espacoEntrePontos);
        var pontoMeioDireito = createVector(pontoSuperiorDireito.posicao.x,pontoSuperiorDireito.posicao.y + (valorSuperiorDireito/(valorSuperiorDireito + valorInferiorDireito)) * this.espacoEntrePontos);
        var pontoMeioBaixo = createVector(pontoInferiorEsquerdo.posicao.x + (valorInferiorEsquerdo/(valorInferiorEsquerdo + valorInferiorDireito)) * this.espacoEntrePontos,pontoInferiorEsquerdo.posicao.y)

        // Deixa As Linhas Com Cor Branca
        stroke(255);

        // Baseado No Indice É Decido Qual Linha Deve Ser Desenhada
        switch (marchingSquareIndice) {
            case 0:
                break;

            case 1:
                line(pontoMeioEsquerdo.x,pontoMeioEsquerdo.y,pontoMeioBaixo.x,pontoMeioBaixo.y);
                break;

            case 2:
                line(pontoMeioBaixo.x,pontoMeioBaixo.y,pontoMeioDireito.x,pontoMeioDireito.y);
                break;

            case 3:
                line(pontoMeioEsquerdo.x,pontoMeioEsquerdo.y,pontoMeioDireito.x,pontoMeioDireito.y);
                break;

            case 4:
                line(pontoMeioCima.x,pontoMeioCima.y,pontoMeioDireito.x,pontoMeioDireito.y);
                break;

            case 5:
                line(pontoMeioEsquerdo.x,pontoMeioEsquerdo.y,pontoMeioCima.x,pontoMeioCima.y);
                line(pontoMeioBaixo.x,pontoMeioBaixo.y,pontoMeioDireito.x,pontoMeioDireito.y);
                break;

            case 6:
                line(pontoMeioCima.x,pontoMeioCima.y,pontoMeioBaixo.x,pontoMeioBaixo.y);
                break;

            case 7:
                line(pontoMeioEsquerdo.x,pontoMeioEsquerdo.y,pontoMeioCima.x,pontoMeioCima.y);
                break;

            case 8:
                line(pontoMeioEsquerdo.x,pontoMeioEsquerdo.y,pontoMeioCima.x,pontoMeioCima.y);
                break;

            case 9:
                line(pontoMeioCima.x,pontoMeioCima.y,pontoMeioBaixo.x,pontoMeioBaixo.y);
                break;

            case 10:
                line(pontoMeioEsquerdo.x,pontoMeioEsquerdo.y,pontoMeioBaixo.x,pontoMeioBaixo.y);
                line(pontoMeioCima.x,pontoMeioCima.y,pontoMeioDireito.x,pontoMeioDireito.y);
                break;

            case 11:
                line(pontoMeioCima.x,pontoMeioCima.y,pontoMeioDireito.x,pontoMeioDireito.y);
                break;

            case 12:
                line(pontoMeioEsquerdo.x,pontoMeioEsquerdo.y,pontoMeioDireito.x,pontoMeioDireito.y);
                break;

            case 13:
                line(pontoMeioBaixo.x,pontoMeioBaixo.y,pontoMeioDireito.x,pontoMeioDireito.y);
                break;

            case 14:
                line(pontoMeioEsquerdo.x,pontoMeioEsquerdo.y,pontoMeioBaixo.x,pontoMeioBaixo.y);
                break;

            case 15:
                break;
        }
    }

    // Desenha O Grid
    desenhar() {
        // Loopa Por Todos Os Pontos E Desenha Eles
        this.pontos.forEach(linhaDePontos => {
            linhaDePontos.forEach(ponto => {
                // ponto.desenhar();
            });
        });

        // Desenha O Resultado Do Algoritmo De Marching Squares
        for (let x = 0; x < this.numeroDePontos.x-1; x++)
            for (let y = 0; y < this.numeroDePontos.y-1; y++) {
                this.desenharMeioDoMarchingSquares(this.pontos[x][y],this.pontos[x+1][y],this.pontos[x][y+1],this.pontos[x+1][y+1]);
                //  this.desenharContornoDoMarchingSquares(this.pontos[x][y],this.pontos[x+1][y],this.pontos[x][y+1],this.pontos[x+1][y+1]);
            }
    }
}