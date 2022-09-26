class TagError extends Error {
  constructor(tag, role, acceptedTags) {
    let tagList = acceptedTags.map(t=>`<${t}>`)
    super(`<${tag}> is not a valid ${role} tag name. ${role} tag name must be: ${tagList.join(' or ')}`);
    this.name = "DocumentNodeTagError";
  }
}

class SceneTagError extends TagError {
  constructor(tag) {
    super(tag, 'scene', ['level', 'screen']);
    this.name = "DocumentNodeTagError";
  }
}

class DocumentNodeTagError extends TagError {
  constructor(tag) {
    super(tag, 'document node', ['game']);
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
