export default class Node {
  constructor(letter) {
    this.letter = letter;
    this.children = {};
    this.wordEnd = false;
  }

}
