import fs from 'fs';

const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

import { expect } from 'chai';
import Trie from '../lib/Trie.js';
import Node from '../lib/Node.js';

describe('First Trie test', () => {

  it('should be a function', () => {
    expect(Trie).to.be.a('function');
  })

  it('should be able to take insert a word into the Trie and keep a count of the words inserted', () => {
    var completion = new Trie();
    let count;
    completion.insert('race');
    expect(completion.count).to.equal(1);
    completion.insert('rain');
    expect(completion.count).to.equal(2);
    completion.insert('important');
    expect(completion.count).to.equal(3);
    completion.insert('transubstantiation');
    expect(completion.count).to.equal(4);
    // console.log(JSON.stringify(completion, null, 2));
  })

  // it('should populate a dictionary', () => {
  //   var completion = new Trie();
  //   completion.populate(dictionary);
  //   expect(completion.count).to.equal(235886);
  // })

})

describe('Suggest', () => {
  it('Should take in a string', () => {
    var completion = new Trie();
    completion.populate(dictionary);
    // console.log(completion.suggest('pot'));
    expect(completion.suggest('pot')).to.include.members(['pothunting', 'potleg']);
  })

  it('should make a suggestion', () => {
    var completion = new Trie();
    completion.insert('pizza');
    completion.insert('pizzazz');

    expect(completion.suggest('piz')).to.deep.equal(['pizza', 'pizzazz']);
  })
})
