class Metaball {
    constructor() {
        this.raio = random(20,80);

        // this.posicao = createVector(random(0+this.raio,width-this.raio),random(0+this.raio,height-this.raio));
        this.posicao = createVector(width/2,height/2);

        this.cor = color(random(["yellow","orange","red","violet","blue","green"]));

        let magnitudeVelocidadeInicial = random(50,300);

        this.velocidade = createVector(random(-1,1) * magnitudeVelocidadeInicial,random(-1,1) * magnitudeVelocidadeInicial);
    }

    // Move A Metabola
    andar() {
        // Soma O Vetor Velocidade A Posição
        this.posicao = createVector(this.posicao.x + this.velocidade.x * (deltaTime / 1000),this.posicao.y + this.velocidade.y * (deltaTime / 1000));

        // Se A Metabola Tiver Utrapassado Os Limites Da Tela, Inverte A  Velocidade Em X
        if ((this.posicao.x - this.raio < 0 && this.velocidade.x < 0) || (this.posicao.x + this.raio > width && this.velocidade.x > 0)) {
            this.velocidade.x *= -1;
        }

        // Se A Metabola Tiver Utrapassado Os Limites Da Tela, Inverte A  Velocidade Em Y
        if ((this.posicao.y - this.raio  < 0 && this.velocidade.y < 0) || (this.posicao.y + this.raio > height && this.velocidade.y > 0)) {
            this.velocidade.y *= -1;
        }
    }

    // Atualiza O Valor E Cor Do Ponto, Se Ele Estiver Dentro Da Área Da Metabola
    atualizarPonto(ponto) {
        // Calcula O Vetor, E Sua Magnitude, Entre O Centro Da Metabola E O Ponto
        let vetorEntrePontoPosicaoECentro = createVector(this.posicao.x - ponto.posicao.x, this.posicao.y - ponto.posicao.y);
        let distancia = sqrt(Math.pow(vetorEntrePontoPosicaoECentro.x,2) + Math.pow(vetorEntrePontoPosicaoECentro.y,2));

        ponto.valor = (this.raio - distancia);
        
        if (distancia < (this.raio)) {
            ponto.cor = this.cor;
        } else {
            ponto.cor = null;
        }
    }

    // Desenha O Contorno Da Meta Bola
    desenhar() {
        noFill();
        stroke(255);
        circle(this.posicao.x,this.posicao.y,this.raio * 2);
    }
}