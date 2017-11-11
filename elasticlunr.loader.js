let elasticlunr;

if (global.define) {
  const _define = global.define || null;
  global.define = null;
  elasticlunr = require('elasticlunr');
  global.define = _define;
} else {
  elasticlunr = require('elasticlunr');
}

elasticlunr.clearStopWords();

module.exports = elasticlunr;