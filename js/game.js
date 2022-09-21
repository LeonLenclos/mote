class Game {

  // Create an empty Game.
  constructor(ruleSet) {
    this.ruleSet = ruleSet;
    this.scenes = [];
    this.currentSceneIndex = 0;

    this.size = V(0,0);
    this.camera = V(0,0);

    this.keys = [];
  }

  // Create a Game from an XML DOM Object.
  static fromXML(xmlDoc) {
    const errorNode = xmlDoc.querySelector('parsererror');
    if (errorNode) throw new ParserError(errorNode.textContent);

    const gameElement = xmlDoc.documentElement
    if (gameElement.tagName != 'game') throw new DocumentNodeTagError();
    if (gameElement.children.length == 0) throw new EmptyGameError();

    let game = new Game(Game.ruleSetFromElement(gameElement));
    for (let scene of gameElement.children) {
      game.addScene(Game.ruleSetFromElement(scene), scene.textContent)
    }
    return game;
  }

  // Create a Game from the URL of a XML document.
  static fromURL(url) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send(null);
    const xmlDoc = xhttp.responseXML;
    return Game.fromXML(xmlDoc);
  }

  // Create a Game from a XML string.
  static fromText(text) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "application/xml");
    return Game.fromXML(xmlDoc);
  }

  // Return a ruleset as an object from a Dom element reading its attributes.
  static ruleSetFromElement(element){
    let attributesArray = Array.from(element.attributes, ({name, value}) => ({[name]: value}))
    return Object.assign({}, ...attributesArray)
  }

  // Add a scene to the game.
  addScene(ruleSet, text) {
    this.scenes.push(new Scene(this, ruleSet, text))
  }

  // Return the scene at the given index or the current scene if index is ommited.
  getScene(index){
    if(index===undefined) index = this.currentSceneIndex;
    return this.scenes[index];
  }

  nextScene(){
    this.currentSceneIndex = (this.currentSceneIndex+1)%this.scenes.length;
    this.getScene().init();
  }

  resetScene(){
    this.getScene().init();
  }

  // Get the rule value for the given name.
  getRule(name){
    // Search rule in current scene ruleSet.
    if(this.getScene().ruleSet[name] !== undefined){
      return this.getScene().ruleSet[name];
    }
    // Search rule in game ruleSet.
    if(this.ruleSet[name] !== undefined){
      return this.ruleSet[name];
    }
    // Search rule in default ruleSet.
    if (DEFAULT_RULE_SET[name] !== undefined){
      return DEFAULT_RULE_SET[name]
    }
  }

  // Return the current state of the game as a DOM Element.
  toHTML (){
    // Create the header element.
    let header = document.createElement('header');
    if (this.getRule('title')) {
      let el = document.createElement('div');
      el.innerHTML = this.getRule('title');
      el.id = 'title';
      header.appendChild(el);
    }
    if (this.getRule('author')) {
      let el = document.createElement('div');
      el.innerHTML = this.getRule('author');
      el.id = 'author';
      header.appendChild(el);
    }
    // Create the main element (containing the current scene).
    let main = document.createElement('main');
    main.appendChild(this.getScene().toHTML());

    // Create the game element.
    let game = document.createElement('div');
    game.id = 'game'
    game.appendChild(header);
    game.appendChild(main);
    return game;
  }

  // Store keys on keydown.
  _onKeyDown(e){
    if (!this.keys.includes(e.key)){
      this.keys.push(e.key);
    }
    if(["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", " "].includes(e.key)) {
      e.preventDefault();
    }
  }

  // Remove stored keys on keyup
  _onKeyUp(e){
    if (this.keys.includes(e.key)){
      this.keys.splice(this.keys.indexOf(event.key), 1);
    }
  }

  // Initialize the game.
  init(container){
    // store container element
    this.container = container;
    this.container.innerHTML = '...'

    // Register keyboard events
    this.onKeyDown = this._onKeyDown.bind(this);
    this.onKeyUp = this._onKeyUp.bind(this);
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);

    // Register interval
    this.interval = setInterval(()=>{this.update()}, 1000/25)

    // Load first scene
    this.currentSceneIndex = 0;
    this.getScene().init();
  }

  close(){
    // Remove keyboard events
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);

    // Clear interval
    clearInterval(this.interval)
  }

  // update the game
  update(){
    let dt = (1000/25)/1000

    this.updateInput()
    this.getScene().update(dt);

    // Update size and camera
    let scene = this.getScene()
    let player = scene.getEntitiesByType('player')[0]
    if(player){
      this.size = scene.size.constrain(V(),V(this.getRule('max_width'),this.getRule('max_height')));
      this.camera = player.pos.floor().constrain(this.size.divide(2),scene.size.subtract(this.size.divide(2)));
    }

    // Update html
    let html = this.toHTML();
    if (!this.container.firstChild.isEqualNode(html)) {
      this.container.firstChild.replaceWith(html);
    }
  }

  // update input
  updateInput(){
    let players = this.getScene().getEntitiesByType('player');
    this.keys.forEach(key => {
      switch (key) {
        case "r":
        this.resetScene();
        break;
        case "ArrowRight": case "d":
        players.forEach(p => p.moveRight());
        break;
        case "ArrowLeft": case "q":
        players.forEach(p => p.moveLeft());
        break;
        case "ArrowDown": case "s":
        if (this.getRule('controls')=="adventure") {
          players.forEach(p => p.moveDown());
        }
        break;
        case " ":
        if (this.getRule('controls')=="adventure") {
          break;
        }
        case "ArrowUp": case "z":
        if (this.getRule('controls')=="platformer") {
          players.forEach(p => p.jump());
        }
        if (this.getRule('controls')=="adventure") {
          players.forEach(p => p.moveUp());
        }
      }
    });
  }
}
