const attemptsText = document.getElementById("attempts");
const output = document.getElementById("output");
const command = document.getElementById("command");

const passwords = [
    "shadow",
    "matrix",
    "cyber",
    "phantom",
    "hacker"
];

const password =
    passwords[Math.floor(Math.random() * passwords.length)];

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
                "\nSecurity Level: MEDIUM";

        }

        else if (text.startsWith("access ")) {

            const guess = text.replace("access ", "");

            if (guess === password) {

                output.innerHTML +=
                    "\n\nACCESS GRANTED" +
                    "\nSYSTEM BREACHED" +
                    "\nMISSION COMPLETE";

                gameOver = true;

            } else {

                attempts--;

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