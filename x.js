const {Scorer} = require('./index');

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

result = s1.score('My skills javascript php Angular');
console.log(result);

// { positive: 2.744575053421725,
//   negative: 1.3722875267108625,
//   weight: 1.3722875267108625,
//   expertise: 4.1168625801325875,
//   positivity: 2,
//   negativity: 0.5,
//   activity: 1.5 }

result = s1.calculate({positive: 10, negative: 6});
console.log(result);

// { positive: 10,
//   negative: 6,
//   weight: 4,
//   expertise: 16,
//   positivity: 1.6666666666666667,
//   negativity: 0.6,
//   activity: 1.0666666666666669 }

