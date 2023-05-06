//const Sequelize = require('sequelize');

const mysql = require('mysql2');

//Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'Jasmine14!',
      database: 'employee_tracker_db'
    },
    console.log(`Connected to the employee_tracker_db database.`)
  );

  module.exports = db;

// Create a connection object
// const sequelize = new Sequelize(
//   // Database name
//   'employee_tracker_db',
//   // User
//   'root',
//   // Password
//   'Jasmine14!',
//   {
//     // Database location
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
//   }
// );

//module.exports = sequelize;
