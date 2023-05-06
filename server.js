// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require("inquirer");
// Import the connection object
const db = require('./config/connection');



// what is this
db.connect(err => {
    if (err) throw err;
    console.log('connection secured');
    runTracker();
});


function runTracker () {
    inquirer.prompt({
        type: "list",
        choices: ["View departments", "Add Department", "View roles", "Add role"],
        message: "Please select one of the following options",
        name: "option"
    }).then((answers) => {
        if(answers.pompt === "View departments") {
            let query = "SELECT * FROM department";
            db.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            runTracker();
            })
        }

    })
}












//DO I NEED A PORT?
//const PORT = process.env.PORT || 3001;

// // Connect to database
// const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       // MySQL username,
//       user: 'root',
//       // TODO: Add MySQL password here
//       password: 'Jasmine14!',
//       database: 'employee_tracker'
//     },
//     console.log(`Connected to the movies_db database.`)
//   );