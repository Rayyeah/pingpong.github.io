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

    let leftPaddleY = 170;
    let rightPaddleY = 160;
    const paddleSpeed = 20;

    let leftPlayerScore = 0;
    let rightPlayerScore = 0;

    const maxScore = 20;

    console.log(c);

    // Move right paddle switch it to left 
    document.addEventListener("keydown", function (event) {
        if (event.key === "w" && leftPaddleY > 0) {
            leftPaddleY -= paddleSpeed;
        } else if (event.key === "s" && leftPaddleY < gameContainer.clientHeight - 80) {
            leftPaddleY += paddleSpeed;
        }
    });
    // Move left paddle
    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowUp" && rightPaddleY > 0) {
            rightPaddleY -= paddleSpeed;
        } else if (event.key === "ArrowDown" && rightPaddleY < gameContainer.clientHeight - 80) {
            rightPaddleY += paddleSpeed;
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
            winnerMessage = "Player One Wins!";
        } else if (rightPlayerScore >= maxScore) {
            winnerMessage = "Player Two Wins!";
        }

        winnerDisplay.innerText = winnerMessage;
    }

    function gameLoop() {
        update();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
