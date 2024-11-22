let credits = 100; // Créditos iniciais
let resultText = document.getElementById("result-text");
let creditsDisplay = document.getElementById("credits");
let spinButton = document.getElementById("spin-btn");

const spinSound = new Audio('assets/sounds/spin.mp3');  // Som de giro
const winSound = new Audio('assets/sounds/win.mp3');    // Som de vitória

// Função para girar a roleta
function spinWheel() {
    if (credits <= 0) {
        resultText.textContent = "Você não tem créditos suficientes!";
        return;
    }

    // Subtrai 1 crédito a cada giro
    credits--;
    creditsDisplay.textContent = credits;

    // Toca o som de giro
    spinSound.play();

    // Gira a roleta aleatoriamente
    let randomDegree = Math.floor(Math.random() * 360);
    document.getElementById("wheel").style.transform = `rotate(${randomDegree + 1440}deg)`; // Gira 4 voltas + valor aleatório

    // Determina o resultado após o giro
    setTimeout(() => {
        let prize = getPrize(randomDegree);
        displayPrize(prize);
    }, 4000); // Espera 4 segundos para o giro terminar
}

// Função para determinar o prêmio com base no ângulo
function getPrize(degree) {
    if (degree >= 0 && degree < 60) {
        return '2x';
    } else if (degree >= 60 && degree < 120) {
        return 'Rodada Grátis';
    } else if (degree >= 120 && degree < 180) {
        return '100 Créditos';
    } else if (degree >= 180 && degree < 240) {
        return 'Tente Novamente';
    } else if (degree >= 240 && degree < 300) {
        return '3x';
    } else {
        return '1000 Créditos';
    }
}

// Exibe o prêmio ganho
function displayPrize(prize) {
    if (prize === 'Tente Novamente') {
        resultText.textContent = "Você perdeu! Tente novamente.";
    } else if (prize === 'Rodada Grátis') {
        resultText.textContent = "Você ganhou uma rodada grátis!";
    } else if (prize.includes('Créditos')) {
        let prizeAmount = parseInt(prize.split(' ')[0]);
        credits += prizeAmount;
        creditsDisplay.textContent = credits;
        resultText.textContent = `Você ganhou ${prizeAmount} créditos!`;
    } else {
        resultText.textContent = `Você ganhou ${prize}!`;
    }

    // Toca o som de vitória
    winSound.play();
}
