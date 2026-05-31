const timerText = document.getElementById("timer");
const levelDisplay = document.getElementById("levelDisplay");
const attemptsText = document.getElementById("attempts");
const output = document.getElementById("output");
const command = document.getElementById("command");

let level = 1;

const levelPasswords = {
    1: ["shadow", "cyber"],
    2: ["phantom", "matrix"],
    3: ["hacker", "network"]
};

let password = "";
let attempts = 3;
let gameOver = false;
let timeLeft = 60;
let timerStarted = false;


/* =========================
   TYPE WRITER ANIMATION
========================= */
function typeLine(text, speed = 50) {
    return new Promise(resolve => {
        let i = 0;
        let line = document.createElement("div");
        output.appendChild(line);

        let interval = setInterval(() => {
            line.innerHTML += text[i];
            i++;
            output.scrollTop = output.scrollHeight;

            if (i >= text.length) {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

function resetGame() {
    level = 1;
    attempts = 3;
    timeLeft = 60;
    gameOver = false;
    timerStarted = false;

    output.innerHTML = "";

    levelDisplay.textContent = "";
    attemptsText.textContent = "";
    timerText.textContent = "";

    setPassword();
    startGame();
}



/* =========================
   INIT GAME FLOW
========================= */
async function startGame() {
    await typeLine("Initializing secure terminal...");
    await typeLine("Bypassing firewall...");
    await typeLine("ACCESS GRANTED ✔");

    await typeLine("\nAvailable command: SCAN");

    
    setPassword();
}

/* =========================
   PASSWORD SET
========================= */
function setPassword() {
    password =
        levelPasswords[level][
            Math.floor(Math.random() * levelPasswords[level].length)
        ];
}

/* =========================
   TIMER
========================= */
function startTimer() {
    const timer = setInterval(() => {

        if (gameOver) {
            clearInterval(timer);
            return;
        }

        timeLeft--;
        timerText.textContent = timeLeft;

        if (timeLeft <= 0) {
            output.innerHTML += "\n\n☠ SIGNAL LOST... SYSTEM OVERRIDDEN ☠";
            output.innerHTML += "\n>>> OPERATION FAILED (TIME OUT)";
            gameOver = true;
            clearInterval(timer);
            setTimeout(resetGame, 3000);
        }

    }, 1000);
}

/* =========================
   UI INIT AFTER LOAD
========================= */
levelDisplay.textContent = "";
attemptsText.textContent = "";
timerText.textContent = "";

startGame();

/* =========================
   INPUT HANDLER
========================= */
command.addEventListener("keydown", async function (e) {

    if (e.key === "Enter" && !gameOver) {

        const text = command.value.toLowerCase();
        output.innerHTML += "\n\n> " + text;

        /* SCAN COMMAND */
        if (text === "scan") {
            await typeLine("Scanning system...");
            await typeLine("Firewall unstable...");
            await typeLine("DATA FOUND: ENCRYPTED PASSWORD DETECTED");
            await typeLine("Next command: HINT");
        }

        /* HINT COMMAND */
        else if (text === "hint") {

            if (!timerStarted) {
                startTimer();
                timerStarted = true;
            }

    levelDisplay.textContent = level;
    attemptsText.textContent = attempts;

            await typeLine("DECRYPT SIGNAL RECEIVED...");
            await typeLine("PASSWORD TRACE ACTIVE");
            await typeLine("START LETTER: " + password[0].toUpperCase());
            await typeLine("LENGTH: " + password.length);
            await typeLine("Attempts: " + attempts);
            await typeLine("Timer: " + timeLeft + "s");
        }

        /* STATUS */
        else if (text === "status") {
            await typeLine("LEVEL: " + level);
            await typeLine("ATTEMPTS LEFT: " + attempts);
            await typeLine("TIME REMAINING: " + timeLeft + "s");
        }

        /* ACCESS */
        else if (text.startsWith("access ")) {

            const guess = text.replace("access ", "");

            if (guess === password) {

                await typeLine("ACCESS GRANTED ✔");

                if (level < 3) {

                    level++;
                    attempts = 3;
                    timeLeft = 60;
                    levelDisplay.textContent = level;
                    attemptsText.textContent = attempts;
                    timerText.textContent = timeLeft;

                    setPassword();

                    await typeLine("LEVEL UPGRADED...");
                    await typeLine("REBOOTING SECURITY LAYER...");
                    await typeLine("NEW LEVEL: " + level);

                } else {

                    await typeLine("FINAL NODE BREACHED");
                    await typeLine("TOP SECRET FILE ACQUIRED");
                    await typeLine("MISSION COMPLETE ✔");

                    gameOver = true;
                }

            } else {

                attempts--;
                attemptsText.textContent = attempts;

                await typeLine("ACCESS DENIED ❌");
                await typeLine("TRACE DETECTED...");
                await typeLine(
                    "HINT: " +
                    password[0].toUpperCase() +
                    "_".repeat(password.length - 1)
                );

                if (attempts === 1) {
                    await typeLine(
                    "FINAL HINT: " +
                    password.slice(0, 2).toUpperCase() +
                    "_".repeat(password.length - 2)
                );
            }       
            if (attempts === 0) {
                    await typeLine("SYSTEM LOCKED 🔒");
                    await typeLine("MISSION FAILED ☠");
                    await typeLine("PASSWORD WAS: " + password.toUpperCase());

                    gameOver = true;

                    setTimeout(resetGame, 3000);
                }
            }
        }

        /* UNKNOWN */
        else {
            await typeLine("UNKNOWN COMMAND DETECTED");
        }

        command.value = "";
        output.scrollTop = output.scrollHeight;
    }
});