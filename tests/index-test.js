import { expect } from 'chai';
import index from '../lib/index.js';

// import Trie from '../lib/Trie.js';
// import Node from '../lib/Node.js';

import { bubbleSort, insertionSort, mergeSort, quickSort } from '@matthewarvidson/sorting-suite';

describe('Import Sorting Package Testing', () => {
  it('should successfully use sorts we imported', () => {
    expect(bubbleSort([3, 2, 1])).to.deep.equal([1, 2, 3]);
  })
})

// describe('Phase One Testing', () => {
//   it('should be able to take in a word', () => {
//     expect();
//   })
//   it('should keep count of how many words have been inserted', () => {
//     expect();
//   })
// })
