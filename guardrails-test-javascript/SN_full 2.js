////////////////////////////////
// Modifying the DOM should not lead to open redirect vulnerabilities

document.location = document.location.hash.slice(1); // Covered


/////////////////////////////////////////
// Modifying the DOM should not lead to cross-site scripting (XSS) attacks

const rootDiv = document.getElementById('root');
const hash = decodeURIComponent(location.hash.substr(1));
rootDiv.innerHTML = hash; // covered



//////////////////////////////////////////
// Encryption algorithms should be used with secure mode and padding scheme

crypto.createCipheriv("AES-128-CBC", key, iv); // Noncompliant: CBC with PKCS5/7 (set by default) is vulnerable to oracle padding attacks (covered semgrep)
crypto.createCipheriv("AES-128-ECB", key, ""); // Noncompliant: ECB doesn't provide serious message confidentiality (covered semgrep)


/////////////////////////////////////////
// NoSQL operations should not be vulnerable to injection attacks

function asd (req, res) {
  let query = { user: req.query.user, city: req.query.city };

  db.collection("users")
    .find(query) // Noncompliant: http://website/?user=admin&city[%24ne]= covered semgrep
    .toArray((err, docs) => { });
}


///////////////////////////////////
// Database queries should not be vulnerable to injection attacks


var sequelize = require('sequelize');
var db = new sequelize.Sequelize('sqlite::memory:');

function bsd(req, res) {
  var password = crypto.createHash('sha256').update(req.query.password).digest('base64');

  var sql = "select * from user where name = '" + req.query.name + "' and password = '" + password + "'";

  db.query(sql, function(err, result) { // Noncompliant (covered semgrep)
     // something
  })
}


//////////////////////////////////////
// I/O function calls should not be vulnerable to path injection attacks

const fs = require('fs');

function lol (req, res) {
  const reqPath = __dirname + req.query.filename; // user-controlled path

  let data = fs.readFileSync(reqPath, { encoding: 'utf8', flag: 'r' }); // Noncompliant
}


///////////////////////////////////
// A new session should be created during user authentication


app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    // Sensitive - no session.regenerate after login
    res.redirect('/');
  });
  
  
///////////////////////////////////
// Regular expressions should not be vulnerable to Denial of Service attacks

function regex (req, res) {
  const pattern = RegExp(req.query.pattern); // Noncompliant covered semgrep
  pattern.test(req.query.input); // covered semgrep
};


//////////////////////////////
// File uploads should be restricted

const Formidable = require('formidable');

const form = new Formidable(); // Noncompliant, this form is not safe
form.uploadDir = ""; // because upload dir is not defined (by default os temp dir: /var/tmp or /tmp)
form.keepExtensions = true; // and file extensions are kept

const multer = require('multer');

let diskStorage = multer.diskStorage({ // Noncompliant: no destination specified
  filename: (req, file, cb) => {
    const buf = crypto.randomBytes(20);
    cb(null, buf.toString('hex'))
  }
});

// This upload is not safe as no destination specified, /var/tmp or /tmp will be used
let diskupload = multer({
  storage: diskStorage,
});



///////////////////////////////////
// Weak SSL/TLS protocols should not be used
var constants = require('crypto');

let options = {
  secureProtocol: 'TLSv1_method' // Noncompliant: TLS1.0 is insecure (covered)
};

options = {
  minVersion: 'TLSv1.1',  // Noncompliant: TLS1.1 is insecure (covered)
  maxVersion: 'TLSv1.2'
};

options = {
  secureOptions: constants.SSL_OP_NO_SSLv2 | constants.SSL_OP_NO_SSLv3 | constants.SSL_OP_NO_TLSv1
}; // Noncompliant TLS 1.1 (constants.SSL_OP_NO_TLSv1_1) is not disabled (covered semgrep)
https.createServer(options);


/////////////////////////////////
// Dynamic code execution should not be vulnerable to injection attacks


let username = req.query.username;
query = { $where: `this.username == '${username}'` }
User.find(query, function (err, users) { // covered semgrep
  if (err) {
    // Handle errors
  } else {
    res.render('userlookup', { title: 'User Lookup', users: users });
  }
});
