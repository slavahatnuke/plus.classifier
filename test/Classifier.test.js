const assert = require('assert');

const {classifier} = require('../index');

describe('Classifier', () => {
  it('classify', () => {

    const c1 = classifier();

    c1.add('my unit-tests failed.', 'software');
    c1.add('tried the program, but it was buggy.', 'software');
    c1.add('tomorrow we will do standup.', 'meeting');
    c1.add('the drive has a 2TB capacity.', 'hardware');
    c1.add('i need a new power supply.', 'hardware');
    c1.add('can you play some new music?', 'music');


    assert.equal(c1.classify('did the tests pass?'), 'software');
    assert.equal(c1.classify('did you buy a new drive?'), 'hardware');
    assert.equal(c1.classify('What is the capacity?'), 'hardware');
    assert.equal(c1.classify('Lets meet tomorrow?'), 'meeting');
    assert.equal(c1.classify('Can you play some stuff?'), 'music');
  })

  it('classify -> undefined', () => {

    const c1 = classifier();
    c1.add('my unit-tests failed.', 'software');

    assert.equal(c1.classify('lorem ipsum'), undefined);
    assert.equal(c1.classify('test'), 'software');
  })

  it('classify / with array constructor', () => {

    const c1 = classifier([
      ['my unit-tests failed.', 'software'],
      ['tried the program, but it was buggy.', 'software'],
      ['tomorrow we will do standup.', 'meeting'],
      ['the drive has a 2TB capacity.', 'hardware'],
      ['i need a new power supply.', 'hardware'],
      ['can you play some new music?', 'music']
    ]);

    assert.equal(c1.classify('did the tests pass?'), 'software');
    assert.equal(c1.classify('did you buy a new drive?'), 'hardware');
    assert.equal(c1.classify('What is the capacity?'), 'hardware');
    assert.equal(c1.classify('Lets meet tomorrow?'), 'meeting');
    assert.equal(c1.classify('Can you play some stuff?'), 'music');
  })

  it('classification', () => {

    const c1 = classifier();

    c1.add('my unit-tests failed.', 'software');
    c1.add('tried the program, but it was buggy.', 'software');
    c1.add('tomorrow we will do standup.', 'meeting');
    c1.add('the drive has a 2TB capacity.', 'hardware');
    c1.add('i need a new power supply.', 'hardware');
    c1.add('can you play some new music?', 'music');

    const classification = c1.classification('did you buy a new drive?');

    assert.equal(classification.length, 3);

    assert.equal(classification[0].score.toFixed(2), .40);
    assert.equal(classification[0].label, 'hardware');

    assert.equal(classification[1].score.toFixed(2), .33);
    assert.equal(classification[1].label, 'music');

    assert.equal(classification[2].score.toFixed(2), .28);
    assert.equal(classification[2].label, 'hardware');
  })

});