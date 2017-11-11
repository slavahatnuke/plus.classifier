const elasticlunr = require('./elasticlunr.loader');

module.exports = class Scorer {
  constructor(classification = [], options = {}) {
    this.options = Object.assign({
      activity: 1e10
    }, options);

    this.classification = [];

    (classification || []).forEach(([keyword, weight]) => this.add(keyword, weight));
  }

  add(keyword, weight) {
    weight = +weight;
    this.classification.push([keyword, weight ? weight : 0]);
  }

  score(text) {
    const result = {
      positive: 0,
      negative: 0,
      weight: 0,
      expertise: 0,
      positivity: 0,
      negativity: 0
    };

    const index = elasticlunr(function () {
      this.addField('text');
      this.setRef('id');
      this.saveDocument(false);
    });

    index.addDoc({text, id: '1'});

    this.classification.forEach(([keyword, weight]) => {
      const results = index.search(('' + keyword), {fields: {text: {boost: 1}}});

      if (results.length) {
        const {score} = results[0];
        const value = score * weight;

        if (weight >= 0) {
          result.positive += value;
        } else {
          result.negative += value;
        }
      }
    });

    result.weight = result.positive + result.negative;
    result.expertise = result.positive - result.negative;

    result.positivity = result.negative ? result.positive / -result.negative : this.options.activity * result.positive;
    result.negativity = result.positive ? -result.negative / result.positive : this.options.activity * result.negative;

    return result;
  }

};
