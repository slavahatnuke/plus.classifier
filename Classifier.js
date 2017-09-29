const elasticlunr = require('elasticlunr');

module.exports = class Classifier {
  constructor(classification = null) {
    this.index = elasticlunr(function () {
      this.addField('feature');
      this.setRef('id');
    });

    this.labels = [];

    if (classification) {
      this.add(classification);
    }
  }

  add(features, label = null) {

    if(Array.isArray(features) && label === null) {
      features.forEach(([features, label]) => this.add(features, label));
      return this;
    }

    features = Array.isArray(features) ? features : [features];

    features.forEach((feature) => {
      this.index.addDoc({feature: ('' + feature), id: ('' + this.labels.length)});
      this.labels.push(label);
    });

    return this;
  }

  classify(features) {
    const results = this.index.search(('' + features), {fields: {feature: {boost: 1}}});

    if (results.length) {
      const lead = results.shift();
      const id = parseInt(lead.ref, 10);
      return this.labels[id] || undefined;
    }
  }
}