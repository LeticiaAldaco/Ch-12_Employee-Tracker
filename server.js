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
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Exit",
      ],
    })
    .then((response) => {
      if (response.question === "View all Departments") {
        return viewDepartment();
      }
      if (response.question === "View all Roles") {
        return viewRole();
      }
      if (response.question === "View all Employees") {
        return viewEmployees();
      }
      if (response.question === "Add Department") {
        return addDepartment();
      }
      if (response.question === "Add Role") {
        return addRole();
      }
      if (response.question === "Add Employee") {
        return addEmployee();
      }
      if (response.question === "Exit") {
        return;
      }
    });
};
menuPrompts();

//View Department
const viewDepartment = () => {
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.table(data);
    menuPrompts();
  });
};
//View Role
const viewRole = () => {
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.table(data);
    menuPrompts();
  });
};
//View Employee
const viewEmployees = () => {
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    console.table(data);
    menuPrompts();
  });
};

//Add Department
const addDepartment = async () => {
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
        "INSERT INTO department(name) VALUES (?) ",
        [answer.name],
        (err, data) => {
          if (err) throw err;
          console.table(data);
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
        name: "title",
        message: "What role would you like to add?",
      },
      {
        type: "number",
        name: "salary",
        message: "Insert salary amount",
      },
      {
        name: "deptID",
        message: "Which department does this new role belong to?",
        type: "list",
        choices: listOfDepartments,
      },
    ])
    .then((answer) => {
      connection.query(
        `INSERT INTO role (title, salary, department_id)
          VALUES ('${answer.title}', '${answer.salary}', '${answer.departmentId}')`,
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
        name: "firstName",
        message: "What is the employees first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employees last name?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the employees role ID?",
      },
      {
        type: "input",
        name: "managersId",
        message: "What is the employees managers ID?",
      },
    ])
    .then((answer) => {
      connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.roleId}', '${answer.managersId}')`,
        (err, data) => {
          if (err) throw err;
          console.table(data);
          menuPrompts();
        }
      );
    });
};
