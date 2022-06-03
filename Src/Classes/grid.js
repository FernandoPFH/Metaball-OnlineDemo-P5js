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
    setarValorDePonto(posX,posY,valor) {
        this.pontos[posX][posY].valor = valor;
    }

    // Desenha O Contorno Do Algoritmo De Marching Squares
    desenharContornoDoMarchingSquares(pontoSuperiorEsquerdo,pontoSuperiorDireito,pontoInferiorEsquerdo,pontoInferiorDireito) {
        // Converte O Valor Dos Pontos Em Um Número Total Binário Que É Usado Como O Indice Do Algoritmo
        var marchingSquareIndice = (pontoSuperiorEsquerdo.valor > 0.5) * 8 + (pontoSuperiorDireito.valor > 0.5) * 4 + (pontoInferiorDireito.valor > 0.5) * 2 + (pontoInferiorEsquerdo.valor > 0.5) * 1;

        // Criação Dos Pontos Entre Os Pontos De Referencia
        var pontoMeioCima = createVector(pontoSuperiorEsquerdo.posicao.x + (pontoSuperiorEsquerdo.valor/(pontoSuperiorEsquerdo.valor + pontoSuperiorDireito.valor)) * this.espacoEntrePontos,pontoSuperiorEsquerdo.posicao.y);
        var pontoMeioEsquerdo = createVector(pontoSuperiorEsquerdo.posicao.x,pontoSuperiorEsquerdo.posicao.y + (pontoSuperiorEsquerdo.valor/(pontoSuperiorEsquerdo.valor + pontoInferiorEsquerdo.valor)) * this.espacoEntrePontos);
        var pontoMeioDireito = createVector(pontoSuperiorDireito.posicao.x,pontoSuperiorDireito.posicao.y + (pontoSuperiorDireito.valor/(pontoSuperiorDireito.valor + pontoInferiorDireito.valor)) * this.espacoEntrePontos);
        var pontoMeioBaixo = createVector(pontoInferiorEsquerdo.posicao.x + (pontoInferiorEsquerdo.valor/(pontoInferiorEsquerdo.valor + pontoInferiorDireito.valor)) * this.espacoEntrePontos,pontoInferiorEsquerdo.posicao.y)

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
                ponto.desenhar();
            });
        });

        for (let x = 0; x < this.numeroDePontos.x-1; x++)
            for (let y = 0; y < this.numeroDePontos.y-1; y++)
                this.desenharContornoDoMarchingSquares(this.pontos[x][y],this.pontos[x+1][y],this.pontos[x][y+1],this.pontos[x+1][y+1])
    }
}