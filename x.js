const classifier = require('./index');

const myClassifier = classifier();

myClassifier.add('my unit-tests failed.', 'software');
myClassifier.add('tried the program, but it was buggy.', 'software');
myClassifier.add('tomorrow we will do standup.', 'meeting');
myClassifier.add('the drive has a 2TB capacity.', 'hardware');
myClassifier.add('i need a new power supply.', 'hardware');
myClassifier.add('can you play some new music?', 'music');


console.log(myClassifier.classify('did the tests pass?')); // -> software
console.log(myClassifier.classify('did you buy a new drive?')); // -> hardware
console.log(myClassifier.classify('What is the capacity?')); // -> hardware
console.log(myClassifier.classify('Lets meet tomorrow?')); // -> meeting
console.log(myClassifier.classify('Can you play some stuff?')); // -> music

// array constructor
const secondClassifier = classifier([
  ['my unit-tests failed.', 'software'],
  ['tried the program, but it was buggy.', 'software'],
  ['tomorrow we will do standup.', 'meeting'],
  ['the drive has a 2TB capacity.', 'hardware'],
  ['i need a new power supply.', 'hardware'],
  ['can you play some new music?', 'music']
]);

console.log(secondClassifier.classify('did the tests pass?')); // -> software
console.log(secondClassifier.classify('did you buy a new drive?')); // -> hardware
console.log(secondClassifier.classify('What is the capacity?')); // -> hardware
console.log(secondClassifier.classify('Lets meet tomorrow?')); // -> meeting
console.log(secondClassifier.classify('Can you play some stuff?')); // -> music
