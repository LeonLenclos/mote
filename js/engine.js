window.addEventListener('load', (event) => {
  game = Game.fromURL('level.xml');
  let game = Game.fromText(GAMEDATA);
  let container = document.getElementById('mote');
  game.init(container);
});
