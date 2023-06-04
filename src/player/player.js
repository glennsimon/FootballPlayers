const fieldWidth = 2040;
const fieldHeight = 920;
const viewportWidth = 1280;
const viewportHeight = 720;
let playerVector = [320, 320, 0];
let lookAt = [];
let cameraVector = [fieldWidth / 2, fieldHeight / 2 + 640, 400];
let sightlineVector = [];
let sightlineDistance;

// angle from horizontal down to lookAt (rad)
let psi;
// camera rotation angle about vertical (rad)
let theta;

function calculateVariables() {
  lookAt = [
    (fieldWidth / 2 + playerVector[0]) / 2,
    (fieldHeight / 2 + playerVector[1]) / 2,
    8,
  ];
  sightlineVector = cameraVector.map((item, index) => {
    return item - lookAt[index];
  });
  sightlineDistance =
    (sightlineVector[0] ** 2 +
      sightlineVector[1] ** 2 +
      sightlineVector[2] ** 2) **
    0.5;
  psi =
    Math.PI / 2 -
    Math.atan(
      sightlineVector[2] /
        (sightlineVector[0] ** 2 + sightlineVector[1] ** 2) ** 0.5
    );
  theta = Math.atan(sightlineVector[0] / sightlineVector[1]);
}

const field = document.querySelector('.field');
const fieldObjective = document.querySelector('.field-objective');

function changeAngle() {
  field.style.left = `${viewportWidth / 2 - lookAt[0]}px`;
  field.style.top = `${viewportHeight / 2 - lookAt[1]}px`;
  field.style.transformOrigin = `${lookAt[0]}px ${lookAt[1]}px;`;
  field.style.transform = `perspective(${sightlineDistance}px) \
    rotateZ(${theta}rad) rotate3d(${Math.cos(theta)}, \
    ${-Math.sin(theta)}, 0, ${psi}rad)`;
  fieldObjective.style.left = `${lookAt[0] - 10}px`;
  fieldObjective.style.top = `${lookAt[1] - 10}px`;
}

let flybyStyle = document.createElement('style');
flybyStyle.id = 'flyby';

document.head.appendChild(flybyStyle);

function flyby(cameraVector) {
  let angleData = calculateAngle(cameraVector);
  let lookAt = angleData.lookAt;
  let sightlineVector = angleData.sightlineVector;
  let sightlineDistance = angleData.sightlineDistance;
  let psi = angleData.psi;
  let theta = angleData.theta;
  flybyStyle.remove();
  flybyStyle = document.createElement('style');
  flybyStyle.id = 'flyby';
  flybyStyle.innerHTML = `.field {
        left: ${viewportWidth / 2 - lookAt[1]}px;
        top: ${viewportHeight / 2 - lookAt[0]}px;
        transform-origin: ${lookAt[1]}px ${lookAt[0]}px;
        animation: 5s forwards flyby;
 }
  @keyframes flyby {
    to {
          transform: perspective(${sightlineDistance}px) rotateZ(${theta}rad) rotate3d(${Math.cos(
    theta
  )}, ${-Math.sin(theta)}, 0, ${psi}rad);
        }
      }
      .field-objective {
        left: ${lookAt[0] - 10}px;
        top: ${lookAt[1] - 10}px;
      }
      `;
  document.head.appendChild(flybyStyle);
}

flyby([playerVector[1], playerVector[0] - 100, 50]);

function calculateAngle(cameraVector) {
  const angleData = {};
  // leaving lookAt here in case I want to change it
  let lookAt = [
    (fieldHeight / 2 + playerVector[1]) / 2,
    (fieldWidth / 2 + playerVector[0]) / 2,
    8,
  ];
  let sightlineVector = cameraVector.map((item, index) => {
    return item - lookAt[index];
  });
  let sightlineDistance =
    (sightlineVector[0] ** 2 +
      sightlineVector[1] ** 2 +
      sightlineVector[2] ** 2) **
    0.5;
  let psi =
    Math.PI / 2 -
    Math.atan(
      sightlineVector[2] /
        (sightlineVector[0] ** 2 + sightlineVector[1] ** 2) ** 0.5
    );
  let theta = Math.atan(-sightlineVector[1] / sightlineVector[0]);
  angleData.lookAt = lookAt;
  angleData.sightlineVector = sightlineVector;
  angleData.sightlineDistance = sightlineDistance;
  angleData.psi = psi;
  angleData.theta = theta;
  return angleData;
}

