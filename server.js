const inquirer = require("inquirer");
const cTable = require("console.table");
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
        viewRoles();
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
