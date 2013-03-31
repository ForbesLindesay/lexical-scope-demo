var Stop = require('stop');
var app = new Stop(process.argv[2] === '--compile' || process.argv[2] === '-c');

var browserify = require('browserify-middleware');
//minification is causing syntax errors
//because of a crazy regexp so disable
//it
browserify.settings.production('minify', false);
browserify.settings('transform', ['rfileify']);

app.file('/', './index.html');
app.get('/client.js', browserify('./client.js'));
app.file('/codemirror.css', 'code-mirror/codemirror.css');
app.file('/theme.css', 'code-mirror/theme/solarized.css');
app.file('/foundation.css', './foundation.css');
app.file('/background.png', './background.png');
app.file('/forkme.png', './forkme.png');

app.run('./out', 3000);