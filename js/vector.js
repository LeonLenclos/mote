// A simple 2D vector class


//shortcut
const V = (x, y) => new Vector(x,y);

class Vector {
	constructor(x,y){
		this.x = x || 0;
		this.y = y || 0;
	}

	toString() {
		return "(" + this.x + ", " + this.y + ")";
	}

	add(vector) {
		return new Vector(this.x + vector.x, this.y + vector.y);
	}

	subtract(vector) {
		return this.add(vector.negate());
	}

	negate() {
		return new Vector(-this.x, -this.y);
	}

	dot(vector) {
		return this.x * vector.x + this.y * vector.y;
	}

	length() {
		return Math.sqrt(this.dot(this));
	}

	multiply(scalar) {
		return new Vector(this.x * scalar, this.y * scalar);
	}

	divide(scalar) {
		if(scalar == 0)
			return new Vector(0, 0);
		else
			return this.multiply(1 / scalar);
	}

	normalize() {
		return this.divide(this.length());
	}

	angle() {
		return Math.atan2(this.y, this.x);
	}

	rotate(a) {
	  return this.fromAngle(a+this.angle(), this.length());
	};

	fromAngle(angle, length = 1) {
		return new Vector(Math.cos(angle) * length, Math.sin(angle) * length);
	}

	constrainLength(length) {
		return this.normalize().multiply(Math.min(this.length(), length)
		);
	}

	constrain(min, max) {
		return new Vector(
			Math.min(Math.max(this.x, min.x), max.x),
			Math.min(Math.max(this.y, min.y), max.y)
		);
	}

	floor(){
		return new Vector(Math.floor(this.x), Math.floor(this.y));
	}

	ceil(){
		return new Vector(Math.ceil(this.x), Math.ceil(this.y));
	}

	sqdist(vector){
		return (this.x - vector.x)**2 + (this.y - vector.y)**2
	}
}
