const s1 = scorer();

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