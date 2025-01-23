// GAME DATA

let gameData = {
    gameVersion: "0.0.1a",
    totalMeows: 0,
    meows: 0,
    meowsPerClick: 1,
    meowUpgrader1Lvl: 0,
    newRandomVar: 7241,
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



// VALUE DISPLAYS

const meowCounter = document.querySelector("#meowCounter");
const meowUpgrader1Button = document.querySelector("#meowUpgrader1");



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

let mainGameLoop = window.setInterval(e => {
    // this repeats every second
    updateDisplays();
}, 1000)

let saveGameLoop = window.setInterval(e => {
    // Saves gameData every 30 sec
    localStorage.setItem("meowClickerSave", JSON.stringify(gameData));
    console.log("Game Data saved!")
}, 30000)

function updateDisplays() {
    meowCounter.innerHTML = "<b>" + gameData.meows + "</b> meows meowed"
    meowUpgrader1Button.innerHTML = "Meow stronger (+1) - <b>" + upgrader1Cost(gameData.meowUpgrader1Lvl) + " meows</b>"
}


// SCALING FUNCTIONS

function upgrader1Cost(n) {
    return Math.ceil(Math.pow(1.4, n) + (4 * n)) + 9
}



// OTHER FUNCTIONS

function meow() {
    gameData.meows += gameData.meowsPerClick;
    gameData.totalMeows += gameData.meowsPerClick;

    updateDisplays();
}


function meowUpgrader1() {

    const currentUpgradeCost = upgrader1Cost(gameData.meowUpgrader1Lvl);

    if (gameData.meows >= currentUpgradeCost) {
        gameData.meows -= currentUpgradeCost;

        gameData.meowsPerClick++;
        gameData.meowUpgrader1Lvl++;
    }

    updateDisplays();
}



