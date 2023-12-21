import { calculateAngle, viewportHeight, viewportWidth } from './player.js';

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

document.head.appendChild(animation);

let flybyStyle = document.createElement('style');
flybyStyle.id = 'flyby';

document.head.appendChild(flybyStyle);

function flyby(cameraVector) {
  let angleData = calculateAngle(cameraVector);
  let lookAt = angleData.lookAt;
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

export { stand, walk, run, flyby };
