// GAME DATA

let gameData = {
    gameVersion: "0.0.3a",
    totalMeows: 0,
    meows: 0,
    meowsPerClick: 1,
    ownedCat1: 0,
    meowUpgrader1Lvl: 0,
    cat1Bought: 0,
}

function clearData(secretPassword) {
    if (secretPassword === "im sure") {
        localStorage.clear("meowClickerSave");
        location.reload();
    }
}

function saveGameNow() {
    localStorage.setItem("meowClickerSave", JSON.stringify(gameData));
    console.log("Game Data saved!\nExtra soon to be more precise!")
}



// OTHER VARS

let displayedMeows = 0;



// VALUE DISPLAYS & BUTTONS

const meowCounter = document.querySelector("#meowCounter");
const mpsCounter = document.querySelector("#mpsCounter");
const meowUpgrader1Button = document.querySelector("#meowUpgrader1");
const buyCat1Button = document.querySelector("#buyCat1");

let meowButton = document.querySelector("#meowButton");



// ADD EVENT LISTENERS

meowButton.addEventListener("click", e => {
    e.preventDefault();
    meow();
})



// EXTRA IMPORTANT FUNCTIONS

let saveGame = JSON.parse(localStorage.getItem("meowClickerSave"));
if (saveGame !== null) {
    if (saveGame.gameVersion === gameData.gameVersion) {
        gameData = saveGame;
        console.log("Game Data loaded with no issues!")
        updateDisplays();
    }
    else {
        console.log("OUTDATED SAVE\nwill try to update save to newer version (" + saveGame.gameVersion + " --> " + gameData.gameVersion + ")")
        Object.keys(gameData).forEach(key => {
            if (key !== "gameVersion") {
                console.log("currently trying to update: " + key)
                if (Object.prototype.hasOwnProperty.call(saveGame, key)) {
                    gameData[key] = saveGame[key];
                }
                console.log(key + " is now equal to " + gameData[key])
            }
        });
    }
}

// this repeats 50 times every second
let mainGameLoop = window.setInterval(e => {
    // give mps (meows per second)
    let baseMPS = (gameData.ownedCat1) // + other sources

    // EXAMPLE:
    // let totalMPS = (baseMPS * (plusMult1 + plusMult2)) * multiplicativeMult1 etc

    gameData.meows += baseMPS / 50; // divided by 50 since its every 20ms

    // Update all displays (in case it wasnt already done)
    mpsCounter.innerText = "(+" + baseMPS + " mps)";
    updateDisplays();
}, 20) // good value: 20

// Saves gameData every 30 sec
let saveGameLoop = window.setInterval(e => {
    localStorage.setItem("meowClickerSave", JSON.stringify(gameData));
    console.log("Game Data saved!")
}, 30000)

let counterDisplayLoop = window.setInterval(e => {
    if (displayedMeows != gameData.meows) {
        let diff = (Math.floor(gameData.meows) - displayedMeows) * .4;

        if (diff >= 0)
            displayedMeows += Math.ceil(diff);
        else
            displayedMeows += Math.floor(diff);

        meowCounter.innerHTML = displayedMeows;
    }
}, 50)

function updateDisplays() {
    meowUpgrader1Button.innerHTML = "Meow stronger (+1) - <b>" + meowUpgrader1Cost(gameData.meowUpgrader1Lvl) + " meows</b>"
    buyCat1Button.innerHTML = "Buy 1 cat (+1 mps) - <b>" + cat1Cost(gameData.cat1Bought) + " meows</b>"
}



// SCALING FUNCTIONS

function meowUpgrader1Cost(n) {
    return Math.ceil(20 * Math.pow(1.25, 0.9 * n) + 1.5 * n); // f1(n)
}

function cat1Cost(n) {
    return Math.ceil(30 * Math.pow(1.25, 0.75 * n) + 2.5 * n); // f2(n)
}



// OTHER FUNCTIONS

function load() {
    let versionDisplay = document.querySelector("#version");
    versionDisplay.textContent = "v" + gameData.gameVersion;
}

function meow() {
    gameData.meows += gameData.meowsPerClick;
    gameData.totalMeows += gameData.meowsPerClick;

    updateDisplays();
}


function meowUpgrader1() {

    const currentCost = meowUpgrader1Cost(gameData.meowUpgrader1Lvl);

    if (gameData.meows >= currentCost) {
        gameData.meows -= currentCost;

        gameData.meowsPerClick++;
        gameData.meowUpgrader1Lvl++;
    }

    updateDisplays();
}

function buyCat1() {

    const currentCost = cat1Cost(gameData.cat1Bought);

    if (gameData.meows >= currentCost) {
        gameData.meows -= currentCost;

        gameData.ownedCat1++;
        gameData.cat1Bought++;
    }

    updateDisplays();
}


load();