const volumes = {
  torso: [10, 190, 60, 60, 45, 45],
  thigh: [140, 20, 25, 25, 25, 25],
  calf: [150, 10, 20, 20, 20, 20],
  foot: [0, 20, 20, 20, 60, 20],
  shoulder: [30, 30, 30, 30, 30, 30],
  upper: [110, 10, 20, 20, 20, 20],
  lower: [100, 20, 15, 15, 15, 15],
  head: [5, 65, 35, 35, 40, 40],
  helmet: [0, 100, 50, 50, 50, 50],
};

const offsets = {
  waist: 300,
  knee: -140,
  foot: -160,
  pads: 160,
  elbow: -120,
  neck: 200,
  corner: 30,
};

const playerHtml = `<div class="waist">
<div class="torso">
  <div class="surface__text torso__front">88</div>
  <div class="torso__back">
    <div class="surface__text name">FLINTSTONE</div>
    <div class="surface__text number">88</div>
  </div>
  <div class="torso__right"></div>
  <div class="torso__left"></div>
  <div class="torso__top"></div>
  <div class="torso__bottom"></div>
</div>
<div class="leg__left">
  <div class="thigh">
    <div class="thigh__front"></div>
    <div class="thigh__back"></div>
    <div class="thigh__right"></div>
    <div class="thigh__left"></div>
    <div class="thigh__top"></div>
    <div class="thigh__bottom"></div>
  </div>
  <div class="knee">
    <div class="calf">
      <div class="calf__front"></div>
      <div class="calf__back"></div>
      <div class="calf__right"></div>
      <div class="calf__left"></div>
      <div class="calf__top"></div>
      <div class="calf__bottom"></div>
    </div>
    <div class="foot">
      <div class="foot__front"></div>
      <div class="foot__back"></div>
      <div class="foot__right"></div>
      <div class="foot__left"></div>
      <div class="foot__top"></div>
      <div class="foot__bottom"></div>
    </div>
  </div>
</div>
<div class="leg__right">
  <div class="thigh">
    <div class="thigh__front"></div>
    <div class="thigh__back"></div>
    <div class="thigh__right"></div>
    <div class="thigh__left"></div>
    <div class="thigh__top"></div>
    <div class="thigh__bottom"></div>
  </div>
  <div class="knee">
    <div class="calf">
      <div class="calf__front"></div>
      <div class="calf__back"></div>
      <div class="calf__right"></div>
      <div class="calf__left"></div>
      <div class="calf__top"></div>
      <div class="calf__bottom"></div>
    </div>
    <div class="foot">
      <div class="foot__front"></div>
      <div class="foot__back"></div>
      <div class="foot__right"></div>
      <div class="foot__left"></div>
      <div class="foot__top"></div>
      <div class="foot__bottom"></div>
    </div>
  </div>
</div>
<div class="pads">
  <div class="arm__left">
    <div class="shoulder">
      <div class="shoulder__front"></div>
      <div class="shoulder__back"></div>
      <div class="shoulder__right"></div>
      <div class="shoulder__left"></div>
      <div class="shoulder__top"></div>
      <div class="shoulder__bottom"></div>
    </div>
    <div class="upper">
      <div class="upper__front"></div>
      <div class="upper__back"></div>
      <div class="upper__right"></div>
      <div class="upper__left"></div>
      <div class="upper__top"></div>
      <div class="upper__bottom"></div>
    </div>
    <div class="elbow">
      <div class="lower">
        <div class="lower__front"></div>
        <div class="lower__back"></div>
        <div class="lower__right"></div>
        <div class="lower__left"></div>
        <div class="lower__top"></div>
        <div class="lower__bottom"></div>
      </div>
    </div>
  </div>
  <div class="arm__right">
    <div class="shoulder">
      <div class="shoulder__front"></div>
      <div class="shoulder__back"></div>
      <div class="shoulder__right"></div>
      <div class="shoulder__left"></div>
      <div class="shoulder__top"></div>
      <div class="shoulder__bottom"></div>
    </div>
    <div class="upper">
      <div class="upper__front"></div>
      <div class="upper__back"></div>
      <div class="upper__right"></div>
      <div class="upper__left"></div>
      <div class="upper__top"></div>
      <div class="upper__bottom"></div>
    </div>
    <div class="elbow">
      <div class="lower">
        <div class="lower__front"></div>
        <div class="lower__back"></div>
        <div class="lower__right"></div>
        <div class="lower__left"></div>
        <div class="lower__top"></div>
        <div class="lower__bottom"></div>
      </div>
    </div>
  </div>
</div>
<div class="neck">
  <div class="head">
    <div class="head__front">
      <div class="eyes">@&nbsp;&nbsp;&nbsp;@</div>
      <div class="mouth">|+|+|+|</div>
    </div>
    <div class="head__right"></div>
    <div class="head__left"></div>
    <div class="head__bottom"></div>
  </div>
  <div class="helmet">
    <div class="shield__top"></div>
    <div class="shield__back"></div>
    <div class="helmet__trim helmet__back"></div>
    <div class="surface__text helmet__trim helmet__right">S</div>
    <div class="surface__text helmet__trim helmet__left">S</div>
    <div class="helmet__trim helmet__top"></div>
  </div>
</div>
</div>`;

