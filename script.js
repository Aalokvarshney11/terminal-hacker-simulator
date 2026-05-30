const attemptsText = document.getElementById("attempts");
const output = document.getElementById("output");
const command = document.getElementById("command");

let level = 1;

const levelPasswords = {
    1: ["shadow", "cyber"],
    2: ["phantom", "matrix"],
    3: ["hacker", "network"]
};

let password =
    levelPasswords[level][
        Math.floor(Math.random() * levelPasswords[level].length)
    ];

let attempts = 3;
let gameOver = false;

command.addEventListener("keydown", function (e) {

    if (e.key === "Enter" && !gameOver) {

        const text = command.value.toLowerCase();

        output.innerHTML += "\n\n> " + text;

        if (text === "help") {

            output.innerHTML +=
                "\nscan" +
                "\ndecrypt" +
                "\nhint" +
                "\nstatus" +
                "\nlevel" +
                "\naccess [password]";

        }

        else if (text === "scan") {

            output.innerHTML +=
                "\nScanning system..." +
                "\nFirewall detected." +
                "\nEncrypted password found.";

        }

        else if (text === "decrypt") {

            output.innerHTML +=
                "\nDecrypting..." +
                "\nPassword data recovered.";

        }

        else if (text === "hint") {

            output.innerHTML +=
                "\nStarts with: " + password[0].toUpperCase() +
                "\nLength: " + password.length;

        }

        else if (text === "status") {

            output.innerHTML +=
                "\nAttempts Left: " + attempts +
                "\nSecurity Level: MEDIUM" +
                "\nCurrent Level: " + level;

        }

        else if (text === "level") {

            output.innerHTML +=
                "\nCurrent Level: " + level;

        }

        else if (text.startsWith("access ")) {

            const guess = text.replace("access ", "");

            if (guess === password) {

                output.innerHTML += "\n\nACCESS GRANTED";

                if (level < 3) {

                    level++;
                    attempts = 3;
                    attemptsText.textContent = attempts;

                    password =
                        levelPasswords[level][
                            Math.floor(Math.random() * levelPasswords[level].length)
                        ];

                    output.innerHTML +=
                        "\nLEVEL COMPLETE" +
                        "\nLoading Level " + level + "...";

                } else {

                    output.innerHTML +=
                        "\n\nMISSION COMPLETE" +
                        "\nTOP SECRET FILE RETRIEVED";

                    gameOver = true;
                }

            } else {

                attempts--;
                attemptsText.textContent = attempts;

                output.innerHTML +=
                    "\nACCESS DENIED" +
                    "\nAttempts Left: " + attempts;

                if (attempts === 0) {

                    output.innerHTML +=
                        "\n\nSYSTEM LOCKED" +
                        "\nMISSION FAILED";

                    gameOver = true;
                }
            }

        }

        else {

            output.innerHTML +=
                "\nUnknown command";

        }

        command.value = "";
        output.scrollTop = output.scrollHeight;
    }

});