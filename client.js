var CodeMirror = require('code-mirror/mode/javascript');
var scope = require('lexical-scope');
var util = require('util');
var rfile = require('rfile');
var sample = rfile('./sample.js');

var input = new CodeMirror(document.getElementById('input'), {
  mode: 'javascript',
  viewportMargin: Infinity,
  theme: 'solarized light editable',
  value: sample
});
var output = new CodeMirror(document.getElementById('output'), {
  mode: 'javascript',
  readOnly: true,
  viewportMargin: Infinity,
  theme: 'solarized light readonly'
});
function display(obj) {
  output.setValue(util.inspect(obj));
}

input.on('change', update);
update();
function update() {
  var s;
  try {
    s = (scope(input.getValue()));
  } catch (ex) {
    output.setOption('mode', 'text');
    output.setValue(ex.stack || ex.message || ex);
    return;
  }
  output.setOption('mode', 'javascript');
  output.setValue(util.inspect(s));
}