import { expect } from 'chai';
import index from '../lib/index.js';

import Trie from '../lib/Trie.js';
import Node from '../lib/Node.js';

import { bubbleSort, insertionSort, mergeSort, quickSort } from '@matthewarvidson/sorting-suite'

describe('Example Test File', () => {
  it('should successfully use sorts we imported (like badasses)', () => {
    expect(bubbleSort([3, 2, 1])).to.deep.equal([1, 2, 3]);
  })
})
