document.addEventListener("DOMContentLoaded", function () {
    const ball = document.getElementById("ball");
    const leftPaddle = document.getElementById("leftPaddle");
    const rightPaddle = document.getElementById("rightPaddle");
    const gameContainer = document.querySelector(".game-container");
    const scoreboard = document.getElementById("scoreboard");
    const winnerDisplay = document.getElementById("winnerDisplay");

    let ballX = 300;
    let ballY = 200;
    let ballSpeedX = 5;
    let ballSpeedY = 5;

    let leftPaddleY = 160;
    let rightPaddleY = 160;
    const paddleSpeed = 15;

    let leftPlayerScore = 0;
    let rightPlayerScore = 0;

    const maxScore = 20;

    // Move right paddle
    document.addEventListener("keydown", function (event) {
        if (event.key === "w" && rightPaddleY > 0) {
            rightPaddleY -= paddleSpeed;
        } else if (event.key === "s" && rightPaddleY < gameContainer.clientHeight - 80) {
            rightPaddleY += paddleSpeed;
        }
    });
    // Move left paddle
    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowUp" && leftPaddleY > 0) {
            leftPaddleY -= paddleSpeed;
        } else if (event.key === "ArrowDown" && leftPaddleY < gameContainer.clientHeight - 80) {
            leftPaddleY += paddleSpeed;
        }
    });

    // Toggle fullscreen
    document.addEventListener("keydown", function (event) {
        if (event.key === "f") {
            toggleFullscreen();
        }
    });

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            gameContainer.click();
        } else {
            document.exitFullscreen();
        }
    }

    // Additional event listener to handle click for fullscreen
    gameContainer.addEventListener("click", function () {
        if (!document.fullscreenElement) {
            gameContainer.requestFullscreen();
        }
    });

    // Listen for fullscreenchange event
    document.addEventListener("fullscreenchange", function () {
        if (document.fullscreenElement) {
            scoreboard.style.backgroundColor = "beige";
        } else {
            scoreboard.style.backgroundColor = "";
        }
    });

    function update() {
        if (leftPlayerScore >= maxScore || rightPlayerScore >= maxScore) {
            showWinner();
            return;
        }

        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballY < 0 || ballY > gameContainer.clientHeight - 20) {
            ballSpeedY = -ballSpeedY;
        }

        if (
            (ballX < 30 && ballY > leftPaddleY && ballY < leftPaddleY + 80) ||
            (ballX > gameContainer.clientWidth - 40 && ballY > rightPaddleY && ballY < rightPaddleY + 80)
        ) {
            ballSpeedX = -ballSpeedX;
        }

        if (ballX < 0) {
            rightPlayerScore++;
            resetGame();
        } else if (ballX > gameContainer.clientWidth) {
            leftPlayerScore++;
            resetGame();
        }

        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";

        leftPaddle.style.top = leftPaddleY + "px";
        rightPaddle.style.top = rightPaddleY + "px";

        document.getElementById("leftScore").innerText = leftPlayerScore;
        document.getElementById("rightScore").innerText = rightPlayerScore;
    }

    function resetGame() {
        if (leftPlayerScore >= maxScore || rightPlayerScore >= maxScore) {
            showWinner();
        } else {
            ballX = gameContainer.clientWidth / 2;
            ballY = gameContainer.clientHeight / 2;
            leftPaddleY = rightPaddleY = gameContainer.clientHeight / 2 - 40;
        }
    }

    function showWinner() {
        let winnerMessage = "";
        if (leftPlayerScore >= maxScore) {
            winnerMessage = "Left Player Wins!";
        } else if (rightPlayerScore >= maxScore) {
            winnerMessage = "Right Player Wins!";
        }

        // Display the winner message in the HTML
        winnerDisplay.innerText = winnerMessage;
    }

    function gameLoop() {
        update();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
