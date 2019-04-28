class Pendulum {
  constructor(originX, originY, startAngle, armLength) {
    this.origin = createVector(originX, originY);
    this.theta = startAngle;
    this.armLength = armLength;
    this.bobSize = 10;
    this.angleAcc = 0;
    this.angleVel = 0;
    this.showLine = true;
  }
  toCartCoord(theta, arm, origin) {
    return {
      x: arm * sin(theta) + origin.x,
      y: arm * cos(theta) + origin.y
    };
  }
  toggleShowLine() {
    this.showLine = !this.showLine;
  }
  update() {
    this.angleAcc = (-g / this.armLength) * sin(this.theta);
    this.angleVel += this.angleAcc;
    this.theta += this.angleVel;

    this.angleVel *= 0.9999;
  }
  render() {
    noFill();
    stroke(255, 120);
    let bob = this.toCartCoord(this.theta, this.armLength, this.origin);

    if(this.showLine)
      line(this.origin.x, this.origin.y, bob.x, bob.y);
    fill(255, 120);
    circle(bob.x, bob.y, this.bobSize);
  }
}
