INSERT INTO department(name)
VALUES
( 'DevOps' ),
( 'UI/UX'),
( 'Data Management'),
( 'Human Resources'),
( 'Accounting'),
( 'Marketing'),
( 'Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
( 'Senior Accountant', 167000, 5 ),
( 'Lead UI/UX technician', 135000, 2),
( 'Junior Front-End developer',63000,2),
( 'Database Specialist', 93000, 3),
( 'Cold Call Extraordinaire', 40000, 7),
( 'DevOps Lead', 145000,1),
( 'Human Resources Manager', 86000, 4),
( 'Chief Marketing Strategist',11000, 6);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES
    ('Jerry' , 'Smyrnfeld'  , 8,4),
    ('Cynthia' , 'Sminthia' ,7 ,NULL),
    ( 'Jose' , 'van der Steen' ,4 ,9),
    ( 'Hope' , 'van Winkel' , 1, NULL),
    ( 'Alec' , 'Johannsson'  , 5 , 4),
    ( 'Craig' , 'Kaplan' ,8 ,Null),
    ( 'Jordan' , 'Roosterfield' ,3 ,2 ),
    ( 'Susie' , 'Spritzenauf' , 2,NULL),
    ( 'Heidi' , 'Smith' ,6,NULL ),
    ( 'Olga' , 'Zadarozhnia' ,4 ,9),
    ( 'Timothy' , 'Rodriguez' ,3 ,2),
    ( 'Chuck' , 'Norris' ,3 ,2);

