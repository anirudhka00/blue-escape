const cases = [
    {
        category: "Vitals Check",
        prompt: "A tired classmate has dizziness, sweating, tremor and skipped breakfast before rounds. What is the first quick fix?",
        answers: ["Give glucose", "Start antibiotics", "Order a CT", "Check for cyanosis"],
        correct: "Give glucose",
        note: "Good catch. Quick thinking starts with the basics, and the basics save people. Also, somebody loves this smart brain very much."
    },
    {
        category: "Anatomy Sprint",
        prompt: "Which cranial nerve is most associated with facial expression?",
        answers: ["CN VII", "CN II", "CN V", "CN XII"],
        correct: "CN VII",
        note: "That is one more pathway locked in. Tiny repetitions become exam-day confidence, and I am cheering for you through all of it."
    },
    {
        category: "Pharm Flash",
        prompt: "Which drug class commonly ends in '-pril'?",
        answers: ["ACE inhibitors", "Beta blockers", "Loop diuretics", "Macrolides"],
        correct: "ACE inhibitors",
        note: "Pattern recognition is a superpower. You are building it one clean answer at a time."
    },
    {
        category: "Micro Moment",
        prompt: "Gram-positive cocci in clusters most strongly points toward which organism?",
        answers: ["Staphylococcus", "Streptococcus", "E. coli", "Vibrio"],
        correct: "Staphylococcus",
        note: "Clusters clicked. Your future self will be grateful for this five-second recall."
    },
    {
        category: "Emergency Brain",
        prompt: "A patient has sudden unilateral weakness and slurred speech. What should happen first?",
        answers: ["Activate stroke protocol", "Schedule outpatient follow-up", "Give a sedative", "Ignore if pain-free"],
        correct: "Activate stroke protocol",
        note: "You chose urgency. Calm, fast action is exactly what good doctors practice."
    },
    {
        category: "Cardio Cue",
        prompt: "Which heart valve is best heard at the left fifth intercostal space, midclavicular line?",
        answers: ["Mitral", "Aortic", "Pulmonic", "Tricuspid"],
        correct: "Mitral",
        note: "Nice. Even a sleepy brain can keep a map when it gets a little kindness."
    },
    {
        category: "Study Triage",
        prompt: "You have 15 free minutes and zero motivation. What is the highest-yield move?",
        answers: ["Do 5 flashcards", "Rewrite all notes", "Panic-scroll", "Skip sleep tonight"],
        correct: "Do 5 flashcards",
        note: "Five focused cards count. Small wins are still wins, especially in med school. You are loved on the tired days too."
    },
    {
        category: "Patient Safety",
        prompt: "Before giving any medication, what is the most dependable first check?",
        answers: ["Right patient", "Favorite color", "Room temperature", "Nearest elevator"],
        correct: "Right patient",
        note: "Safety first, always. You are training the habits patients deserve."
    }
];

const pickupLines = [
    "Are you the mitral valve? Because my heart sounds best around you.",
    "You must be my favorite lecture, because I keep replaying you in my head.",
    "Are you glucose? Because you make every tired day recover.",
    "You are the only diagnosis I never second-guess.",
    "If loving you was a clinical skill, I would be honors-level.",
    "You make my heart rate clinically significant.",
    "Are you a study break? Because you make everything feel possible again."
];

let score = 0;
let streak = 0;
let currentCase = 0;
let answered = false;

const scoreDisplay = document.getElementById("score");
const streakDisplay = document.getElementById("streak");
const roundDisplay = document.getElementById("roundNumber");
const categoryDisplay = document.getElementById("caseCategory");
const promptDisplay = document.getElementById("casePrompt");
const choicesDisplay = document.getElementById("answerChoices");
const feedbackDisplay = document.getElementById("gameFeedback");
const nextButton = document.getElementById("nextCase");

function shuffle(items){
    return [...items].sort(() => Math.random() - 0.5);
}

function renderCase(){
    const item = cases[currentCase];

    answered = false;
    roundDisplay.textContent = `${currentCase + 1}/${cases.length}`;
    categoryDisplay.textContent = item.category;
    promptDisplay.textContent = item.prompt;
    feedbackDisplay.textContent = "Pick the strongest answer.";
    nextButton.textContent = currentCase === cases.length - 1 ? "Finish Sprint" : "Next Case";
    nextButton.disabled = true;
    choicesDisplay.innerHTML = "";

    shuffle(item.answers).forEach((answer) => {
        const button = document.createElement("button");
        button.className = "answer-choice";
        button.textContent = answer;
        button.onclick = () => chooseAnswer(button, answer);
        choicesDisplay.appendChild(button);
    });
}

