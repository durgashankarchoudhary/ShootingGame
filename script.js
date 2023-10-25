let gameRunning = false;
let fireballInterval = 1000;
let gameScore = 0;

const startButton = document.getElementById("startbutton");
startButton.addEventListener("click", startgame);

const mainGamePage = document.querySelector(".mainGamePage");
const gameOverPage = document.querySelector(".endOfGame");
const finalScore = document.querySelector(".finalScore");
const scoreInput = document.getElementById("score");

function startgame() {
  if (gameRunning) return;

  gameRunning = true;

  startButton.style.display = "none";

  const attackPanels = document.querySelectorAll(".attackpanel .attacker");

  function createFireball(fireballInterval) {
    if (!gameRunning) return;
    const randomAttackPanel =
      attackPanels[Math.floor(Math.random() * attackPanels.length)];

    const fireball = document.createElement("div");
    fireball.className = "fireball";

    randomAttackPanel.appendChild(fireball);

    if (fireballInterval >= 250) {
      fireballInterval -= 10;
    }

    if (fireballInterval < 900) {
      console.log(fireballInterval);
      const fireballss = document.querySelectorAll(".fireball");

      switch (true) {
        case fireballInterval >= 750 && fireballInterval <= 900:
          fireballss.forEach((fireball) => {
            fireball.style.animation = "moveFireball 4.5s linear";
          });
          break;
        case fireballInterval >= 600 && fireballInterval < 750:
          fireballss.forEach((fireball) => {
            fireball.style.animation = "moveFireball 4s linear";
          });
          break;
        case fireballInterval >= 450 && fireballInterval < 600:
          fireballss.forEach((fireball) => {
            fireball.style.animation = "moveFireball 3.5s linear";
          });
          break;
        case fireballInterval >= 350 && fireballInterval < 450:
          fireballss.forEach((fireball) => {
            fireball.style.animation = "moveFireball 3s linear";
          });
          break;
        case fireballInterval >= 250 && fireballInterval < 350:
          fireballss.forEach((fireball) => {
            fireball.style.animation = "moveFireball 2.5s linear";
          });
          break;
        default:
          return;
      }
    }

    setTimeout(() => createFireball(fireballInterval), fireballInterval);
  }

  createFireball(fireballInterval);

  const shootButtons = document.querySelectorAll(".shootpanel .shooter");

  function createBullet(shootButton) {
    const bullet = document.createElement("div");
    bullet.className = "bullet";

    shootButton.appendChild(bullet);
  }

  shootButtons.forEach((shootButton) => {
    shootButton.onclick = () => createBullet(shootButton);
  });

  requestAnimationFrame(checkCollisions);
}

function checkCollisions() {
  if (gameRunning == false) return;

  const bullets = document.querySelectorAll(".bullet");
  const fireballs = document.querySelectorAll(".fireball");

  bullets.forEach((bullet) => {
    const bulletRect = bullet.getBoundingClientRect();
    fireballs.forEach((fireball) => {
      const fireballRect = fireball.getBoundingClientRect();

      if (
        bulletRect.left < fireballRect.right &&
        bulletRect.right > fireballRect.left &&
        bulletRect.top < fireballRect.bottom &&
        bulletRect.bottom > fireballRect.top
      ) {
        bullet.remove();
        fireball.remove();
        gameScore++;
        scoreInput.value = gameScore;
      }
    });
  });

  const shootingPanel = document.querySelector(".shootpanel");
  const shootingPanelRect = shootingPanel.getBoundingClientRect();

  fireballs.forEach((fireball) => {
    const fireballRect = fireball.getBoundingClientRect();

    if (fireballRect.bottom >= shootingPanelRect.top) {
      stopgame();
    }
  });

  const attackPanel = document.querySelector(".attackpanel");
  const attackPanelRect = attackPanel.getBoundingClientRect();

  bullets.forEach((bullet) => {
    const bulletRect = bullet.getBoundingClientRect();

    if (bulletRect.top <= attackPanelRect.bottom) {
      bullet.remove();
    }
  });

  requestAnimationFrame(checkCollisions);
}

function stopgame() {
  gameRunning = false;

  const bullets = document.querySelectorAll(".bullet");
  const fireballs = document.querySelectorAll(".fireball");

  bullets.forEach((bullet) => {
    bullet.remove();
  });

  fireballs.forEach((fireball) => {
    fireball.remove();
  });

  mainGamePage.style.display = "none";
  gameOverPage.style.display = "block";
  finalScore.innerHTML = "Your Score: " + gameScore;
}

const restartButton = document.getElementById("restartbutton");
restartButton.onclick = restartgame;

function restartgame() {
  gameScore = 0;
  fireballInterval = 1000;

  scoreInput.value = gameScore;

  mainGamePage.style.display = "block";
  gameOverPage.style.display = "none";

  startgame();
}
