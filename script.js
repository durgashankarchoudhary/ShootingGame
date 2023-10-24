const startButton = document.getElementById("startbutton");
startButton.onclick = startgame;

function startgame() {
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
    createFireball();
    console.log(j);
    if (j >= 200) {
      j -= 10;
    }
    setTimeout(startFireballGeneration, j);
  }

  startFireballGeneration();
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

const stopButton = document.getElementById("stopbutton");
stopButton.onclick = stopgame;

function stopgame() {
  console.log("game over");
}

const restartButton = document.getElementById("restartbutton");
restartButton.onclick = restartgame;

function restartgame() {
  console.log("reset game");
}