function buildPlayer(team, position, name, number, scale, colors) {
  const player = document.createElement('div');
  player.className = `${team} ${position}`;
  player.setAttribute(
    'style',
    `transform: scale3d(${scale}, ${scale}, ${scale})`
  );
  player.innerHTML = playerHtml;
  player.querySelector('.torso__front').innerText = number;
  player.querySelector('.torso__back .name').innerText = name;
  player.querySelector('.torso__back .number').innerText = number;
  player.querySelector('.helmet__right').innerText = team;
  player.querySelector('.helmet__left').innerText = team;

  const parts = Object.keys(volumes);
  const faces = ['bottom', 'top', 'left', 'right', 'front', 'back'];
  for (const part of parts) {
    for (const face of faces) {
      const partFaces = player.querySelectorAll(`.${part}__${face}`);
      for (const partFace of partFaces) {
        let index = faces.indexOf(face);
        if (index < 2) {
          partFace.style.left = `${-volumes[part][2]}px`;
          partFace.style.top = `${-volumes[part][5]}px`;
          partFace.style.width = `${volumes[part][2] + volumes[part][3]}px`;
          partFace.style.height = `${volumes[part][4] + volumes[part][5]}px`;
          partFace.style.transform = `rotateY(${index === 1 ? 0 : 180}deg) \
          translateZ(${volumes[part][index]}px)`;
        } else if (index < 4) {
          partFace.style.left = `${
            (volumes[part][3] -
              volumes[part][2] -
              volumes[part][4] -
              volumes[part][5]) /
            2
          }px`;
          partFace.style.top = `${
            (volumes[part][4] -
              volumes[part][5] -
              volumes[part][1] -
              volumes[part][0]) /
            2
          }px`;
          partFace.style.width = `${volumes[part][4] + volumes[part][5]}px`;
          partFace.style.height = `${volumes[part][0] + volumes[part][1]}px`;
          partFace.style.transform = `translateZ(${
            (volumes[part][1] - volumes[part][0]) / 2
          }px) \
        rotateX(-90deg) rotateY(${index === 3 ? -90 : 90}deg) \
        translateZ(${(volumes[part][2] + volumes[part][3]) / 2}px)`;
        } else {
          partFace.style.left = `${-volumes[part][2]}px`;
          partFace.style.top = `${
            (volumes[part][4] -
              volumes[part][5] -
              volumes[part][1] -
              volumes[part][0]) /
            2
          }px`;
          partFace.style.width = `${volumes[part][2] + volumes[part][3]}px`;
          partFace.style.height = `${volumes[part][0] + volumes[part][1]}px`;
          partFace.style.transform = `translateZ(${
            (volumes[part][1] - volumes[part][0]) / 2
          }px) \
        rotateX(-90deg) rotateY(${index === 4 ? 0 : 180}deg) \
        translateZ(${(volumes[part][4] + volumes[part][5]) / 2}px)`;
        }
      }
    }
  }

  return player;
}

