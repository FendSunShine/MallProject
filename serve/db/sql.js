var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '020606',
  database : 'mallsql'
});

module.exports = connection