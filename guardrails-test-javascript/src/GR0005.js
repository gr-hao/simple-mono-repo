require('./current_file').file(__filename);

/*
* [GR:0005:stable]
*/
var a = Buffer.alloc(10);
a.readUInt8(0, true)


