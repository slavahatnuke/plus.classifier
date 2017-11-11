const {Classifier} = require('./index');
const classifier = Classifier([
  ['<h1> hey </h1>', 'title'],
  ['<h2> hey </h2>', 'description']
]);

console.log(classifier.classification('h2 hey'))
