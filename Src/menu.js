// Abre O Menu Lateral De Configurações
function abrirMenuLateralDeConfiguracoes() {
    document.getElementById("MenuLateralDeConfiguracoes").style.display = "flex";
}

// Fecha O Menu Lateral De Configurações
function fecharMenuLateralDeConfiguracoes() {
    document.getElementById("MenuLateralDeConfiguracoes").style.display = "none";
}

// Habilita/Desabilita Desenhar Pontos
function mudarEstadoDesenharPontos() {
    grid.desenharPontos = document.getElementById('desenharPontos').checked;
}

// Habilita/Desabilita Desenhar Meio Do Marching Squares
function mudarEstadoDesenharMeioDoMarchingSquqres() {
    grid.desenharMeioDoAlgoritmo = document.getElementById('desenharMeioDoAlgoritmo').checked;
}

// Habilita/Desabilita Desenhar Contorno Do Marching Squares
function mudarEstadoDesenharContornoDoMarchingSquares() {
    grid.desenharContornoDoAlgoritmo = document.getElementById('desenharContornoDoAlgoritmo').checked;
}

// Habilita/Desabilita Desenhar Contorno Das Metaballs
function mudarEstadoDesenharContornoDasMetaballs() {
    desenharContornoMetaballs = document.getElementById('desenharContornoDasMetaballs').checked;
}

// Atualiza A Quantidade De Pontos Do Grid
function atualizarTotalDePontosNoGrid() {
    let valorAtualEntrePontos = document.getElementById("espacoEntrePontos").value;
    
    // Cehca Se o Valor Mudou
    if (grid.espacoEntrePontos != valorAtualEntrePontos) {
        // Muda O Display De Valor
        document.getElementById("espacoEntrePontosMostragem").innerHTML = valorAtualEntrePontos;

        // Troca O Valor Do Espaço Entre Pontos E Atualiza O Grid
        grid.espacoEntrePontos = valorAtualEntrePontos;
        grid.atualizarListaDePontos();
    }
}

// Atualiza A Quantidade De Metaballs
function atualizarTotalDeMetaballs() {
    let valorAtualDeMetaballs = document.getElementById("numeroDeMetaballs").value;
    
    // Cehca Se o Valor Mudou
    if (numeroDeMetaballs != valorAtualDeMetaballs) {
        // Muda O Display De Valor
        document.getElementById("numeroDeMetaballsMostragem").innerHTML = valorAtualDeMetaballs;

        // Pega A Diferença Entre O Valor Atual E O Valor Existente
        let valorDeAlteracao = valorAtualDeMetaballs - numeroDeMetaballs;

        // Se O Valor É Positivo, Adiciona Metaballs A Lista
        if (valorDeAlteracao > 0)
            for (let indiceDeMetaballsAdicionados = 0; indiceDeMetaballsAdicionados < valorDeAlteracao; indiceDeMetaballsAdicionados++) 
                metaballs.push(new Metaball());
        // Se O Valor É Negativo, Remove Metaballs Da Lista
        else if (valorDeAlteracao < 0)
            for (let indiceDeMetaballsAdicionados = 0; indiceDeMetaballsAdicionados < Math.abs(valorDeAlteracao); indiceDeMetaballsAdicionados++) 
                metaballs.pop();

        // Ataliza O Valor De Metaballs
        numeroDeMetaballs = valorAtualDeMetaballs;
    }
}