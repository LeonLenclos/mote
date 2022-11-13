class Scene {
  static ENTERING = 0;
  static PLAYING = 1;
  static EXITING = 2;
  static STOP = 3;
  static TRANSITION_SPEED = 0.1;
  // Create a scene.
  constructor(game, ruleSet, text) {
    this.game = game;
    this.ruleSet = ruleSet;
    
    //remove first and last line if empty
    let lines = text.split("\n");
    if(lines.length>0 && lines[0].length == 0) lines.shift();
    if(lines.length>0 && lines[lines.length-1].length == 0) lines.pop();
    this.text = lines.join("\n");
  }

  toHTML(){
    let container = document.createElement('pre');
    container.id = 'scene';
    let opacity = 1;
    if(this.state == Scene.ENTERING) opacity = this.transition;
    if(this.state == Scene.EXITING) opacity = 1-this.transition;
    container.style.setProperty('opacity', opacity);
    this.appendContent(container);
    return container;
  }

  init(){
    // Transition props
    this.state = Scene.ENTERING;
    this.transition = 0;

    // Style
    const colors = ['bg', 'bg2', 'fg', 'fg2'];
    colors.forEach(c=>{ 
      this.game.container.style.setProperty(`--${c}`, this.game.getRule(`${c}_color`));
    })
  }

  exit(callback){
    this.transition = 0;
    this.state = Scene.EXITING;
    this.onExit = callback;
  }

  next(){
    if(this.game.currentSceneIndex == this.game.scenes.length-1){
      this.state = Scene.STOP;
      return;
    }
    this.exit(()=>{this.game.nextScene()});
  }

  reset(){
    this.exit(()=>{this.game.resetScene()});
  }

  // update input
  input(keys){
    keys.forEach(key => {
      switch (key) {
        case "r":
        this.reset();
        break;
      }
    });
  }

  update(dt){
    if(this.state == Scene.STOP){
      return false;
    }
    if(this.state != Scene.PLAYING && this.transition < 1){
      this.transition += Scene.TRANSITION_SPEED;
      return false;
    }

    if(this.state == Scene.ENTERING){
      this.state = Scene.PLAYING
    }

    if(this.state == Scene.EXITING){
      this.onExit();
    }
    return true;
  }
}

class ScreenScene extends Scene {

  appendContent(container){
    let lines = this.text.split("\n");
    lines.forEach(line=>{
      let chars = line.split("");
      chars.forEach(char=>{
        let node = document.createElement('span');
        node.innerHTML = char;
        container.appendChild(node);  
      });
      container.appendChild(document.createTextNode('\n'));
    })
  }

  // update input
  input(keys){
    super.input(keys)
    if(this.state != Scene.PLAYING) return;
    keys.forEach(key => {
      switch (key) {
        case "ArrowRight": case "d":
        case "ArrowLeft": case "q":
        case "ArrowDown": case "s":
        case " ":
        case "ArrowUp": case "z":
        this.next();
      }
    });
  }
}

class LevelScene extends Scene{
  // Is there something solid at x y coords. ignore ignoreEntity.
  solidAt(x, y, ignoreEntity){
    //TODO: add check for scene borders
    return this.getEntitiesByPos(x,y).find((e)=>e!=ignoreEntity && e.isSolid);
  }

  // Add en entity to the scene.
  addEntity(char, x, y){
    // If no char, replace by defalut char
    const defaultChar = this.game.getRule('default_char')[0];
    const airChar = this.game.getRule('air')[0] || defaultChar;
    char = char || defaultChar;

    // Add entity to entities
    let entity = Entity.fromChar(this, char, x, y)
    this.entities.push(entity);

    // If entity is player also add a default char behind.
    if (entity.type == 'player' || entity.type == 'goal') {
      if(airChar != char){
        this.addEntity(airChar, x, y);
      }
    }
  }

  removeEntity(entity){
    return this.entities.splice(this.entities.indexOf(entity), 1);
  }

  getEntitiesByPos(x, y) {return this.entities.filter((e)=> e.x == x && e.y == y)}

