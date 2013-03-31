var Stop = require('stop');
var app = new Stop(process.argv[2] === '--compile' || process.argv[2] === '-c');

var browserify = require('browserify-middleware');

browserify.settings('transform', ['rfileify']);

app.file('/', './index.html');
app.get('/client.js', browserify('./client.js'));
app.file('/codemirror.css', 'code-mirror/codemirror.css');
app.file('/theme.css', 'code-mirror/theme/solarized.css');
app.file('/foundation.css', './foundation.css');
app.file('/background.png', './background.png');
app.file('/forkme.png', './forkme.png');

app.run('./out', 3000);