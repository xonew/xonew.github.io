const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
//fishImages: 1 through 16, correct left answers are odd, vice versa, corresponding success image is +8 away
const fish = document.getElementById("fish");
let playCount = 0;
let wins = 0;
let setup = true;

function updatePlayCounter() {
    playCount++;
    document.getElementById("counterValue").textContent = playCount;
}

function updateWins() {
    wins++;
    document.getElementById("wins").textContent = wins;
}

function playWinSound() {
    document.getElementById("winSound").src = "./assets/sounds/audio" + (Math.floor(Math.random() * 8)+1) + ".wav";
    document.getElementById("winSound").play();
}

function setupFishImages() {
    const id = Math.floor(Math.random()*8) + 1
    fish.src = "./assets/fish/" + String(id) + ".png";
    fish.alt = id;
    setup = false;
}

async function checkCorrect(dir) {
    setup = true;
    updatePlayCounter();
    const isCorrect = (fish.alt % 2 === 0) ? dir === "left" : dir === "right";
    if (isCorrect) {
        fish.src = "./assets/fish/" + (Number(fish.alt) + 8) + ".png";
        fish.alt = fish.alt + 8;
        playWinSound();
        updateWins();
    } else {
        document.getElementById("lossSound").play();
    }
    await showMessage(isCorrect ? "Correct!" : "Try Again!", 1000);
    setupFishImages();
}

async function showMessage(message, duration) {
    const successMessage = document.getElementById("successMessage");
    successMessage.textContent = message;
    successMessage.style.display = "block";
    await new Promise((resolve) => setTimeout(function () {
        successMessage.style.display = "none";
        resolve();
    }, duration));
    
}

leftButton.addEventListener("click", () => {
    if (setup === false) checkCorrect("left");
});

rightButton.addEventListener("click", () => {
    if (setup === false) checkCorrect("right");
});

setupFishImages();
