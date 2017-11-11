const Classifier = require('./Classifier');

module.exports = {
  classifier: (classification = null) => new Classifier(classification)
};