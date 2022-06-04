class Ponto {
    constructor(posicao,valor,cor) {
        this.posicao = posicao;
        this.valor = valor;
        this.cor = cor;
    }

    // Desenha O Ponto
    desenhar() {
        stroke(255);
        point(this.posicao.x,this.posicao.y);
    }
}