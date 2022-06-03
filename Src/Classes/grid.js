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

    // Desenha O Grid
    desenhar() {
        // Loopa Por Todos Os Pontos E Desenha Eles
        this.pontos.forEach(linhaDePontos => {
            linhaDePontos.forEach(ponto => {
                ponto.desenhar();
            });
        });
    }
}