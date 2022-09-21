class DocumentNodeTagError extends Error {
  constructor() {
    super("The document node tag must be 'game'");
    this.name = "DocumentNodeTagError";
  }
}
class EmptyGameError extends Error {
  constructor() {
    super("The game is empty");
    this.name = "EmptyGameError";
  }
}
class ParserError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "ParserError";
  }
}
