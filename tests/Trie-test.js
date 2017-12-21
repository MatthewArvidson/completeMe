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
  });

  it('should be an object', () => {
    expect(trie).to.be.a('object');
  });

  it('should be an function', () => {
    expect(Trie).to.be.a('function');
  });

  it('should have a Node as the root', () => {
    expect(trie.root).to.deep.equal(node);
  });

  describe('suggest', () => {

    it('should be an method', () => {
      expect(trie.suggest).to.be.a('function');
    });

    it('Should return an array', () => {
      expect(trie.suggest('')).to.deep.equal([]);
    });

    it('Should suggest a word from the dictionary', () => {
      trie.populate(dictionary);
      trie.insert('pizz');

      expect(trie.suggest('pizz')).to.include.members(['pizza']);
    });

    it('Should suggest a word when given a letter', () => {
      trie.insert('pizza');
      trie.insert('apple');
      trie.insert('appeal');

      expect(trie.suggest('piz')).to.deep.equal(['pizza']);
    });

    it('Should take in a string', () => {
      trie.populate(dictionary);
      expect(trie.suggest('pot')).to.include.members(['pothunting', 'potleg']);
    });

    it('Should not be case sensitive', () => {
      trie.insert('pizza');
      trie.insert('Pizza');

      expect(trie.suggest('piz')).to.deep.equal(['pizza']);
    });

    it('Should suggest words with higher popularity before alphabeticle words', () => {
      trie.insert('pizza');
      trie.insert('pie');
      trie.insert('pass');

      trie.select('pizza');
      trie.select('pizza');

      trie.select('pie');

      expect(trie.suggest('p')).to.deep.equal(['pizza', 'pie', 'pass']);
    });

    it('Should not break the code if the current phrase matches no words', () => {
      trie.insert('apple');
      trie.insert('baby');
      trie.insert('cat');
      trie.insert('dog');

      expect(trie.suggest('el')).to.deep.equal([]);
    });

    it('Should not break the code if the current phrase is not a letter', () => {
      trie.insert('apple');
      trie.insert('baby');
      trie.insert('cat');
      trie.insert('dog');

      expect(trie.suggest('!')).to.deep.equal([]);
      expect(trie.suggest('?')).to.deep.equal([]);
    });

  });

  describe('insert', () => {

    it('should be an method', () => {
      expect(trie.insert).to.be.a('function');
    });

    it('should have a root', () => {
      let node = new Node('');

      expect(trie.root).to.deep.equal(node);
    });

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
    });

    it('should be able to take in a word', () => {
      trie.insert('pizza');
      expect(trie.root.children.p.children.i.children.z.children.z.children.a.wordEnd).to.equal(true);
    });

    it('should not insert a word twice', () => {
      trie.insert('apple');

      expect(trie.root.children.a.letter).to.equal('a');
      expect(trie.root.children.a.children.p.letter).to.equal('p');
    });

  });

  describe('populate', () => {

    it('should be an method', () => {
      expect(trie.populate).to.be.a('function');
    });

    it('should populate with a given array', () => {
      trie.populate(['apple', 'baby', 'cat', 'dog', 'elephant']);

      expect(trie.count).to.equal(5);
    });

    it('should populate a dictionary', () => {
      trie.populate(dictionary);
      expect(trie.count).to.equal(235886);
    });
  });

  describe('select', () => {

    it('should be an method', () => {
      expect(trie.select).to.be.a('function');
    });

    it('should increment word popularity every time a word is selected', () => {
      trie.insert('pie');
      expect(trie.root.children.p.children.i.children.e.popularity).to.equal(0);
      trie.select('pie');
      expect(trie.root.children.p.children.i.children.e.popularity).to.equal(1);
      trie.select('pie');
      expect(trie.root.children.p.children.i.children.e.popularity).to.equal(2);
    });

    it('Should take in a string and returns words that begin with that string(large sample)', () => {
      trie.populate(dictionary);

      expect(trie.suggest('zom')).to.deep.equal(['zombi', 'zombie', 'zombiism', 'zomotherapeutic', 'zomotherapy']);

      trie.select('zombie');

      expect(trie.suggest('zom')).to.deep.equal(['zombie', 'zombi', 'zombiism', 'zomotherapeutic', 'zomotherapy']);
    });

    it('Should have words with higher popularity before alphabeticle words in the suggestion array', () => {
      trie.insert('apple');
      trie.insert('acre');
      trie.insert('ants');

      trie.select('apple');
      trie.select('apple');

      trie.select('ants');

      expect(trie.suggest('a')).to.deep.equal(['apple', 'ants', 'acre']);
    });

  });

  describe('delete', () => {
    
    it('should be an method', () => {
      expect(trie.delete).to.be.a('function');
    });

    it('should not suggest a word deleted from suggested words', () => {
      trie.insert('cat');
      trie.insert('cats');
      trie.insert('catch');
      trie.insert('catheter');
      trie.insert('catatonic');

      expect(trie.suggest('ca')).to.deep.equal(['cat', 'cats', 'catch', 'catheter', 'catatonic']);

      trie.delete('cat');

      expect(trie.suggest('ca')).to.deep.equal(['cats', 'catch', 'catheter', 'catatonic']);
    });

    it('should not suggest any deleted words from suggested words', () => {
      trie.insert('cat');
      trie.insert('cats');
      trie.insert('catch');
      trie.insert('catheter');
      trie.insert('catatonic');

      expect(trie.suggest('ca')).to.deep.equal(['cat', 'cats', 'catch', 'catheter', 'catatonic']);

      trie.delete('cat');

      expect(trie.suggest('ca')).to.deep.equal(['cats', 'catch', 'catheter', 'catatonic']);

      trie.delete('catch');

      expect(trie.suggest('ca')).to.deep.equal(['cats', 'catheter', 'catatonic']);

      trie.delete('catheter');
      
      expect(trie.suggest('ca')).to.deep.equal(['cats', 'catatonic']);
    });

    it('Should not suggest a deleted word from the dictionary', () => {
      trie.populate(dictionary);

      trie.delete('pizza');

      expect(trie.suggest('pizza')).to.not.include.members(['pizza']);
    });

    it('Should not suggest any deleted words from the dictionary', () => {
      trie.populate(dictionary);

      trie.delete('pizza');

      expect(trie.suggest('pizza')).to.not.include.members(['pizza']);

      trie.delete('pizzle');
      
      expect(trie.suggest('pizza', 'pizzle')).to.not.include.members(['pizza', 'pizzle']);

      trie.delete('attention');
      
      expect(trie.suggest('pizza', 'pizzle', 'attention')).to.not.include.members(['pizza', 'pizzle', 'attention']);
    });
  });
});