function chooseAnswer(button, answer){
    if(answered){
        return;
    }

    const item = cases[currentCase];
    const isCorrect = answer === item.correct;

    answered = true;
    score += isCorrect ? 10 + streak * 2 : 0;
    streak = isCorrect ? streak + 1 : 0;

    [...choicesDisplay.children].forEach((choice) => {
        choice.disabled = true;

        if(choice.textContent === item.correct){
            choice.classList.add("correct");
        }
    });

    if(!isCorrect){
        button.classList.add("wrong");
    }

    scoreDisplay.textContent = score;
    streakDisplay.textContent = streak;
    feedbackDisplay.innerHTML = isCorrect
        ? `<strong>Correct.</strong> ${item.note}`
        : `<strong>Almost.</strong> The answer is ${item.correct}. ${item.note}`;
    nextButton.disabled = false;
}

function finishSprint(){
    const maxScore = cases.length * 10;
    const message = score >= maxScore
        ? "Clean round. Your brain showed up even if motivation did not."
        : "Sprint complete. You reviewed, recovered, and still moved forward.";

    categoryDisplay.textContent = "Rounds Complete";
    promptDisplay.textContent = message;
    choicesDisplay.innerHTML = "";
    feedbackDisplay.innerHTML = `<strong>Final score: ${score}.</strong> Take a breath, drink water, and keep going gently.`;
    nextButton.textContent = "Play Again";
    nextButton.disabled = false;
}

nextButton.onclick = () => {
    if(currentCase === cases.length - 1 && answered){
        finishSprint();
        currentCase++;
        return;
    }

    if(currentCase >= cases.length){
        score = 0;
        streak = 0;
        currentCase = 0;
        scoreDisplay.textContent = score;
        streakDisplay.textContent = streak;
        renderCase();
        return;
    }

    currentCase++;
    renderCase();
};

renderCase();

const arcadeCanvas = document.getElementById("arcadeCanvas");
const arcadeContext = arcadeCanvas.getContext("2d");
const arcadeScoreDisplay = document.getElementById("arcadeScore");
const arcadeTimeDisplay = document.getElementById("arcadeTime");
const arcadeLivesDisplay = document.getElementById("arcadeLives");
const arcadeMessage = document.getElementById("arcadeMessage");
const startArcadeButton = document.getElementById("startArcade");
const moveLeftButton = document.getElementById("moveLeft");
const moveRightButton = document.getElementById("moveRight");

const arcadePlayer = {
    x: arcadeCanvas.width / 2 - 34,
    y: arcadeCanvas.height - 48,
    width: 68,
    height: 22,
    speed: 7
};

let arcadeItems = [];
let arcadeScore = 0;
let arcadeLives = 3;
let arcadeTime = 30;
let arcadeRunning = false;
let arcadeFrame = 0;
let arcadeTimer = null;
let arcadeAnimation = null;
let arcadeDirection = 0;

function resetArcade(){
    arcadeItems = [];
    arcadeScore = 0;
    arcadeLives = 3;
    arcadeTime = 30;
    arcadeFrame = 0;
    arcadePlayer.x = arcadeCanvas.width / 2 - arcadePlayer.width / 2;
    arcadeScoreDisplay.textContent = arcadeScore;
    arcadeLivesDisplay.textContent = arcadeLives;
    arcadeTimeDisplay.textContent = arcadeTime;
    arcadeMessage.textContent = "Catch green study boosts and pink love boosts. Dodge red burnout drops.";
    drawArcade();
}

function drawArcade(){
    arcadeContext.clearRect(0, 0, arcadeCanvas.width, arcadeCanvas.height);

    arcadeContext.fillStyle = "#07101f";
    arcadeContext.fillRect(0, 0, arcadeCanvas.width, arcadeCanvas.height);

    arcadeContext.strokeStyle = "rgba(158,223,200,.22)";
    arcadeContext.lineWidth = 1;

    for(let x = 30; x < arcadeCanvas.width; x += 70){
        arcadeContext.beginPath();
        arcadeContext.moveTo(x, 0);
        arcadeContext.lineTo(x - 80, arcadeCanvas.height);
        arcadeContext.stroke();
    }

    arcadeContext.fillStyle = "#9edfc8";
    arcadeContext.fillRect(arcadePlayer.x, arcadePlayer.y, arcadePlayer.width, arcadePlayer.height);
    arcadeContext.fillStyle = "#ffffff";
    arcadeContext.fillRect(arcadePlayer.x + 16, arcadePlayer.y - 12, 36, 12);

    arcadeItems.forEach((item) => {
        arcadeContext.beginPath();
        arcadeContext.fillStyle = item.type === "heart" ? "#ff8fc7" : item.type === "boost" ? "#80e4b7" : "#ff7676";
        arcadeContext.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
        arcadeContext.fill();

        arcadeContext.fillStyle = "#07101f";
        arcadeContext.font = "bold 16px Poppins, sans-serif";
        arcadeContext.textAlign = "center";
        arcadeContext.textBaseline = "middle";
        arcadeContext.fillText(item.type === "heart" ? "♥" : item.type === "boost" ? "+" : "!", item.x, item.y + 1);
    });
}

