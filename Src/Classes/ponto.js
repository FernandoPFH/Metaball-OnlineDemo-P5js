class Ponto {
    constructor(posicao,valor) {
        this.posicao = posicao;
        this.valor = valor;
    }

    // Desenha O Ponto
    desenhar() {
        stroke(255);
        point(this.posicao.x,this.posicao.y);
    }
}