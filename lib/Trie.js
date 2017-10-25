import Node from '../lib/Node.js';

export default class Trie {
  constructor() {
    this.root = new Node('');
    this.count = 0;
    this.selections = {};
  }
  insert (word) {
    this.count++;
    word = word.split('');

    let currentChild = this.root.children;
    let currentNode = this.root;
    // let letter = word[i];

    // for (let i = 0; i < word.length; i++) {
    //   if (currentChild.hasOwnProperty(word[i])) {
    //     currentChild = currentChild[word[i]].children;
    //     currentNode = currentNode.children[word[i]]
    //   } else {
    //     currentChild[word[i]] = new Node(word[i])
    //     currentChild = currentChild[word[i]].children;
    //     currentNode = currentNode.children[word[i]]
    //   }
    // }
    word.forEach((letter) => {
      if (!currentChild[letter]) {
        currentChild[letter] = new Node(letter);
      }
      currentChild = currentChild[letter].children;
      currentNode = currentNode.children[letter];
    })
    currentNode.wordEnd = true;
  }

  suggest(phrase) {
    phrase = phrase.split('');

    let currentNode = this.root;
    phrase.forEach(letter => {
      currentNode = currentNode.children[letter];
      if (currentNode === null){
        return null;
      }
    })
    return this.findSuggestions(currentNode, phrase.join(''));
  }

  findSuggestions(currentNode, phrase) {
    let childrenLetters = Object.keys(currentNode.children);
    let suggestions = [];

    childrenLetters.forEach(childLetter => {
      let letterNode = currentNode.children[childLetter];
      let newPhrase = phrase + childLetter;

      if (letterNode.children === {}) {
        suggestions.push(newPhrase);
      } else if (letterNode.wordEnd) {
        suggestions.push(newPhrase);
        suggestions.push(...this.findSuggestions(letterNode, newPhrase));
      } else {
        suggestions.push(...this.findSuggestions(letterNode, newPhrase));
      }
    });
    return suggestions;
  }

  prioritizeSuggestions(suggestions) {
    suggestions.forEach(word => {
      if (!this.selections[word]) {
        this.selections[word] = 0;
      }
      for (let j = 0; j < suggestions.length; j++) {
        for (let i = 0; i < suggestions.length - 1; i++) {
          if (this.selections[suggestions[i]] < this.selections[suggestions[i + 1]]) {
            let temp = suggestions[i];
            suggestions[i] = suggestions[i + 1];
            suggestions[i + 1] = temp;
          }
        }
      }
      return suggestions;
    })
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    });
  }

  count() {

  }

  select(word) {
    if (this.selections[word]) {
      this.selections[word]++;
    } else {
      this.selections[word] = 1;
    }
  }
}


// if the letter is already in the Trie
// else do the insert() function
