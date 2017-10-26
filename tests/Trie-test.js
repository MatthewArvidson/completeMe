const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

import fs from 'fs';
import { expect } from 'chai';
import Trie from '../lib/Trie.js';
import Node from '../lib/Node.js';

let trie;
let node;

describe('Trie test', () => {

  beforeEach(() => {
    trie = new Trie();
    node = new Node('');
  })

  it('should be an object', () => {
    expect(trie).to.be.a('object');
  })

  it('should be an function', () => {
    expect(Trie).to.be.a('function');
  })

  it('should have a Node as the root', () => {
    expect(trie.root).to.deep.equal(node);
  })

  describe('suggest', () => {

    it('should be an method', () => {
      expect(trie.suggest).to.be.a('function');
    })

    it('Should return an array', () => {
      expect(trie.suggest('')).to.deep.equal([]);
    })

    it('Should suggest a word from the dictionary', () => {
      trie.populate(dictionary);
      trie.insert('pizz');

      expect(trie.suggest('pizz')).to.include.members(['pizza']);
    })

    it('Should suggest a word when given a letter', () => {
      trie.insert('pizza');
      trie.insert('apple');
      trie.insert('appeal');

      expect(trie.suggest('piz')).to.deep.equal(['pizza']);
    })

    it('Should take in a string', () => {
      trie.populate(dictionary);
      // console.log(trie.suggest('pot'));
      expect(trie.suggest('pot')).to.include.members(['pothunting', 'potleg']);
    })

    it('Should not be case sensitive', () => {
      trie.insert('pizza');
      trie.insert('Pizza');

      expect(trie.suggest('piz')).to.deep.equal(['pizza']);
    })

  })

  describe('insert', () => {

    it('should be an method', () => {
      expect(trie.insert).to.be.a('function');
    })

    it('should have a root', () => {
      let node = new Node('');

      expect(trie.root).to.deep.equal(node);
    })

    it('should keep a count of the words inserted', () => {
      var trie = new Trie();
      let count;
      trie.insert('race');
      expect(trie.count).to.equal(1);
      trie.insert('rain');
      expect(trie.count).to.equal(2);
      trie.insert('important');
      expect(trie.count).to.equal(3);
      trie.insert('transubstantiation');
      expect(trie.count).to.equal(4);
      // console.log(JSON.stringify(trie, null, 2));
    })

    it('should be able to take in a word', () => {
      trie.insert('pizza');
      expect(trie.root.children.p.children.i.children.z.children.z.children.a.wordEnd).to.equal(true);
    })

    it('should not insert a word twice', () => {
      trie.insert('apple');

      expect(trie.root.children.a.letter).to.equal('a');
      expect(trie.root.children.a.children.p.letter).to.equal('p');
    })

  })

  describe('populate', () => {

    it('should be an method', () => {
      expect(trie.populate).to.be.a('function');
    })

    it('should populate a dictionary', () => {
      trie.populate(dictionary);
      expect(trie.count).to.equal(235886);
    })
  })

  describe('select', () => {

    it('should be an method', () => {
      expect(trie.select).to.be.a('function');
    })

    it('should increment word popularity every time a word is selected', () => {
      trie.insert('pie');
      expect(trie.root.children.p.children.i.children.e.popularity).to.equal(0);
      trie.select('pie');
      expect(trie.root.children.p.children.i.children.e.popularity).to.equal(1);
      trie.select('pie');
      expect(trie.root.children.p.children.i.children.e.popularity).to.equal(2);
    })
  })

})
