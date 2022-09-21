class Scene {
  // Create a scene.
  constructor(game, ruleSet, text) {
    this.game = game;
    this.ruleSet = ruleSet;
    this.text = text;
  }

  // Is there something solid at x y coords. ignore ignoreEntity.
  solidAt(x, y, ignoreEntity){
    //TODO: add check for scene borders
    return this.getEntitiesByPos(x,y).find((e)=>e!=ignoreEntity && e.isSolid);
  }

  // Add en entity to the scene.
  addEntity(char, x, y){
    // If no char, replace by defalut char
    const defaultChar = this.game.getRule('default_char')[0];
    char = char || defaultChar;

    // Add entity to entities
    let entity = Entity.fromChar(this, char, x, y)
    this.entities.push(entity);

    // If entity is player also add a default char behind.
    if (entity.type == 'player' || entity.type == 'goal') {
      this.addEntity(defaultChar, x, y);
    }
  }

  removeEntity(entity){
    return this.entities.splice(this.entities.indexOf(entity), 1);
  }

  getEntitiesByPos(x, y) {return this.entities.filter((e)=> e.x == x && e.y == y)}

  getEntitiesByType(type) {return this.entities.filter((e)=> e.type == type)}

  toHTML(){
    let scene = document.createElement('pre');
    scene.id = 'scene';

    let ordonnedEntityList = Array(this.size.x).fill().map(x => Array(this.size.y).fill())
    this.entities.forEach((e) => {
      ordonnedEntityList[e.x][e.y] = e
    });
    this.getEntitiesByType('goal').forEach((e) => {
      ordonnedEntityList[e.x][e.y] = e
    });

    this.getEntitiesByType('player').forEach((e) => {
      ordonnedEntityList[e.x][e.y] = e
    });
    let from = this.game.camera.subtract(this.game.size.divide(2));
    let to = this.game.camera.add(this.game.size.divide(2));
    for (let y = from.y; y < to.y; y++) {
      // let line = document.createElement('div');
      // line.classList.add('line');
      for (let x = from.x; x < to.x; x++) {
        scene.appendChild(ordonnedEntityList[x][y].toHTML());
        // line.appendChild(ordonnedEntityList[x][y].toHTML());
      }
      scene.appendChild(document.createTextNode('\n'));
    }
    return scene;
  }

  init(){
    // The world (each lines in an array of strings)
    let lines = this.text.split("\n");
    //remove first and last line if empty
    if(lines[0].length == 0){
      lines.shift();
    }
    if(lines.length>0 && lines[lines.length-1].length == 0){
      lines.pop();
    }
    this.size = V()
    this.size.x = lines.reduce((p, c)=>{return Math.max(p, c.length)}, 0);
    this.size.y = lines.length;
    this.entities = [];
    for (var y = 0; y < this.size.y; y++) {
      for (var x = 0; x < this.size.x; x++) {
        this.addEntity(lines[y][x], x, y);
      }
    }
  }

  update(dt){
    this.entities.forEach((entity) => {
      entity.update(dt);
    });

    let players = this.getEntitiesByType('player');

    let goals = this.getEntitiesByType('goal');
    goals.forEach((entity) => {
      let player = players.find((p)=>p.x == entity.x && p.y == entity.y)
      if(player){
        this.removeEntity(entity);
      }
    });

    let killers = this.getEntitiesByType('killer');
    killers.forEach((entity) => {
      let player = players.find((p)=>p.x == entity.x && p.y == entity.y)
      if(player){
        this.removeEntity(player);
      }
    });

    if (!goals.length){
      this.game.nextScene();
      return;
    }

    if (!players.length){
      this.game.resetScene();
      return;
    }




  }
}
