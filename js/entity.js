
class Entity {
  constructor(scene, char, type, x, y){
    this.scene = scene;
    this.char = char;
    this.type = type;
    this.pos = V(x, y)
  }

  static fromChar(scene, char, x, y){
    // Find entity type for the char
    const entityTypes = ['player', 'air', 'killer', 'solid', 'goal'];
    let entityType = scene.game.getRule('default_type');
    for (let type of entityTypes) {
      if (scene.game.getRule(type).includes(char)) {
        entityType = type;
        break;
      }
    }

    if (entityType == 'player') {
      return new Player(scene, char, entityType, x, y)
    }
    return new Entity(scene, char, entityType, x, y)
  }

  get x() {return this.pos.x;}

  get y() {return this.pos.y;}

  get isSolid() {return this.type == 'solid' || this.type == 'player';}

  toHTML(){
    let node = document.createElement('span');
    node.innerHTML = this.char;
    // let node = document.createTextNode(this.char);
    return node;
  }

  update(dt){
  }
}


class Player extends Entity {
  constructor(scene, char, type, x, y){
    super(scene, char, type, x, y)
    //state
    this.vel = V(0,0);
    this.acc = V(0,0);
    this.landed = false;
    this.jumping = false;
    this.canJump = false;
    // timer
    this.jumpTimer = 0;
    this.coyoteTimer = 0;
    this.jumpBufferTimer = 0;
    // rules
    let r = (s) => {return parseFloat(scene.game.getRule(s))};
    this.jumpForce = V(0,-r('jump_force'));
    this.moveForce = V(r('move_force'), 0);
    this.gravity = V(0, r('gravity'));
    this.maximumVelocity = r('maximum_velocity');
    this.gliding = r('gliding');
    this.braking = r('braking');
    this.airGliding = r('air_gliding');
    this.coyoteTime = r('coyote_time');
    this.jumpTime = r('jump_time');
    this.jumpBufferTime = r('jump_buffer_time');
  }

  get x() {return this.pos.floor().x;}

  get y() {return this.pos.floor().y;}


  toHTML(){
    let node = document.createElement('span');
    node.classList.add('player');
    node.innerHTML = this.char;
    return node;
  }
  jump() {
    if(this.canJump){
      this.jumping = true;
      this.applyForce(this.jumpForce);
    }
  }

  moveRight() {
    this.applyForce(this.moveForce);
  }

  moveDown() {
    this.applyForce(this.moveForce.rotate(Math.PI/2));
  }

  moveLeft() {
    this.applyForce(this.moveForce.rotate(Math.PI));
  }

  moveUp() {
    this.applyForce(this.moveForce.rotate(Math.PI*3/2));
  }

  applyForce(force) {
    this.acc = this.acc.add(force);
  }

  update(dt){
    // brake
    if(this.acc.x == 0){
      // this.applyForce(this.vel.negate().multiply(this.braking))
      this.applyForce(V(-this.vel.x * this.braking, 0))

    }


    // Gravity
    this.applyForce(this.gravity);

    // Jump buffering
    if(this.jumping){
      this.jumpBufferTimer += dt;
    } else {
      this.jumpBufferTimer = 0;
    }

    // Duration of the jump
    if(this.jumping){
      this.jumpTimer += dt;
    } else if(this.landed){
      this.jumpTimer = 0;
    }

    if (this.landed && this.jumpBufferTimer < this.jumpBufferTime) {
      this.jumpTimer = 0;
    }

    //coyote
    this.coyoteTimer += dt;
    if (this.landed) {
      this.coyoteTimer = 0
    }

    // can jump if not jumping for too long or landed or coyote
    this.canJump = (!this.jumping && this.landed)
    || (this.jumping && this.jumpTimer < this.jumpTime)
    || (!this.jumping && this.coyoteTimer < this.coyoteTime)
    || (this.jumping && this.landed && this.jumpBufferTimer < this.jumpBufferTime);

    // console.log(this.landed, this.canJump, this.jumpTimer, this.jumpTime)

    // update vel
    this.vel = this.vel.add(this.acc);
    // constrain
    // this.vel = this.vel.constrain(V(-this.maximumVelocity, -this.maximumVelocity),V(this.maximumVelocity, this.maximumVelocity));

    // collision
    this.landed = (this.scene.solidAt(this.x, this.y+1, this) || this.y == this.scene.size.y-1)
    && this.vel.y >= 0;

    this.underWall = this.scene.solidAt(this.x, this.y-1, this) && this.vel.y < 0;
    this.againstWall = (this.scene.solidAt(this.x-1, this.y, this) && this.vel.x < 0)
    || (this.scene.solidAt(this.x+1, this.y, this) && this.vel.x > 0);
    if (this.landed || this.underWall){
      this.vel.y = 0;
    }
    if (this.againstWall){
      this.vel.x = 0;
    }

    // move
    let constrainedVel = this.vel.constrain(V(-1, -1),V(1, 1));
    let pos = this.pos.add(constrainedVel);

    // Clip
    while(this.scene.solidAt(pos.x, pos.y, this)) {
      pos = pos.subtract(constrainedVel);
    }

    this.pos = pos

    //constrain in scene
    this.pos = this.pos.constrain(V(0,0), this.scene.size.subtract(V(1,1)));

    // reset
    this.acc = V(0,0);
    this.jumping = false;
  }
}
