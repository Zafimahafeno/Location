const mysql = require('mysql');
const db = require('./db');

const connection = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database 
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);

    connection.query(`CREATE DATABASE IF NOT EXISTS ${db.database}`, (error, results) => {
      if (error) {
        console.error('Error creating database: ' + error.stack);
        return;
      }
      console.log('Database created or already exists');
    });
  
  });
  
  module.exports = connection;