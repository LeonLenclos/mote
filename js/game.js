class Game {

  static INTERVAL_TIME = 1000/25
  // Create an empty Game.
  constructor(ruleSet, localization) {
    this.ruleSet = ruleSet;
    this.localization = localization;
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

    // Get the game element
    const gameElement = xmlDoc.documentElement
    let gameElementLocalization = moteSchema.elements.game.localization
    
    // Deduce the location from the game element
    let localization = Object.keys(gameElementLocalization).find(k=>gameElementLocalization[k]==gameElement.tagName);
    
    if (!localization) throw new DocumentNodeTagError(gameElement.tagName, localization);

    // Create the game
    let ruleSet = Game.ruleSetFromElement(gameElement, localization);
    let game = new Game(ruleSet, localization);
    if (gameElement.children.length == 0){
      game.addLevel({}, gameElement.textContent)
    }
    for (let scene of gameElement.children) {
      let sceneType = Object.keys(moteSchema.elements).find(k=>moteSchema.elements[k].localization[localization]==scene.tagName);
      if(sceneType == 'level'){
        let ruleSet = Game.ruleSetFromElement(scene, localization);
        game.addLevel(ruleSet, scene.textContent)
      }
      else if(sceneType == 'screen'){
        let ruleSet = Game.ruleSetFromElement(scene, localization);
        game.addScreen(ruleSet, scene.textContent)
      }
      else{
        throw new SceneTagError(scene.tagName, localization);
      }
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
  static ruleSetFromElement(element, localization){
    const createRule = ({name, value}) => {
      for (const rule in moteSchema.rules) {
        if(moteSchema.rules[rule].localization[localization] != name) continue;
        if(!moteSchema.rules[rule].validation.test(value)){
          throw new RuleValueError(rule, value, localization);
        }
        let processedValue = moteSchema.rules[rule].validation.process(value);
        if(name=='player')console.log(rule, value, processedValue)
        return {[rule]: processedValue}
      }
      throw new RuleNameError(name, localization);
    }
    let attributesArray = Array.from(element.attributes, createRule)
    return Object.assign({}, ...attributesArray)
  }

  // Add a scene to the game.
  addScene(scene) {
    this.scenes.push(scene)
  }

  // Add a screen to the game.
  addScreen(ruleSet, text) {
    this.addScene(new ScreenScene(this, ruleSet, text))
  }

  // Add a level to the game.
  addLevel(ruleSet, text) {
    this.addScene(new LevelScene(this, ruleSet, text))
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
    return moteSchema.rules[name].validation.process(moteSchema.rules[name].default)
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
    this.interval = setInterval(()=>{this.update()}, Game.INTERVAL_TIME)

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
    let dt = (Game.INTERVAL_TIME)/1000

    let scene = this.getScene()
    
    // Update scene
    scene.input(this.keys);
    scene.update(dt)

    // Update html
    let html = this.toHTML();
    if (!this.container.firstChild.isEqualNode(html)) {
      this.container.firstChild.replaceWith(html);
    }
  }
}
