const assert = require('assert');

const {Scorer} = require('../index');

describe('Scorer', () => {
  it('score -> result', () => {

    const s1 = Scorer();

    s1.add('javascript', 10);
    s1.add('node.js', 10);
    s1.add('Angular', 10);
    s1.add('React', 8);

    s1.add('PHP', -10);
    s1.add('Java', -10);
    s1.add('Joomla', -20);
    s1.add('Wordpress', -20);

    let result;
    result = s1.score('My skills joomla php');

    // console.log(result);

    assert.equal(result.positive.toFixed(2), 0);
    assert.equal(result.negative.toFixed(2), -5.31);

    assert.equal(result.weight.toFixed(2), -5.31);
    assert.equal(result.expertise.toFixed(2), 5.31);

    assert.equal(result.positivity.toFixed(2), 0);
    assert.equal(result.negativity.toFixed(2), -53148467371.59);

    result = s1.score('My skills javascript joomla');

    // console.log(result);

    assert.equal(result.positive.toFixed(2), 1.77);
    assert.equal(result.negative.toFixed(2), -3.54);

    assert.equal(result.weight.toFixed(2), -1.77);
    assert.equal(result.expertise.toFixed(2), 5.31);

    assert.equal(result.positivity.toFixed(2), 0.5);
    assert.equal(result.negativity.toFixed(2), 2);

    result = s1.score('My skills javascript php Angular');

    // console.log(result);

    assert.equal(result.positive.toFixed(2), 3.07);
    assert.equal(result.negative.toFixed(2), -1.53);

    assert.equal(result.weight.toFixed(2), 1.53);
    assert.equal(result.expertise.toFixed(2), 4.60);

    assert.equal(result.positivity.toFixed(2), 2);
    assert.equal(result.negativity.toFixed(2), 0.5);

    result = s1.score('My skills javascript node.js');

    // console.log(result);

    assert.equal(result.positive.toFixed(2), 3.54);
    assert.equal(result.negative.toFixed(2), 0);

    assert.equal(result.weight.toFixed(2), 3.54);
    assert.equal(result.expertise.toFixed(2), 3.54);

    assert.equal(result.positivity.toFixed(2), 35432311581.06);
    assert.equal(result.negativity.toFixed(2), 0);

  })

  it('score -> zero result', () => {

    const s1 = Scorer();

    s1.add('javascript', 10);
    s1.add('node.js', 10);
    s1.add('Angular', 10);
    s1.add('React', 8);

    s1.add('PHP', -10);
    s1.add('Java', -10);
    s1.add('Joomla', -20);
    s1.add('Wordpress', -20);

    let result;
    result = s1.score('Lorem ipsum');

    // console.log(result);

    assert.equal(result.positive.toFixed(2), 0);
    assert.equal(result.negative.toFixed(2), 0);

    assert.equal(result.weight.toFixed(2), 0);
    assert.equal(result.expertise.toFixed(2), 0);

    assert.equal(result.positivity.toFixed(2), 0);
    assert.equal(result.negativity.toFixed(2), 0);
  })

  it('score / constructor', () => {

    const s1 = Scorer([
      ['javascript', 10],
      ['node.js', 10],
      ['PHP', -20]
    ]);

    let result;
    result = s1.score('Lorem ipsum javascript php');

    assert.equal(result.positive.toFixed(2), 1.53);
    assert.equal(result.negative.toFixed(2), -3.07);

    assert.equal(result.weight.toFixed(2), -1.53);
    assert.equal(result.expertise.toFixed(2), 4.6);

    assert.equal(result.positivity.toFixed(2), 0.5);
    assert.equal(result.negativity.toFixed(2), 2);
  })

});