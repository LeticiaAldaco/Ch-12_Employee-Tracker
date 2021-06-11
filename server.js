const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./db/connection");
console.table();
//Menu Function
const menuPrompts = () => {
  inquirer
    .prompt({
      name: "question",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add Deparment",
        "Add Role",
        "Add Employee",
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Exit",
      ],
    })
    .then((response) => {
      if (response.question === "Add Deparment") {
        addDepartment();
      }
      if (response.question === "Add Role") {
        addRole();
      }
      if (response.question === "Add Employee") {
        addEmployee();
      }
      if (response.question === "View all Departments") {
        viewDepartment();
      }
      if (response.question === "View all Roles") {
        viewRole();
      }
      if (response.question === "View all Employees") {
        viewEmployees();
      }
      if (response.question === "Exit") {
        return;
      }
    });
};
menuPrompts();
//Add Department
const addDepartment = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What do you want your department name to be?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department",
        { name: answer.name },
        (err, res) => {
          menuPrompts();
        }
      );
    });
};
//Add Role
const addRole = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What role would you like to add?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO role",
        { name: answer.name },
        (err, res) => {
          menuPrompts();
        }
      );
    });
};
//Add Employee
const addEmployee = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the employees name?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO employee",
        { name: answer.name },
        (err, res) => {
          menuPrompts();
        }
      );
    });
};
//View Department
const viewDepartment = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    menuPrompts();
  });
};
//View Role
const viewRole = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    menuPrompts();
  });
};
//View Employee
const viewEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    menuPrompts();
  });
};
// const addEmployee = () => {
//     return inquirer
//     .prompt([
//         {
//             type: 'input',
//             name: 'name',
//             message: 'What is the employees name?',
//         },
//     ])
//     .then((answer) => {
//         connection.query(
//             "INSERT INTO employee",
//             { name: answer.name },
//             (err, res) => {
//                 menuPrompts();
//             }
//         );
//     });
// };
