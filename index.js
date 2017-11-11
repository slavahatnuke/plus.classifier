const Classifier = require('./Classifier');
const Scorer = require('./Scorer');

module.exports = {
  Classifier: (classification = null, options = {}) => new Classifier(classification, options),
  Scorer: (classification = [], options = {}) => new Scorer(classification, options)
};