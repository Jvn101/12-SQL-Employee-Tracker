// Import and require mysql2
const mysql = require("mysql2");
const inquirer = require("inquirer");
// Import the connection object
const db = require("./config/connection");

//TO DO: turn db.query into promises to use async and await


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
    let query = "SELECT emp.first_name, emp.last_name, rol.job_title, rol.salary, dept.department_name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager \
    FROM employee emp \
    LEFT JOIN role rol \
      ON emp.role_id = rol.id \
    LEFT JOIN department dept \
      ON rol.department_id = dept.id \
    LEFT JOIN employee manager \
      ON manager.id = emp.manager_id"
    db.query(query, function (err, res) {
      if (err) throw err;
      const allEmployees = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${first_name} ${last_name}`}))
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
    .then(function(answers) {
        //console.log(answers)  
        db.query("INSERT INTO department (department_name) VALUES (?)", [answers.department], function (err, res) {
        if (err) throw err;
        console.table(res);
        runTracker();
      });
    });
}

// think how can I get the department id and names to appear for the third prompt question
function addRole() {
    inquirer
      .prompt([{
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
      }])
      .then(function(answers) {
        db.query("INSERT INTO role (job_title, salary, department_id) VALUES (?, ?, ?)",
        [answers.role, answers.salary, answers.department_id], function (err, res) {
          if (err) throw err;
          console.table(res);
          runTracker();
        });
      });
  }

  //how will user know what to input for valid employee id and manager id. Error handling function needed and way to view id options?
  function addEmployee() {
    inquirer
      .prompt([{
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
      }])
      .then(function(answers) {
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [answers.firstname, answers.lastname, answers.roleid, answers.managerid], function (err, res) {
          if (err) throw err;
          console.table(res);
          runTracker();
        });
      });
  }

//function updateEmployeeRole() {
    //let query = "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS employee FROM employee"
    //db.query(query, function (err, res) {
      //if (err) throw err;
      //const allEmployees = allEmployees[0].map(res)
      //res.map(({ id, first_name, last_name }) => ({
        //value: id, name: `${first_name} ${last_name}`}))
      //console.table(res);
      //employeeList();
    //}//);


//}

function updateEmployeeRole() {
    let query = "SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee FROM employee"
    db.query(query, function (err, employeeres) {
        if (err) throw err;
        // const allEmployees = res.map(({ id, first_name, last_name}) => ({value: id, name: `${first_name} ${last_name}`}))
        console.table(employeeres)
        inquirerUpdateEmployeeRole(employeeres)
})
}

function roleId() {
  let query = "SELECT role.id, role.job_title AS role FROM role"
  db.query(query, function (err, roleres) {
    if (err) throw err;
    console.table(roleres)
    inquirerUpdateEmployeeRole(roleres)
})
}

// I am prompted to select an employee to update and their new role and this information is updated in the database 
function inquirerUpdateEmployeeRole(employeeres, roleres) {
  const employeeNames = employeeres.map(
      (employeeData) => {
        return (employeeData.employee)
        //return (employeeData.id + ' ' + employeeData.employee)
})
  const newrole = roleres.map(
    (roledata) => {
      return (roledata.id)
    }
  )
  
  //console.log(allEmployees)
    inquirer
      .prompt([{
        type: "list",
        message: "Select the employee whose role you would you like to update",
        name: "employeelist",
        choices: employeeNames
      },
      {
        type: "input",
        message: "enter the new role name", 
        name: "updatedrole",
        choices: newrole,
      }])
      .then(function(answers) {
        db.query("UPDATE employee SET role_id=? WHERE employee.id =?",
        [answers.updatedrole, answers.employeelist.id], function (err, res) {
          if (err) throw err;
          console.log(answers.newrole)
          console.log("employee list")
          console.log(answers.employeelist)

          console.table(res);
          runTracker();
        });
      });
  }

  // function viewEmployeebyDepartment() {
  //   inquirer
  //     .prompt([{
  //       type: "list",
  //       message: "Select which departments employees you wish to view",
  //       name: "dep.employeelist",
  //       choices: departmentchoices
  //     },
  //     {
  //       type: "input",
  //       message: "enter the new role name ",
  //       name: "newrole",
  //     }])
  //     .then(function(answers) {
  //       let query = `SELECT dept.id, dept.name, rol.salary AS budget
  //       FROM employee emp
  //       LEFT JOIN role rol
  //         ON emp.role_id = rol.id
  //       LEFT JOIN department dept
  //       ON dept.id = rol.department_id
  //       GROUP BY dept.id, dept.name`
  //       db.query(query, function (err, res) {
  //         if (err) throw err;
  //         console.table(res);
  //         runTracker();
  //       });
  //     });
  // }

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
      } else if (answers.option === "Update an employees role"){
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
