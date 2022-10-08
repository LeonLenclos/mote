class TagError extends Error {
  constructor(tag, role, acceptedTags, localization) {
    let tagList = acceptedTags.map(t=>`<${t}>`)
    super(`<${tag}> is not a valid ${role} tag name. ${role} tag name must be: ${tagList.join(' or ')}`);
    this.name = "DocumentNodeTagError";
  }
}

class SceneTagError extends TagError {
  constructor(tag, localization) {
    super(tag, 'scene', ['level', 'screen'], localization);
    this.name = "DocumentNodeTagError";
  }
}

class DocumentNodeTagError extends TagError {
  constructor(tag, localization) {
    super(tag, 'document node', ['game'], localization);
    this.name = "DocumentNodeTagError";
  }
}

class EmptyGameError extends Error {
  constructor(localization) {
    super("The game is empty");
    this.name = "EmptyGameError";
  }
}

class RuleValueError extends Error {
  constructor(rule, value, localization) {
    super(`${value} is not a valid value for ${rule}`);
    this.name = "RuleValueError";
  }
}

class RuleNameError extends Error {
  constructor(name, localization) {
    super(`${name} is not a valid rule name`);
    this.name = "RuleNameError";
  }
}

class ParserError extends Error {
  constructor(msg, localization) {
    super(msg);
    this.name = "ParserError";
  }
}
