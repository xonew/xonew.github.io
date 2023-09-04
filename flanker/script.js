const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
const fishImages = {
    blue: ["bluefishright.png", "bluefishleft.png"],
    pink: ["pinkfishright.png", "pinkfishleft.png"]
};
const fishElements = document.querySelectorAll(".fish");
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
    document.getElementById("winSound").src = "audio" + (Math.floor(Math.random() * 8)+1) + ".wav";
    document.getElementById("winSound").play();
}

function setupFishImages() {
    const randomColor = Math.random() < 0.5 ? "blue" : "pink";
    const randomOuterFish = Math.random() < 0.5 ? 0 : 1;
    const randomInnerFish = Math.random() < 0.5 ? 0 : 1;
    fishElements.forEach((fishElement) => {
        fishElement.src = fishImages[randomColor][randomOuterFish];
        fishElement.alt = randomOuterFish === 0 ? randomColor + " right" : randomColor + " left";
    });
    fishElements[2].src = fishImages[randomColor][randomInnerFish];
    fishElements[2].alt = randomInnerFish === 0 ? randomColor + " right" : randomColor + " left";
    setup = false;
}

function checkFishColor(dir) {
    setup = true;
    updatePlayCounter();
    const isBlue = fishElements[0].src.includes("blue");
    const isCorrect = isBlue ? (fishElements[2].alt.includes(dir)) : (fishElements[0].alt.includes(dir));
    const message = isCorrect ? "Correct!" : "Try again!";
    if (isCorrect) {
        playWinSound();
        updateWins();
    } else {
        document.getElementById("lossSound").play();
    }
    alert(message);
    setupFishImages();
}

leftButton.addEventListener("click", () => {
    if (setup === false) checkFishColor("left");
});

rightButton.addEventListener("click", () => {
    if (setup === false) checkFishColor("right");
});

setupFishImages();
