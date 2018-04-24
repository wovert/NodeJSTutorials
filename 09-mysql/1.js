const mysql = require('mysql');

// 1. Connection mysql
const dbLink = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'test'
});

// 2. Search
const sql = 'select * from user';
dbLink.query(sql, (err, data) => {
  if (err) {
    console.log('错除了', err);
  } else {
    console.log('Success: ', data);
    console.log(JSON.stringify(data)); // [{...}, ...]

  }
});