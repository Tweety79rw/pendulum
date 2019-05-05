class Pendulum {
  constructor(originX, originY, startAngle, armLength, color, tone) {
    this.origin = createVector(originX, originY);
    this.theta = startAngle;
    this.armLength = armLength;
    this.color = color;
    this.tone = tone;
    this.bobSize = 10;
    this.angleAcc = 0;
    this.angleVel = 0;
    this.showLine = true;
  }
  setColor(color) {
    this.color = color;
  }
  toCartCoord(theta, arm, origin) {
    return createVector(arm * sin(theta) + origin.x,
      arm * cos(theta) + origin.y);
  }
  toggleShowLine() {
    this.showLine = !this.showLine;
  }
  update() {
    this.angleAcc = (-g / this.armLength) * sin(this.theta);
    this.angleVel += this.angleAcc;
    this.theta += this.angleVel;

    this.angleVel *= damp;
  }
  render() {
    noFill();
    stroke(255, 140);
    let bob = this.toCartCoord(this.theta, this.armLength, this.origin);

    if(this.showLine)
      line(this.origin.x, this.origin.y, bob.x, bob.y);
    noStroke();
    fill(this.color);
    circle(bob.x, bob.y, this.bobSize);
  }
}
