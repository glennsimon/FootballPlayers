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

const style = document.createElement('style');
style.innerHTML = `
.surface__text {
  display: flex;
  justify-content: center;
  align-items: center;
  backface-visibility: inherit;
  font-size: 40px;
  color: white;
}
.torso div {
  font-size: 100px;
  background: red;
}
.torso__back {
  display: flex;
  flex-direction: column;
}
.torso__back .name {
  font-size: 20px;
  position: static;
  margin: auto;
}
.torso__back .number {
  position: static;
  margin: auto;
}
.shoulder div {
  background: red;
}
.head div {
  background: Sienna;
}
.helmet div {
  color: red;
  background: white;
}
.shield__top {
  left: ${-volumes.helmet[3]}px;
  top: ${-volumes.helmet[5]}px;
  width: ${volumes.helmet[1]}px;
  height: ${volumes.helmet[1]}px;
  transform: translateZ(${volumes.helmet[1] - offsets.corner}px)
}
.shield__back {
  transform: translateY(${volumes.helmet[5] - offsets.corner}px)
}
.thigh div {
  background: white;
}
.calf div {
  background: white;
}
.foot div {
  background: black;
}
.upper div {
  background: Sienna;
}
.lower div {
  background: Sienna;
}
.head__front {
  display: flex;
  flex-direction: column;
}
.eyes {
  position: static;
  margin: auto;
  color: black;
  font-size: 24px;
  font-weight: bold;
}
.mouth {
  position: static;
  margin: auto;
  color: white;
  font-weight: bold;
}
.helmet__trim {
  clip-path: polygon(${offsets.corner}px 0px, ${
  volumes.helmet[1] - offsets.corner
}px 0px, ${volumes.helmet[1]}px ${offsets.corner}px,
  ${volumes.helmet[1]}px ${volumes.helmet[1] - offsets.corner}px,
  ${volumes.helmet[1] - offsets.corner}px ${volumes.helmet[1]}px,
  ${offsets.corner}px ${volumes.helmet[1]}px,
  0px ${volumes.helmet[1] - offsets.corner}px, 0px ${offsets.corner}px, ${
  offsets.corner
}px 0px);
}
.waist {
  transform: translateZ(${offsets.waist}px);
}
.leg__left {
  left: 30px;
}
.leg__right {
  left: -30px;
}
.knee {
  transform: translateZ(${offsets.knee}px);
}
.foot {
  transform: translateZ(${offsets.foot}px);
}
.pads {
  transform: translateZ(${offsets.pads}px);
}
.arm__left {
  left: 80px;
}
.arm__right {
  left: -80px;
}
.elbow {
  transform: translateZ(${offsets.elbow}px);
}
.neck {
  transform: translateZ(${offsets.neck}px);
}
@keyframes fieldMotion {
  to {transform: translateY(-600px);}
}
@keyframes rotate15 {
  from {transform: rotateX(45deg)}
  to {transform: rotateX(45deg) rotateZ(360deg)}
}
@keyframes swing45 {
  33% {
    transform: rotateX(45deg);
  }
  66% {
    transform: rotateX(-45deg);
  }
}
@keyframes swing45_60 {
  33% {
    transform: rotateX(45deg);
  }
  66% {
    transform: rotateX(-60deg);
  }
}
@keyframes kneeSwingWalk {
  66% {
    transform: translateZ(${offsets.knee}px) rotateX(-30deg);
  }
}
@keyframes kneeSwingRun {
  66% {
    transform: translateZ(${offsets.knee}px) rotateX(-90deg);
  }
}
@keyframes elbows30 {
  to {
    transform: translateZ(${offsets.elbow}px) rotateX(30deg);
  }
}
@keyframes elbows90 {
  to {
    transform: translateZ(${offsets.elbow}px) rotateX(90deg);
    animation-timing-function: ease-in;
  }
}
`;

document.head.appendChild(style);

function buildPlayer(team, position, name, number, scale, colors) {
  const player = document.createElement('div');
  player.className = `${team} ${position}`;
  player.setAttribute('style', `transform: scale3d(${scale}, ${scale}, ${scale})`)
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
      let index = faces.indexOf(face);
      if (index < 2) {
        style.innerHTML += `.${part}__${face} {
              left: ${-volumes[part][2]}px;
              top: ${-volumes[part][5]}px;
              width: ${volumes[part][2] + volumes[part][3]}px;
              height: ${volumes[part][4] + volumes[part][5]}px;
              transform: rotateY(${index === 1 ? 0 : 180}deg) translateZ(${
          volumes[part][index]
        }px);
            }
`;
      } else if (index < 4) {
        style.innerHTML += `.${part}__${face} {
left: ${
          (volumes[part][3] -
            volumes[part][2] -
            volumes[part][4] -
            volumes[part][5]) /
          2
        }px;
top: ${
          (volumes[part][4] -
            volumes[part][5] -
            volumes[part][1] -
            volumes[part][0]) /
          2
        }px;
width: ${volumes[part][4] + volumes[part][5]}px;
height: ${volumes[part][0] + volumes[part][1]}px;
transform: translateZ(${
          (volumes[part][1] - volumes[part][0]) / 2
        }px) rotateX(-90deg) rotateY(${index === 3 ? -90 : 90}deg) translateZ(${
          (volumes[part][2] + volumes[part][3]) / 2
        }px);
}
`;
      } else {
        style.innerHTML += `.${part}__${face} {
  left: ${-volumes[part][2]}px;
  top: ${
    (volumes[part][4] -
      volumes[part][5] -
      volumes[part][1] -
      volumes[part][0]) /
    2
  }px;
  width: ${volumes[part][2] + volumes[part][3]}px;
  height: ${volumes[part][0] + volumes[part][1]}px;
  transform: translateZ(
  ${(volumes[part][1] - volumes[part][0]) / 2}px) 
  rotateX(-90deg) rotateY(
    ${index === 4 ? 0 : 180}deg) 
    translateZ(${(volumes[part][4] + volumes[part][5]) / 2}px);
}
`;
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
  const playerLocation = document.querySelector('.player-location');
  playerLocation.setAttribute('style', `left: ${locationVector[0]}px; top: ${locationVector[1]}px; transform: rotateZ(${degrees}deg);`);
}

document.head.appendChild(animation);

export { buildPlayer, run, walk, stand, faceDirection };
