const elasticlunr = require('./elasticlunr.loader');

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

    if (Array.isArray(features) && label === null) {
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

  classify(feature) {
    const results = this._classify(feature);

    if (results.length) {
      const lead = results.shift();
      return this.labels[+lead.ref] || undefined;
    }
  }

  _classify(feature) {
    return this.index.search(('' + feature), {fields: {feature: {boost: 1}}});
  }

  classification(feature) {
    return this._classify(feature).map(({score, ref}) => {
      return {score, label: this.labels[+ref]};
    })
  }
}