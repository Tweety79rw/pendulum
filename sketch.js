let pend = [];
function setup() {
  createCanvas(1600,800);
  for(let i = 0; i < 200; i++) {
    pend.push(new Pendulum(width/2, 10, PI/3, 100 + i * 5));
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
