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

    // Desenha O Meio Do Algoritmo De Marching Squares
    desenharMeioDoMarchingSquares(pontoSuperiorEsquerdo,pontoSuperiorDireito,pontoInferiorEsquerdo,pontoInferiorDireito) {
        // Converte O Valor Dos Pontos Em Um Número Total Binário Que É Usado Como O Indice Do Algoritmo
        let marchingSquareIndice = (pontoSuperiorEsquerdo.valor != 0.5) * 8 + (pontoSuperiorDireito.valor != 0.5) * 4 + (pontoInferiorDireito.valor != 0.5) * 2 + (pontoInferiorEsquerdo.valor != 0.5) * 1;

        // Criação Dos Pontos Entre Os Pontos De Referencia
        let pontoMeioCima = createVector(pontoSuperiorEsquerdo.posicao.x + (pontoSuperiorEsquerdo.valor/(pontoSuperiorEsquerdo.valor + pontoSuperiorDireito.valor)) * this.espacoEntrePontos,pontoSuperiorEsquerdo.posicao.y);
        let pontoMeioEsquerdo = createVector(pontoSuperiorEsquerdo.posicao.x,pontoSuperiorEsquerdo.posicao.y + (pontoSuperiorEsquerdo.valor/(pontoSuperiorEsquerdo.valor + pontoInferiorEsquerdo.valor)) * this.espacoEntrePontos);
        let pontoMeioDireito = createVector(pontoSuperiorDireito.posicao.x,pontoSuperiorDireito.posicao.y + (pontoSuperiorDireito.valor/(pontoSuperiorDireito.valor + pontoInferiorDireito.valor)) * this.espacoEntrePontos);
        let pontoMeioBaixo = createVector(pontoInferiorEsquerdo.posicao.x + (pontoInferiorEsquerdo.valor/(pontoInferiorEsquerdo.valor + pontoInferiorDireito.valor)) * this.espacoEntrePontos,pontoInferiorEsquerdo.posicao.y)

        // Calculo Dos Valores Relativos Ao Ponto Meio Cima E Ponto Meio Baixo
        let valorMeioCima = pontoSuperiorEsquerdo.valor/(pontoSuperiorEsquerdo.valor + pontoSuperiorDireito.valor);
        let valorMeioBaixo = pontoInferiorEsquerdo.valor/(pontoInferiorEsquerdo.valor + pontoInferiorDireito.valor);

        // Calculo Das Cores Do Ponto Meio Cima E Ponto Meio Baixo 
        let corMeioCima = lerpColor(pontoSuperiorEsquerdo.cor,pontoSuperiorDireito.cor,valorMeioCima);
        let corMeioBaixo = lerpColor(pontoInferiorEsquerdo.cor,pontoInferiorDireito.cor,valorMeioBaixo);

        // Calculo Do Valor E Cor Dos Pontos Entre Os Pontos Do Meio
        let valorMeioVertical = valorMeioCima/(valorMeioCima + valorMeioBaixo);
        let corMeioVertical = lerpColor(corMeioCima,corMeioBaixo,valorMeioVertical);

        // Calculo Dos Valores Relativos Ao Ponto Meio Cima E Ponto Meio Baixo
        let valorMeioEsquerdo = pontoSuperiorEsquerdo.valor/(pontoSuperiorEsquerdo.valor + pontoInferiorEsquerdo.valor);
        let valorMeioDireito = pontoSuperiorDireito.valor/(pontoSuperiorDireito.valor + pontoInferiorDireito.valor);

        // Calculo Das Cores Do Ponto Meio Cima E Ponto Meio Baixo 
        let corMeioEsquerdo = lerpColor(pontoSuperiorEsquerdo.cor,pontoInferiorEsquerdo.cor,valorMeioEsquerdo);
        let corMeioDireito = lerpColor(pontoSuperiorDireito.cor,pontoInferiorDireito.cor,valorMeioDireito);

        // Calculo Do Valor E Cor Dos Pontos Entre Os Pontos Do Meio
        let valorMeioHorizontal = valorMeioCima/(valorMeioCima + valorMeioBaixo);
        let corMeioHorizontal = lerpColor(corMeioEsquerdo,corMeioDireito,valorMeioHorizontal);

        let valorFigura = valorMeioVertical/(valorMeioVertical + valorMeioHorizontal);
        let corFigura = lerpColor(corMeioVertical,corMeioHorizontal,valorFigura);

        // Retira As Linhas E Preenche Com A Cor Calculada
        noStroke();
        fill(corFigura);

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

    // Desenha O Grid
    desenhar() {
        // Loopa Por Todos Os Pontos E Desenha Eles
        // this.pontos.forEach(linhaDePontos => {
        //    linhaDePontos.forEach(ponto => {
        //        ponto.desenhar();
        //    });
        //});

        // Desenha O Resultado Do Algoritmo De Marching Squares
        for (let x = 0; x < this.numeroDePontos.x-1; x++)
            for (let y = 0; y < this.numeroDePontos.y-1; y++) {
                this.desenharMeioDoMarchingSquares(this.pontos[x][y],this.pontos[x+1][y],this.pontos[x][y+1],this.pontos[x+1][y+1]);
            }
    }
}