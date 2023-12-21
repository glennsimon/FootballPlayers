import { getPlayerHtml } from './playerHtml.js';
import { stand, walk, run, flyby } from './playerAnimations.js';

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
  field.style.transformOrigin = `${lookAt[0]}px ${lookAt[1]}px`;
  field.style.transform = `perspective(${sightlineDistance}px) \
    rotateZ(${theta}rad) rotate3d(${Math.cos(theta)}, \
    ${-Math.sin(theta)}, 0, ${psi}rad)`;
  fieldObjective.style.left = `${lookAt[0] - 10}px`;
  fieldObjective.style.top = `${lookAt[1] - 10}px`;
}

flyby([playerVector[1], playerVector[0] - 100, 100]);

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

function buildPlayer(team, position, name, number, scale, colors) {
  const player = document.createElement('div');
  player.className = `${team} ${position}`;
  player.setAttribute(
    'style',
    `transform: scale3d(${scale}, ${scale}, ${scale})`
  );
  player.innerHTML = getPlayerHtml();
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

// clockwise with 0deg pointing South
function faceDirection(locationVector, degrees) {
  playerLocation.setAttribute(
    'style',
    `left: ${locationVector[0]}px; top: ${locationVector[1]}px; transform: rotateZ(${degrees}deg);`
  );
}

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
changeAngle();

export { calculateAngle, viewportHeight, viewportWidth };