  getEntitiesByType(type) {return this.entities.filter((e)=> e.type == type)}

  appendContent(container){
    
    // Create content grid
    let contentGrid = Array(this.size.x).fill().map(x => Array(this.size.y).fill())
    const addEntityTocontentGrid = e => contentGrid[e.x][e.y] = e;
    this.entities.forEach(addEntityTocontentGrid);
    this.getEntitiesByType('goal').forEach(addEntityTocontentGrid);
    this.getEntitiesByType('player').forEach(addEntityTocontentGrid);

    // Compute size and camera
    let minSize = V(0,0);
    let maxSize = V(this.game.getRule('max_width'),this.game.getRule('max_height'));
    let displaySize = this.size.constrain(V(), maxSize);

    let player = this.getEntitiesByType('player')[0];
    if(player){
      this.camera = player.pos.floor().subtract(displaySize.divide(2).floor())
      this.camera = this.camera.constrain(V(0,0), this.size.subtract(displaySize));
    }

    // append grid to container
    let from = this.camera;
    let to = this.camera.add(displaySize);
    for (let y = from.y; y < to.y; y++) {
      for (let x = from.x; x < to.x; x++) {
        if(contentGrid[x] && contentGrid[x][y] instanceof Entity){
          container.appendChild(contentGrid[x][y].toHTML());
        }
      }
      container.appendChild(document.createTextNode('\n'));
    }
  }

  init(){
    super.init()

    // The world (each lines in an array of strings)
    let lines = this.text.split("\n");

    // Size
    this.size = V()
    this.size.x = lines.reduce((p, c)=>{return Math.max(p, c.length)}, 0);
    this.size.y = lines.length;
    this.camera = V();

    // Create entities
    this.entities = [];
    for (var y = 0; y < this.size.y; y++) {
      for (var x = 0; x < this.size.x; x++) {
        this.addEntity(lines[y][x], x, y);
      }
    }

    // Victory and defeat condition
    this.min_goals = 0;
    this.min_players = 0;
    if(this.game.getRule('win_on_first_goal')){
      this.min_goals = this.getEntitiesByType('goal').length -1;
    }
    if(this.game.getRule('lose_on_first_death')){
      this.min_players = this.getEntitiesByType('player').length -1;
    }
    

  }

    // update input
    input(keys){
      super.input(keys)
    if(this.state != Scene.PLAYING) return;
    let players = this.getEntitiesByType('player');
      keys.forEach(key => {
        switch (key) {
          case "ArrowRight": case "d":
          players.forEach(p => p.moveRight());
          break;
          case "ArrowLeft": case "q":
          players.forEach(p => p.moveLeft());
          break;
          case "ArrowDown": case "s":
          if (this.game.getRule('controls')=="adventure") {
            players.forEach(p => p.moveDown());
          }
          break;
          case " ":
          if (this.game.getRule('controls')=="adventure") {
            break;
          }
          case "ArrowUp": case "z":
          if (this.game.getRule('controls')=="platformer") {
            players.forEach(p => p.jump());
          }
          if (this.game.getRule('controls')=="adventure") {
            players.forEach(p => p.moveUp());
          }
        }
      });
    }
  

  update(dt){
    let updating = super.update(dt)
    if(!updating) return;

    this.entities.forEach((entity) => {
      entity.update(dt);
    });

    let players = this.getEntitiesByType('player');
    let goals = this.getEntitiesByType('goal');
    let deadly = this.getEntitiesByType('deadly');

    goals.forEach((entity) => {
      let player = players.find((p)=>p.x == entity.x && p.y == entity.y)
      if(player){
        this.removeEntity(entity);
      }
    });

    deadly.forEach((entity) => {
      let player = players.find((p)=>p.x == entity.x && p.y == entity.y)
      if(player){
        this.removeEntity(player);
      }
    });

    if (goals.length <= this.min_goals){
      this.next();
      return;
    }

    if (players.length <= this.min_players){
      this.reset();
      return;
    }
  }
}