const animation = document.createElement('style');

function stand() {
  animation.innerHTML = '';
}

function walk() {
  animation.innerHTML = `
.arm__right {
  animation: 1s 0.5s infinite linear swing45;
}
.arm__left {
  animation: 1s infinite linear swing45;
}
.leg__right {
  animation: 1s infinite linear swing45;
}
.leg__left {
  animation: 1s 0.5s infinite linear swing45;
}
.knee {
  animation: 0.5s infinite linear kneeSwingWalk;
}
.elbow {
  animation: 0.5s forwards elbows30;
}
`;
}

function run() {
  animation.innerHTML = `
.arm__right {
  animation: 0.5s 0.25s infinite linear swing45_60;
}
.arm__left {
  animation: 0.5s infinite linear swing45_60;
}
.leg__right {
  animation: 0.5s infinite linear swing45_60;
}
.leg__left {
  animation: 0.5s 0.25s infinite linear swing45_60;
}
.knee {
  animation: 0.25s infinite linear kneeSwingRun;
}
.elbow {
  animation: 0.5s forwards elbows90;
}
`;
}

// clockwise with 0deg pointing South
function faceDirection(locationVector, degrees) {
  playerLocation.setAttribute(
    'style',
    `left: ${locationVector[0]}px; top: ${locationVector[1]}px; transform: rotateZ(${degrees}deg);`
  );
}

document.head.appendChild(animation);

const playerLocation = document.querySelector('.player-location');
playerLocation.appendChild(buildPlayer('S', 'QB', 'SIMON', 7, 0.1));
faceDirection([320, 320, 0], 270);

const movementKeys = {
  ArrowDown: 0,
  ArrowUp: Math.PI,
  ArrowLeft: Math.PI / 2,
  ArrowRight: (3 * Math.PI) / 2,
  Down: 0,
  Up: Math.PI,
  Left: Math.PI / 2,
  Right: (3 * Math.PI) / 2,
};

const downKeys = {};
let timestamp;
let previousTimestamp;
let moving = false;
let rate = 0.15;

function step(timestamp) {
  const deltaT = timestamp - previousTimestamp;
  previousTimestamp = timestamp;

  const keys = Object.keys(downKeys);
  console.log(`keys: ${keys}`);
  if (keys.length === 0) {
    moving = false;
    stand();
    return;
  }
  let angle = 0;
  if (keys.includes('Down') && keys.includes('Right'))
    downKeys['Down'] = 2 * Math.PI;
  if (keys.includes('ArrowDown') && keys.includes('ArrowRight'))
    downKeys['ArrowDown'] = 2 * Math.PI;
  for (const key of keys) {
    angle += downKeys[key];
  }
  angle = angle / keys.length;

  console.log(`angle: ${angle}`);
  playerVector = [
    playerVector[0] - rate * deltaT * Math.sin(angle),
    playerVector[1] + rate * deltaT * Math.cos(angle),
    0,
  ];
  calculateVariables();
  changeAngle();
  faceDirection(playerVector, (360 * angle) / (2 * Math.PI));

  window.requestAnimationFrame(step);
}

window.addEventListener('keydown', (e) => {
  if (!Object.keys(movementKeys).includes(e.key)) return;
  downKeys[e.key] = movementKeys[e.key];
  if (!moving) {
    moving = true;
    previousTimestamp = performance.now();
    run();
    window.requestAnimationFrame(step);
  }
});

window.addEventListener('keyup', (e) => {
  delete downKeys[e.key];
});

calculateVariables();
