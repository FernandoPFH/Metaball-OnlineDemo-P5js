class Metaball {
    constructor(posicaoInicial,raio,cor,velocidadeInicial) {
        this.posicao = posicaoInicial;
        this.cor = cor;
        this.raio = raio;
        this.velocidade = velocidadeInicial;
    }

    andar() {
        this.posicao = createVector(this.posicao.x + this.velocidade.x,this.posicao.y + this.velocidade.y);

        if (this.posicao.x - this.raio < 0 || this.posicao.x + this.raio > width) {
            this.velocidade.x *= -1;
        }

        if (this.posicao.y - this.raio  < 0 || this.posicao.y + this.raio > height) {
            this.velocidade.y *= -1;
        }
    }

    atualizarPontos(listaDePontos) {
        listaDePontos.forEach(linhaDePontos => {
            linhaDePontos.forEach(ponto => {
                let vetorEntrePontoPosicaoECentro = createVector(this.posicao.x - ponto.posicao.x, this.posicao.y - ponto.posicao.y);
                let distancia = sqrt(Math.pow(vetorEntrePontoPosicaoECentro.x,2) + Math.pow(vetorEntrePontoPosicaoECentro.y,2));

                if (distancia <= this.raio) {
                    ponto.valor = (this.raio - distancia) / (this.raio);
                    ponto.cor = this.cor;
                }
            });
        });
    }

    desenhar() {
        // fill(this.cor);
        noFill();
        stroke(255);
        circle(this.posicao.x,this.posicao.y,this.raio * 2);
    }
}