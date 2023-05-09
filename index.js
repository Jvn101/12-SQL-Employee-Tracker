// Import and require mysql2
const mysql = require("mysql2");
const inquirer = require("inquirer");
// Import the connection object
const db = require("./config/connection");

db.connect((err) => {
  if (err) throw err;
  console.log("connection secured");
  runTracker();
});

//VIEW functions: (department, role and employee)

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

//join tables using foreign key
function viewEmployees() {
  let query =
    "SELECT emp.first_name, emp.last_name, rol.job_title, rol.salary, dept.department_name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager \
    FROM employee emp \
    LEFT JOIN role rol \
      ON emp.role_id = rol.id \
    LEFT JOIN department dept \
      ON rol.department_id = dept.id \
    LEFT JOIN employee manager \
      ON manager.id = emp.manager_id";
  db.query(query, function (err, res) {
    if (err) throw err;
    const allEmployees = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${first_name} ${last_name}`,
    }));
    console.table(res);
    runTracker();
  });
}

// ADD functions: (department, role and employee)

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "input new department",
      name: "department",
    })
    .then(function (answers) {
      db.query(
        "INSERT INTO department (department_name) VALUES (?)",
        [answers.department],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          runTracker();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
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
      },
    ])
    .then(function (answers) {
      db.query(
        "INSERT INTO role (job_title, salary, department_id) VALUES (?, ?, ?)",
        [answers.role, answers.salary, answers.department_id],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          runTracker();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
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
      },
    ])
    .then(function (answers) {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
          answers.firstname,
          answers.lastname,
          answers.roleid,
          answers.managerid,
        ],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          runTracker();
        }
      );
    });
}

function updateEmployeeRole() {
  const query =
    "SELECT employee.id, employee.first_name AS employee FROM employee";
  db.query(query, function (err, res) {
    if (err) throw err;

    const employeeNames = res.map((employeeData) => {
      return employeeData.employee;
    });
    console.table(employeeNames);
    roleId(employeeNames);
  });
}

function roleId(employeeNames) {
  const query = "SELECT role.id, role.job_title FROM role";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    const newrole = res.map((roledata) => {
      return roledata.id;
    });
    inquirerUpdateEmployeeRole(employeeNames, newrole);
  });
}

// function prompts user to select an employee to update and their new role and this information is updated in the database
function inquirerUpdateEmployeeRole(employeeNames, newrole) {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Select the employee whose role you would you like to update",
        name: "employeelist",
        choices: employeeNames,
      },
      {
        type: "list",
        message: "enter the new role id",
        name: "updatedrole",
        choices: newrole,
      },
    ])
    .then(function (answers) {
      db.query(
        "UPDATE employee SET role_id=? WHERE first_name =?",
        [answers.updatedrole, answers.employeelist],
        function (err, res) {
          if (err) throw err;
          console.log("role id");
          console.log(answers.updatedrole);
          console.log("employee list");
          console.log(answers.employeelist);

          console.table(res);
          runTracker();
        }
      );
    });
}

//inquirer prompt function for users to select between choices
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
        "Update an employees role",
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
      } else if (answers.option === "Add role") {
        addRole();
      } else if (answers.option === "Add employee") {
        addEmployee();
      } else if (answers.option === "Update an employees role") {
        updateEmployeeRole();
      } else if (answers.option === "View employee by department") {
        viewEmployeebyDepartment();
      } else if (answers.option === "exit") {
        process.exit();
      } else {
        console.log("something is wrong");
      }
    });
}
