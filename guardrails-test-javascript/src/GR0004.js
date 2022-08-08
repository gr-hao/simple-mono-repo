require('./current_file').file(__filename);

/*
* [GR:0004:alpha]
* Disable markup escape detected: Handlebars#SafeString
*/

var Handlebars = require('handlebars');
Handlebars.SafeString("<button>I agree I</button>")
