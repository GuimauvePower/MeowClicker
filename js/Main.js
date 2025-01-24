// GAME DATA

let gameData = {
    gameVersion: "0.0.2a",
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



// VALUE DISPLAYS

const meowCounter = document.querySelector("#meowCounter");
const meowUpgrader1Button = document.querySelector("#meowUpgrader1");
const buyCat1Button = document.querySelector("#buyCat1");



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

// this repeats every second
let mainGameLoop = window.setInterval(e => {
    // give mps (meows per second)
    let baseMPS = (gameData.ownedCat1) // + other sources
    // let totalMPS = (baseMPS * (plusMult1 + plusMult2)) * multiplicativeMult1 etc

    gameData.meows += baseMPS;

    // Update all displays (in case it wasnt already done)
    updateDisplays();
}, 1000)

// Saves gameData every 30 sec
let saveGameLoop = window.setInterval(e => {
    localStorage.setItem("meowClickerSave", JSON.stringify(gameData));
    console.log("Game Data saved!")
}, 30000)

let counterDisplayLoop = window.setInterval(e => {
    if (displayedMeows != gameData.meows) {
        let diff = (gameData.meows - displayedMeows) * .4;
        if (diff >= 0) displayedMeows += Math.ceil(diff);
        else displayedMeows += Math.floor(diff);
        meowCounter.innerHTML = "<b>" + displayedMeows + "</b> meows meowed";
    }
}, 50)

function updateDisplays() {
    meowUpgrader1Button.innerHTML = "Meow stronger (+1) - <b>" + meowUpgrader1Cost(gameData.meowUpgrader1Lvl) + " meows</b>"
    buyCat1Button.innerHTML = "Buy 1 cat (+1 mps) - <b>" + cat1Cost(gameData.cat1Bought) + " meows</b>"
}



// SCALING FUNCTIONS

function meowUpgrader1Cost(n) {
    return Math.ceil(10 * Math.pow(1.2, 0.5 * n) + n); // f1(n)
}

function cat1Cost(n) {
    return Math.ceil(20 * Math.pow(1.125, 0.25 * n) + 2 * n); // f2(n)
}



// OTHER FUNCTIONS

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



