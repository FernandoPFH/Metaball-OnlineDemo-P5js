class Metaball {
    constructor() {
        this.raio = random(20,80);

        this.posicao = createVector(random(0+this.raio,width-this.raio),random(0+this.raio,height-this.raio));

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

        // Checa Se O Ponto Está Dentro Do Metaball Mais Uma Resolução Do Grid
        if (distancia < (this.raio + resolucaoDoGrid)) {
            // Calcula A Cor Do Ponto
            if (ponto.cor == null)
                ponto.cor = this.cor;
            else
                ponto.cor = lerpColor(ponto.cor,this.cor, 0.5);

            // Calcula O Valor Do Ponto
            if (ponto.valor > 0) 
                ponto.valor = ponto.valor;
            else if (ponto.valor < -(resolucaoDoGrid*2))
                ponto.valor = this.raio - distancia;
            else
                if (this.raio - distancia >= 0)
                    ponto.valor = this.raio - distancia;
                else 
                    ponto.valor = Math.abs(ponto.valor + (this.raio - distancia) / 4);
        }
    }

    // Desenha O Contorno Da Metaball E Somado Com Uma Resolução Do Grid
    desenhar() {
        noFill();
        stroke(255);
        circle(this.posicao.x,this.posicao.y,this.raio * 2);
        stroke(150);
        circle(this.posicao.x,this.posicao.y,(this.raio + resolucaoDoGrid) * 2);
    }
}