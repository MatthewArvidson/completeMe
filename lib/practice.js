insert (word) {
  let currentNode = this.root;

  word = word.split('');

  word.forEach( (letter) => {
    if !(currentNode.children[letter]) {
      currentNode = currentNode
    }
  })
}