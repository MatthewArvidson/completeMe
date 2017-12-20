import { expect } from 'chai';

import { bubbleSort, insertionSort, mergeSort, quickSort } from '@matthewarvidson/sorting-suite';

describe('Import Sorting Package Testing', () => {
  it('should successfully use sorts we imported', () => {
    expect(bubbleSort([3, 2, 1])).to.deep.equal([1, 2, 3]);
  })
})
