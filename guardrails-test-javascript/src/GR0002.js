require('./current_file').file(__filename);

/*
* [GR:0002:stable]
* Unsafe Regular Expression (new RegExp)
*/

var newUnsafeRegex = new RegExp('(x+x+)+y');

