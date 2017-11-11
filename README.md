# plus.classifier
The simplest classifier.

### Classifier
```javascript
const {Classifier} = require('plus.classifier');

// Example #1
const myClassifier = Classifier();

myClassifier.add('my unit-tests failed.', 'software');
myClassifier.add('tried the program, but it was buggy.', 'software');
myClassifier.add('tomorrow we will do standup.', 'meeting');
myClassifier.add('the drive has a 2TB capacity.', 'hardware');
myClassifier.add('i need a new power supply.', 'hardware');
myClassifier.add('can you play some new music?', 'music');

//classify -> label
console.log(myClassifier.classify('did the tests pass?')); // -> software
console.log(myClassifier.classify('did you buy a new drive?')); // -> hardware
console.log(myClassifier.classify('What is the capacity?')); // -> hardware
console.log(myClassifier.classify('Lets meet tomorrow?')); // -> meeting
console.log(myClassifier.classify('Can you play some stuff?')); // -> music

// classification -> array
const classification = myClassifier.classification('did you buy a new drive?');
console.log(classification);
// [ { score: 0.40387812326239664, label: 'hardware' },
//   { score: 0.3258463268246468, label: 'music' },
//   { score: 0.2821911967599909, label: 'hardware' } ]

    
// Example #2, array constructor
const secondClassifier = Classifier([
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
```

### Scorer
```javascript
const {Scorer} = require('plus.classifier');

const s1 = Scorer();

s1.add('javascript', 10);
s1.add('node.js', 10);
s1.add('Angular', 10);
s1.add('React', 8);

s1.add('PHP', -10);
s1.add('Java', -10);
s1.add('Joomla', -20);
s1.add('Wordpress', -20);

const result = s1.score('My skills javascript php Angular');

// { positive: 3.068528194400547,
//   negative: -1.5342640972002735,
//   weight: 1.5342640972002735,
//   expertise: 4.602792291600821,
//   positivity: 2,
//   negativity: 0.5 }
```