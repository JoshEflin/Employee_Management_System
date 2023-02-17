const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'What do you want to do?',
        choices:['view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add an employee',
            'update an employee role'],
        default: 'view all departments'  
    },
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
];

module.exports = questions;