const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./db/connection");
console.table();

let listOfDepartments = [];
//Menu Function
const menuPrompts = async () => {
  populateDepartments();
  let response = await inquirer
    .prompt({
      name: "question",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Update an employee role",
        "Exit",
      ],
    })
    .then((response) => {
      if (response.question === "Add Department") {
        return addDepartment();
      }
      if (response.question === "Add Role") {
        return addRole();
      }
      if (response.question === "Add Employee") {
        return addEmployee();
      }
      if (response.question === "View all Departments") {
        return viewDepartment();
      }
      if (response.question === "View all Roles") {
        return viewRole();
      }
      if (response.question === "View all Employees") {
        return viewEmployees();
      }
      if (response.question === "Update an employee role") {
        return updateEmployee();
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
  let queryString = `
  SELECT title, salary, department.name AS department
  FROM role
  JOIN department
  WHERE department_id = department.id`;

  connection.query(queryString, (err, data) => {
    if (err) throw err;
    console.table(data);

    menuPrompts();
  });
};
//View Employee
const viewEmployees = () => {
  const query = `SELECT * FROM employee;`;

  connection.query(query, (err, data) => {
    if (err) throw err;
    console.table(data);

    menuPrompts();
  });
};

function populateDepartments() {
  listOfDepartments = [];
  connection.query(`SELECT * FROM department`, (err, data) => {
    data.forEach((index) => {
      listOfDepartments.push(index.name);
    });
  });
}

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
        "INSERT INTO department(name) VALUES (?) ",
        answer.name,
        (err, data) => {
          if (err) throw err;
          console.log(data);
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
      console.log(listOfDepartments.indexOf(answer.deptID) + 1);
      connection.query(
        "INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)",
        [
          answer.name,
          answer.salary,
          listOfDepartments.indexOf(response.deptID) + 1,
        ],
        (err, data) => {
          if (err) throw err;
          console.log(data);
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
      console.log(
        listOfDepartments.indexOf(answer.roleID, answer.managersID) + 1
      );
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [
          answer.firstName,
          answer.lastName,
          answer.employeeRole,
          answer.newManager,
        ],
        (err, data) => {
          if (err) throw err;
          console.log(data);
          menuPrompts();
        }
      );
    });
};

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "chooseEmployee",
        message: "Which employee would you like to update?",
        choices: [],
      },
      {
        type: "list",
        name: "roleList",
        message: "What is the new role for this employee?",
        choices: [],
      },
    ])
    .then((answer) => {
      console.log(listOfDepartments.indexOf(answer.viewEmployees()) + 1);
      connection.query(
        "UPDATE employee SET role_id ? WHERE last_name ?",
        [answer.employeeRole, answer.lastName],
        (err, data) => {
          if (err) throw err;
          console.log(data);
          menuPrompts();
        }
      );
    });
};
