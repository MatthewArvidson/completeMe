import Node from '../lib/Node.js';

export default class Trie {
  constructor() {
    this.root = new Node(''); // pass an empty string into the new Node('') it starts here from the root case, and the first letter becomes the roots child
    this.count = 0; // an incrementer for how many times a word is inserted into the Trie
    // suggestions = []; // settting suggestions to an empty array [] because this is how is will start before anything is inserted into it
  }

  insert (word) {
    word = word.split(''); // we take the word and split it into an array of strings of the letters in the word ** Example pass in 'apple' and => ['a', 'p', 'p', 'l', 'e']

    let currentNode = this.root; // we are assigning currentNode to this.root

    word.forEach((letter) => { // we are using forEach() to iterate over each letter of the word that was passed after it was word.split()
      if (!currentNode.children[letter]) { // if the letter does not exist in the chidren object
        currentNode.children[letter] = new Node(letter); // create a new Node using that letter
      }
      currentNode = currentNode.children[letter]; // assigning currentNode to the currentNode's child to keep moving down the Trie
    })

    if (!currentNode.wordEnd) { // if the word is already in the Trie
      this.count++; // increment the word count **this does not happen if it is not a word || it has already been selected**
      currentNode.wordEnd = true; // if the conditions are met, the new word is added to the Trie and the wordEnd is noted/marked to prevent duplicates
    }
  }

  // trie.populate([cat, car, care])
  // suggest('ca');
  suggest(phrase) {
    // suggestions = []; // reassinging the suggestions array to an empty array, scoped to a new phrase that is passed into suggest
    phrase = phrase.toLowerCase().split(''); // Takes the phrase 'ca' and makes it lowercase, and returns ['c', 'a']


    let currentNode = this.root; // assigning currentNode to this.root
    phrase.forEach(letter => { // at this point in the first iteration the letter is 'c'
      currentNode = currentNode.children[letter]; // this point in the first iteration is the 'c' node with a child of 'a'
    })
    // once it gets out of this function we are dealing with the 'ca' node = caNode
    if (!currentNode || !currentNode.children) { // if you suggest a phrase that does not match anything in the array or has no children
      return []; // if the condition is met then return and empty array
    } else { // if that condition is not met then the Node exists * currently caNode *
      return this.findSuggestions(currentNode, phrase.join('')) // on return we are calling findSuggestions() and were passing in currentNode * 'a' from caNode, as well as the phrase that is being joined together into a string of 'ca'
    }
  }

  findSuggestions(currentNode, phrase, suggestions = []) { // currentNode will be the 'a' caNode, phrase will be 'ca', suggestions is initially assigned to an empty array []
    let childrenLetters = Object.keys(currentNode.children); // this gives us all the children of the caNode => ['r', 't']

 // ***** on the second iteration currentNode = carNode and the newPhrase = 'car' *****
    childrenLetters.forEach(childLetter => { // iterates over the currentNodes children / childLetter
      let letterNode = currentNode.children[childLetter]; // after the 3rd iteration this is now the carNode
      let newPhrase = phrase + childLetter; // after the 3rd iteration the newPhrase => 'ca + r' => 'car'

      if (letterNode.wordEnd) { // 'car' is a word so wordEnd is true
        suggestions.push({word: newPhrase, popCount: letterNode.popularity}); // we take the object, which has {word: newPhrase, popCount: letterNode.popularity} where word = phrase, popCount = which starts at 0. This is then pushed into the suggestion arary
      }
        this.findSuggestions(letterNode, newPhrase, suggestions); // this is if the current iteration does not satisfy the wordEnd condition and it gets recursively called back to the top of the findSuggestions() function to move to the next Node level, and suggestions are passed back into findSuggestions recursively
    });
    suggestions.sort((a, b) => { // because sort() tends to be unstable using a, b adds stability
      return b.popCount - a.popCount; // this is the stabilization happening ** Example so that 1 != 10 **
    })
    return suggestions.map(wordObj => { // it is mapping over the suggestion array (which is an array of objects{}) and the objects that contain a key value pair of word: 'whatever word we are on', popCount: 'it's popularity count
      return wordObj.word; // Only returing the word, from the wordObj
    }); // this sends the compiled suggestion array * in this example: ['car', 'care', 'cat'] * by default the array is returned alphabetically based on how it iterates over the dictionary
    // unless a word has weight based on it's popCount then it is populated based on popularity, after the popular words, it continues on alphabetically.
  }

  populate(dictionaryWordArray) { // populates using the built in dictionary given to us by having a Mac
    dictionaryWordArray.forEach(word => {
      this.insert(word); // every word gets inserted into our Trie, using our insert() method
    });
  }

  select(word) { // passing in a selected word
    let currentNode = this.root; // assigning currentNode to this.root
    word = word.split(''); // the word is split * example 'car' ['c', 'a', 'r']
    word.forEach(letter => { // iterates over each letter in the split array ['c', 'a', 'r']
      currentNode = currentNode.children[letter]; // traveling down the array it assigns currentNode to the next node that matches the letter in the array ['c', => 'a', => 'r']
    })
    currentNode.popularity++; // increment the popularity of the that particular letters node
  }
}

// find Node helper function to find a specific Node
// It will point to the node that repreesents where the suggest function needs to get to, to start suggesting
