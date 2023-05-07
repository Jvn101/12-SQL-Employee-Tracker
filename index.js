// Import and require mysql2
const mysql = require("mysql2");
const inquirer = require("inquirer");
// Import the connection object
const db = require("./config/connection");

// what is this
db.connect((err) => {
  if (err) throw err;
  console.log("connection secured");
  runTracker();
});

function viewDepartments() {
  let query = "SELECT * FROM department";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runTracker();
  });
}

function viewRoles() {
    let query = "SELECT * FROM role";
        db.query(query, function (err, res) {
          if (err) throw err;
          console.table(res);
          runTracker();
        });
}

function viewEmployees() {
    let query = "SELECT * FROM employee";
    db.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      runTracker();
    });
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "input new department",
      name: "department",
    })
    .then((answers) => {
      let query =
        ("INSERT INTO department (department_name) VALUES (?)",
        [answers.department]);
      db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runTracker();
      });
    });
}

// think how can I get the department id and names to appear for the third prompt question
function addRole() {
    inquirer
      .prompt({
        type: "input",
        message: "input new role",
        name: "role",
      },
      {
        type: "input",
        message: "input the salary for this role",
        name: "salary",
      },
      {
        type: "input",
        message: "input the department id for this role",
        name: "department_id",
      })
      .then((answers) => {
        let query =
          ("INSERT INTO role (job_title) VALUES (?)",
          [answers.role]);
        db.query(query, function (err, res) {
          if (err) throw err;
          console.table(res);
          runTracker();
        });
      });
  }

  //how will user know what to input for valid employee id and manager id. Error handling function needed and way to view id options?
  function addEmployee() {
    inquirer
      .prompt({
        type: "input",
        message: "input the new employees first name",
        name: "firstname",
      },
      {
        type: "input",
        message: "input the new employees last name",
        name: "lastname",
      },
      {
        type: "input",
        message: "input the new employees role_id",
        name: "roleid",
      },
      {
        type: "input",
        message: "input the managers id for the new employee ",
        name: "managerid",
      })
      .then((answers) => {
        let query =
          ("INSERT INTO employee (job_title) VALUES (?)",
          [answers.employee]);
        db.query(query, function (err, res) {
          if (err) throw err;
          console.table(res);
          runTracker();
        });
      });
  }

function runTracker() {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "View departments",
        "View roles",
        "View employees",
        "Add department",
        "Add role",
        "Add employee",
        "exit",
      ],
      message: "Please select one of the following options",
      name: "option",
    })
    .then((answers) => {
      console.log(answers);
      if (answers.option === "View departments") {
        viewDepartments();
      } else if (answers.option === "View roles") {
        viewRoles();
      } else if (answers.option === "View employees") {
        viewEmployees();
      } else if (answers.option === "Add department") {
        addDepartment();
      } else if (answer.option === "Add role") {
        addRole();
      } else if (answers.option === "Add employee") {
        addEmployee();
      } else if (answers.option === "exit") {
        process.exit();
      } else {
        console.log("something is wrong");
      }
    });
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
