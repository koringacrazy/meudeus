const words = [
  { word: "BAZAR", hint: "Ir embora" },
{ word: "KOTA", hint: "Pessoa mais velha" },
{ word: "COTA", hint: "Mais Velho" },
{ word: "BAZZAR", hint: "Ir embora" },
{ word: "BUE", hint: "Muito" },
{ word: "CAMBAS", hint: "Amigos" },
{ word: "KUMBU", hint: "Dinheiro" },
{ word: "MAKUMBA", hint: "Feitiçaria" },
{ word: "KUDURISTA", hint: "Cantor de kuduro" },
{ word: "MATUMBOS", hint: "Pessoas que sem educação" },
{ word: "MUXIMA", hint: "Coração" },
{ word: "CAMONE", hint: "Alguém" },
{ word: "FERA", hint: "Dormir" },
{ word: "TA FIXE", hint: "Está bom" },
{ word: "MALEMBE", hint: "Devagar" },
{ word: "BILDA", hint: "Comida" },
{ word: "ZUNGEIRA", hint: "Vendedora ambulante" },
{ word: "CHILLAR", hint: "Curtir festa" },
{ word: "SALO", hint: "Trabalho" },
{ word: "MAMBOS", hint: "Coisas" },
{ word: "GANZADO", hint: "Fumado" },
{ word: "TUGA", hint: "Português (Nacionalidade)" },
{ word: "GASOSA", hint: "Suborno, propina" },
{ word: "CAENCHE", hint: "Apelido para alguém robusto ou forte" },
{ word: "BABULAR", hint: "FUGIR" },
{ word: "XINGUILAR", hint: "Dançar de forma sei lá" },
{ word: "CAPANGA", hint: "Segurança ou guarda-costas" },
{ word: "MBOA", hint: "Menina, mulher" },
{ word: "PALANCA", hint: "Antílope símbolo nacional de Angola" },
{ word: "CUIAR", hint: "Coisa que esta boa" },
{ word: "N'GALANGA", hint: "Líder, chefe de grupo" },
{ word: "KASSUMUNA", hint: "Deixar algo ou desistir" },
{ word: "MAKA", hint: "Problema, confusão" },
{ word: "PICAR", hint: "Sair, fugir" },
{ word: "KUMBU", hint: "Dinheiro" },
{ word: "TORA", hint: "Beber" },
{ word: "NDENGUE", hint: "Criança, jovem" },
{ word: "KANDONGUEIRO", hint: "Transporte informal" },
{ word: "ABUÉ", hint: "Demasiado tempo" },
{ word: "WAWA", hint: "Autocarro" },
{ word: "BUCADO", hint: "Algo pouco" },
{ word: "BIRRA", hint: "Cerveja" },
{ word: "JINDUNGO", hint: "Pimenta ardente" },
{ word: "BALUMUKA", hint: "Confusão" },
{ word: "SAMACUCO", hint: "Cabeça-dura" },
{ word: "MBUNBA", hint: "Trabalhar" },
{ word: "BAJU", hint: "Mentiroso" },
{ word: "KILAPI", hint: "Dívida" },
{ word: "SOBA", hint: "Chefe tradicional de uma aldeia" },
{ word: "CAPUCA", hint: "Bebida alcoolica" },
{ word: "KIMBOMBO", hint: "Pessoa teimosa" },
  ];

  document.addEventListener("DOMContentLoaded", () => {
    let totalScore = 0; // Armazena a pontuação acumulada
    let emojiDisplay; // Para exibir o emoji
    let selectedWord, attempts, gameOver;

    const wordDisplay = document.getElementById("wordDisplay");
    const hintDisplay = document.getElementById("hint");
    const attemptsDisplay = document.getElementById("attempts");
    const scoreDisplay = document.getElementById("score");
    const keyboardContainer = document.getElementById("keyboard");
    const newGameBtn = document.getElementById("newGameBtn");
    const hangmanParts = {
        head: document.getElementById("head"),
        body: document.getElementById("body"),
        leftArm: document.getElementById("leftArm"),
        rightArm: document.getElementById("rightArm"),
        leftLeg: document.getElementById("leftLeg"),
        rightLeg: document.getElementById("rightLeg")
    };

    function initializeGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        attempts = 6;
        gameOver = false;

        wordDisplay.innerHTML = "_ ".repeat(selectedWord.word.length).trim();
        hintDisplay.innerHTML = `Dica: ${selectedWord.hint}`;
        attemptsDisplay.innerHTML = attempts;
        scoreDisplay.innerHTML = totalScore; // Mantém a pontuação acumulada
        keyboardContainer.innerHTML = "";
        hideEmoji(); // Esconde qualquer emoji exibido
        resetHangman();

        createKeyboard();
    }

    function createKeyboard() {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        alphabet.forEach(letter => {
            const button = document.createElement("button");
            button.innerText = letter;
            button.classList.add("key");
            button.addEventListener("click", () => handleKeyClick(letter, button));
            keyboardContainer.appendChild(button);
        });
    }

    function handleKeyClick(letter, button) {
        if (gameOver || button.classList.contains("used")) return;

        button.classList.add("used");
        if (selectedWord.word.includes(letter)) {
            updateWordDisplay(letter);
            if (!wordDisplay.innerHTML.includes("_")) {
                totalScore++;
                scoreDisplay.innerHTML = totalScore;
                endGame(true);
            }
        } else {
            attempts--;
            attemptsDisplay.innerHTML = attempts;
            updateHangman();
            if (attempts === 0) {
                endGame(false);
            }
        }
    }

    function updateWordDisplay(letter) {
        let currentDisplay = wordDisplay.innerHTML.split(" ");
        selectedWord.word.split("").forEach((char, index) => {
            if (char === letter) {
                currentDisplay[index] = letter;
            }
        });
        wordDisplay.innerHTML = currentDisplay.join(" ");
    }

    function updateHangman() {
        const parts = Object.keys(hangmanParts);
        if (attempts < 6) {
            hangmanParts[parts[6 - attempts - 1]].style.display = "block";
        }
    }

    function endGame(isWin) {
        gameOver = true;
        if (isWin) {
            showEmoji("😊");
        } else {
            showEmoji("😢");
            alert(`Você perdeu! A palavra era: ${selectedWord.word}`);
        }
        scoreDisplay.innerHTML = totalScore;
        showNewGameButton();
    }

    function showEmoji(emoji) {
        if (!emojiDisplay) {
            emojiDisplay = document.createElement("div");
            emojiDisplay.className = "emoji";
            document.body.appendChild(emojiDisplay);
        }
        emojiDisplay.innerText = emoji;
    
        // Estilo inicial do emoji
        emojiDisplay.style.fontSize = "100px"; // Tamanho grande do emoji
        emojiDisplay.style.position = "fixed"; // Fica em cima de outros elementos
        emojiDisplay.style.top = "50%"; // Centraliza verticalmente
        emojiDisplay.style.left = "50%"; // Centraliza horizontalmente
        emojiDisplay.style.transform = "translate(-50%, -50%)"; // Centraliza perfeitamente
        emojiDisplay.style.display = "block"; // Mostra o emoji
    
        // Animação de desaparecer após 3 segundos
        setTimeout(() => {
            emojiDisplay.style.transition = "opacity 1s"; // Adiciona transição
            emojiDisplay.style.opacity = "0"; // Torna invisível
            setTimeout(() => {
                emojiDisplay.style.display = "none"; // Esconde após a animação
                emojiDisplay.style.opacity = "1"; // Reseta a opacidade para próxima exibição
            }, 1000); // Aguarda a animação de desaparecimento
        }, 3000); // Aguarda 3 segundos antes de desaparecer
    }
    

    function hideEmoji() {
        if (emojiDisplay) {
            emojiDisplay.style.display = "none";
        }
    }

    function resetHangman() {
        Object.values(hangmanParts).forEach(part => {
            part.style.display = "none";
        });
    }

    function showNewGameButton() {
        newGameBtn.style.display = "block";
    }

    newGameBtn.addEventListener("click", initializeGame);
    initializeGame();
});
