let pend = [];
const tMax = 24000;
const g = 0.8;
function lengthCalc(k) {
  return function(n) {
    let part = (tMax/(TWO_PI*(k + n + 1)));
    return g * pow(part, 2);
  }
}
function solveK(l) {
  return (tMax/(sqrt(l/g)*TWO_PI)) - 2;
}
function setup() {
  createCanvas(1600,800);
  let lenCalc = lengthCalc(solveK(height - 50));
  for(let i = 300; i > 0; i--) {
    let len = lenCalc(i);
    //console.log(len);
    pend.push(new Pendulum(width/2, 10, PI/3, len));
  }
}
function mouseClicked() {
  for(let p of pend) {
    p.toggleShowLine();
  }
}

function draw() {
  background(0);
  for(let p of pend) {
    p.update();
    p.render();
  }
}
