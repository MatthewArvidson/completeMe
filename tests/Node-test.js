import { expect } from 'chai';
import Node from '../lib/Node.js';
import Trie from '../lib/Trie.js';

let node;

describe('Node test', () => {

  beforeEach(() => {
    node = new Node('');
  })

  it('should be a thing', () => {
    expect(node).to.exist;
  })

  it('should be a function', () => {
    expect(Node).to.be.a('function');
  })

  it('should start with an empty string as a default', () => {
    expect(node.letter).to.equal('');
  })

  it('should take a letter as a parameter and assign it to a node', () => {
    node = new Node('a');
    expect(node.letter).to.deep.equal('a');
  })

  it('should have no children', () => {
    expect(node.children).to.deep.equal({});
  })

})
