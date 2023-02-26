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
                'update an employee or Manager',
                'update an Role (change its salary)',
                'sort employees by manager',
                'sort employees by department',
                'delete department',
                'delete role',
                'view company budget'],

        default: 'view all departments'
    },];

    //     {
    //         type:
    //         name:
    //         message:
    //     },
    //     {
    //         type:
    //         name:
    //         message:
    //     },
    //     {
    //         type:
    //         name:
    //         message:
    //     },
    //     {
    //         type:
    //         name:
    //         message:
    //     },
    //     {
    //         type:
    //         name:
    //         message:
    //     },
    //     {
    //         type:
    //         name:
    //         message:
    //     },
    //     {
    //         type:
    //         name:
    //         message:
    //     },
    //     {
    //         type:
    //         name:
    //         message:
    //     }
    

module.exports = questions ;
