INSERT INTO department(id, name)
VALUES
(1, 'DevOps' ),
(2, 'UI/UX'),
(3, 'Data Management'),
(4, 'Human Resources'),
(5, 'Accounting'),
(6, 'Marketing'),
(7, 'Sales');

INSERT INTO roles (id, title, salary, department_id)
VALUES
(1, 'Senior Accountant', 167000, 5 ),
(2, 'Lead UI/UX technician', 135000, 2),
(3, 'Junior Front-End developer',63000,2),
(4, 'Database Specialist', 93000, 3),
(5, 'Cold Call Extraordinaire', 40000, 7),
(6, 'DevOps Lead', 145000,1),
(7, 'Human Resources Manager', 86000, 4),
(8, 'Cheif Marketing Strategist',11000, 6);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1,'Jerry' , 'Smyrnfeld'  , 8,4),
    (2,'Cynthia' , 'Sminthia' ,7 ,NULL),
    (3, 'Jose' , 'van der Steen' ,4 ,9),
    (4, 'Hope' , 'van Winkel' , 1, NULL),
    (5, 'Alec' , 'Johannsson'  , 5 , 4),
    (6, 'Craig' , 'Kaplan' ,8 ,Null),
    (7, 'Jordan' , 'Roosterfield' ,3 ,2 ),
    (8, 'Susie' , 'Spritzenauf' , 2,NULL),
    (9, 'Heidi' , 'Smith' ,6,NULL ),
    (10, 'Olga' , 'Zadarozhnia' ,4 ,9),
    (11, 'Timothy' , 'Rodriguez' ,3 ,2),
    (12, 'Chuck' , 'Norris' ,3 ,2);