function spawnArcadeItem(){
    const roll = Math.random();
    const type = roll > 0.84 ? "heart" : roll > 0.35 ? "boost" : "burnout";

    arcadeItems.push({
        x: 28 + Math.random() * (arcadeCanvas.width - 56),
        y: -24,
        radius: type === "heart" ? 19 : 17,
        speed: 1.65 + Math.random() * 1.55,
        type
    });
}

function hitPlayer(item){
    return item.x + item.radius > arcadePlayer.x
        && item.x - item.radius < arcadePlayer.x + arcadePlayer.width
        && item.y + item.radius > arcadePlayer.y
        && item.y - item.radius < arcadePlayer.y + arcadePlayer.height;
}

function updateArcade(){
    if(!arcadeRunning){
        return;
    }

    arcadeFrame++;
    arcadePlayer.x += arcadeDirection * arcadePlayer.speed;
    arcadePlayer.x = Math.max(0, Math.min(arcadeCanvas.width - arcadePlayer.width, arcadePlayer.x));

    if(arcadeFrame % 40 === 0){
        spawnArcadeItem();
    }

    arcadeItems.forEach((item) => {
        item.y += item.speed;
    });

    arcadeItems = arcadeItems.filter((item) => {
        if(hitPlayer(item)){
            if(item.type === "heart"){
                arcadeScore += 25;
                arcadeMessage.textContent = pickupLines[Math.floor(Math.random() * pickupLines.length)];
            }else if(item.type === "boost"){
                arcadeScore += 10;
                arcadeMessage.textContent = "Study boost caught. Tiny wins still count.";
            }else{
                arcadeLives--;
                arcadeMessage.textContent = "Burnout hit. Breathe, reset, keep moving.";
            }

            arcadeScoreDisplay.textContent = arcadeScore;
            arcadeLivesDisplay.textContent = arcadeLives;
            return false;
        }

        return item.y < arcadeCanvas.height + item.radius;
    });

    if(arcadeLives <= 0){
        endArcade("Run over. You protected your energy as long as you could.");
        return;
    }

    drawArcade();
    arcadeAnimation = requestAnimationFrame(updateArcade);
}

function endArcade(message){
    arcadeRunning = false;
    clearInterval(arcadeTimer);
    cancelAnimationFrame(arcadeAnimation);
    startArcadeButton.textContent = "Play Again";
    arcadeMessage.textContent = `${message} Final score: ${arcadeScore}.`;
    drawArcade();
}

function startArcade(){
    clearInterval(arcadeTimer);
    cancelAnimationFrame(arcadeAnimation);
    resetArcade();
    arcadeRunning = true;
    startArcadeButton.textContent = "Running";
    arcadeMessage.textContent = "Move fast. Catch boosts, catch love, dodge burnout.";

    arcadeTimer = setInterval(() => {
        arcadeTime--;
        arcadeTimeDisplay.textContent = arcadeTime;

        if(arcadeTime <= 0){
            endArcade("Shift complete. Productive break achieved.");
        }
    }, 1000);

    updateArcade();
}

function setArcadeDirection(direction){
    arcadeDirection = direction;
}

document.addEventListener("keydown", (event) => {
    if(event.key === "ArrowLeft" || event.key.toLowerCase() === "a"){
        setArcadeDirection(-1);
    }

    if(event.key === "ArrowRight" || event.key.toLowerCase() === "d"){
        setArcadeDirection(1);
    }
});

document.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();

    if(key === "arrowleft" || key === "arrowright" || key === "a" || key === "d"){
        setArcadeDirection(0);
    }
});

moveLeftButton.onpointerdown = () => setArcadeDirection(-1);
moveRightButton.onpointerdown = () => setArcadeDirection(1);
moveLeftButton.onpointerup = () => setArcadeDirection(0);
moveRightButton.onpointerup = () => setArcadeDirection(0);
moveLeftButton.onpointerleave = () => setArcadeDirection(0);
moveRightButton.onpointerleave = () => setArcadeDirection(0);
startArcadeButton.onclick = startArcade;

resetArcade();
