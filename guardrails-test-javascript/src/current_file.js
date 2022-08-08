var path = require('path');

exports.file = function(fileName) {
  var scriptName = path.basename(fileName);
  console.log('current file: ' + scriptName);
};
