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


function viewDepartments(){
    let query = "SELECT * FROM department";
    db.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    runTracker();
    })
}

function addDepartment(){
    inquirer.prompt({
        type: "input",
        message:"input new department",
        name: "department"
    }).then((answers) => {
        let query = ("INSERT INTO department (department_name) VALUES (?)", [answers.department]);
        db.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
        runTracker();
    
        })
    }

        )
}


function runTracker () {
    inquirer.prompt({
        type: "list",
        choices: ["View departments", "Add Department", "View roles", "Add role", "exit"],
        message: "Please select one of the following options",
        name: "option"
    }).then((answers) => {
        console.log(answers)
        if(answers.option === "View departments") {
            viewDepartments()
        } else if (answers.option === "View roles") {
            let query = "SELECT * FROM role";
            db.query(query, function(err, res) {
            if (err) throw err;
            console.table(res);
            runTracker();
            })
        } else if (answers.option === "Add Department"){
            addDepartment()

        } else if (answers.option === "exit") {
            process.exit()
        } 
        else {
            console.log("something is wrong")
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