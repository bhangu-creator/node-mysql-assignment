const mysql = require('mysql');
 
var mysqlConnection = mysql.createConnection({          
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.DATABASE_NAME,

});

mysqlConnection.connect(function (err) {
  if (!err) {
    console.log('connection estabaslished');
  } else {
    console.error(err);
  }
});

module.exports = mysqlConnection;
