const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'What do you want to do?',
        choices:
            ['view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee role',
                'sort employees by manager',
                'sort employees by department',
                'delete department',
                'delete role',
                'delete employee',
                'view company budget',
                'exit'
            ],

        default: 'view all departments'
    },
];

module.exports = questions ;
