const moodDisplay =
document.getElementById("moodDisplay");

function showMood(type){

    const moods = {

        burnout:
        "Prescription: Water, Stretch, Break, One Kiss 💙",

        missing:
        "Remember bar hopping, bowling and that auto ride home? 💋",

        doctor:
        "Future doctor mode activated 🩺"
    };

    moodDisplay.innerHTML =
    moods[type];
}

const notes = [

"Future doctor, don't forget sleep is medicine too.",

"You're stronger than today's exam.",

"I miss your face.",

"One step closer to becoming Dr. Rhea."
];

const day =
new Date().getDate();

document.getElementById("dailyNote")
.textContent =
notes[day % notes.length];

const secret =
document.getElementById("secretHeart");

secret.onclick = () => {

document.getElementById("letterModal")
.classList.remove("hidden");

};

function closeLetter(){

document.getElementById("letterModal")
.classList.add("hidden");

}

window.closeLetter =
closeLetter;
