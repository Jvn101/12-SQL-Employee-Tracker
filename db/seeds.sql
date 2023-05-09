INSERT INTO department (department_name)
VALUES ("Finance"),
       ("Information Technology"),
       ("Workplace");

INSERT INTO role (job_title, salary, department_id)
VALUES ("Finance Manager", "120000", 1),
       ("Scrum Master", "110000", 2),
       ("Head of Workplace", "380000", 3),
       ("Systems Engineer", "105000", 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Smith", 1, NULL),
       ("Jane", "Maples", 2, NULL),
       ("Martin", "Box", 3, NULL),
       ("Sally", "Hare", 4, 3);


       