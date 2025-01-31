// NAV

let buildingsButton = document.querySelector("#buildingsTab");
let upgradesButton = document.querySelector("#upgradesTab");

let unlockedTabs = document.querySelectorAll("#shop nav button.unlocked");
unlockedTabs[0].classList = "selected";

buildingsButton.addEventListener("click", e => {
    let button = e.target;

    if (isUnlocked(button)) {
        console.log("meow")
        
    }
})

for (let i = 0; i < unlockedTabs.length; i++) {
    unlockedTabs[i].addEventListener("click", e => {
        e.preventDefault();
        let button = e.target
        let classes = button.className;
        
        if (classes.includes("unlocked")) {
            document.querySelector("#shop nav button.selected").classList = "unlocked";
            button.classList = "selected";
        }
    })
}

function isUnlocked(button) {
    return button.classList == "unlocked";
}











