let gameRunning = false;

const startButton = document.getElementById("startbutton");
startButton.addEventListener('click', startgame);

function startgame() {
  if (gameRunning) return;

  gameRunning = true;

  const attackPanels = document.querySelectorAll(".attackpanel .attacker");

  let i = 0;
  function createFireball() {
    const randomAttackPanel =
      attackPanels[Math.floor(Math.random() * attackPanels.length)];

    const fireball = document.createElement("div");
    fireball.id = `fb${i}`;
    i++;
    fireball.className = "fireball";

    randomAttackPanel.appendChild(fireball);
  }

  let j = 1000;
  function startFireballGeneration() {
    if (gameRunning == false) return;

    createFireball();

    if (j >= 250) {
      j -= 10;
    }
    setTimeout(startFireballGeneration, j);
  }

  startFireballGeneration();
  requestAnimationFrame(checkCollisions);
}

const shootButtons = document.querySelectorAll(".shootpanel .shooter");
const shootButtonsArray = Array.from(shootButtons);

let k = 0;
for (const shootButton of shootButtonsArray) {
  shootButton.onclick = () => shootbullet(shootButton);
}

function shootbullet(shootButton) {
  const bullet = document.createElement("div");
  bullet.id = `bull${k}`;
  k++;
  bullet.className = "bullet";

  shootButton.appendChild(bullet);
}

function checkCollisions() {
  // console.log("function checkCollisions0 excuted");

  // if(gameRunning === false) return;

  // console.log("function checkCollisions excuted");

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
      }
    });
  });

  const shootingPanel = document.querySelector(".shootpanel");
  const shootingPanelRect = shootingPanel.getBoundingClientRect();

  fireballs.forEach((fireball) => {
    const fireballRect = fireball.getBoundingClientRect();

    if (
      fireballRect.bottom >= shootingPanelRect.top
    ) {
      stopgame();
    }
  });

  const attackPanel = document.querySelector(".attackpanel");
  const attackPanelRect = attackPanel.getBoundingClientRect();

  bullets.forEach((bullet) => {
    const bulletRect = bullet.getBoundingClientRect();

    if (
      bulletRect.top <= attackPanelRect.bottom
    ) {
      bullet.remove();
    }
  });

  requestAnimationFrame(checkCollisions);
}

const stopButton = document.getElementById("stopbutton");
stopButton.onclick = stopgame;

function stopgame() {
  gameRunning = false;

  const bullets = document.querySelectorAll(".bullet");
  bullets.forEach((bullet) => {
    bullet.remove();
  });

  const fireballs = document.querySelectorAll(".fireball");
  fireballs.forEach((fireball) => {
    fireball.remove();
  });
}

const restartButton = document.getElementById("restartbutton");
restartButton.onclick = restartgame;

function restartgame() {
  console.log("reset game executed");
}
