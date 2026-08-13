class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));


  }
  
  plus(this, otherVector) {
    return new Vector(this.x + otherVector.x, this.y + otherVector + y);
  }

  minus(this, otherVector) {
    return new Vector(this.x - otherVector.x, this.y - otherVector.y);
  }

}
