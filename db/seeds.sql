USE employee_db;

INSERT INTO department (name)
VALUES
  ('Defense'),
  ('Agriculture'),
  ('State'),
  ('Justice'),
  ('Labor');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Intern', 10, 1),
  ('Manager', 100, 2),
  ('Department Head', 10000, 3),
  ('Secretary', 1000, 4),
  ('Dinosaur', 10000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('George', 'Washington', 1, 1),
  ('Abe', 'Lincoln', 2, 1),
  ('Franky', 'Roosevelt', 2, 1),
  ('Male', 'Dudebro', 3, 1),
  ('Old', 'Politician', 4, 1);