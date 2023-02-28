const inquirer = require('inquirer')
const questions = require('./questions.js')
const deptQ = require('./deptQ.js')
const mysql = require('mysql2/promise');
const table = require('console.table')
const Query = require('./class')


// creates a self referencing functionality that allows the same question to be repeated over and over with a "this.run() call" 
// the main functionality is to create a switch Case for each potential answer to an inquirer question.
class CLI {
    constructor() { }
    exit() {
        return process.exit(0);
    }
    run() {
        return inquirer.prompt(questions)
            .then((answers) => {

                const db = new Query()
                db.connect()
                switch (answers.options) {
                    case 'view all departments':
                        db.selectDept()
                            .then(([data]) => {
                                console.table('\nDepartments', data);
                                this.run();
                            })
                        break;

                    case 'view all employees':
                        db.selectEmployee()
                            .then(([data]) => {
                                console.table('\nEmployees', data);
                                this.run();
                            })
                        break;
                    case 'view all roles':
                        db.selectRoles()
                            .then(([data]) => {
                                console.table('\nRoles', data);
                                this.run();
                            });
                        break;

                    case 'add a department':
                        inquirer.prompt(deptQ)
                            .then((answers) => {
                                db.addDept(answers.dept_name)
                                    .then((data) => {
                                        console.table(`\n ADDED ${answers.dept_name}`)
                                    });

                                this.run();
                            });
                        break;

                    case 'add a role':
                        inquirer.prompt(
                            [
                                {
                                    type: 'input',
                                    name: 'role',
                                    message: 'What is the name of the role you would like to add?',
                                },
                                {
                                    type: 'input',
                                    name: 'salary',
                                    message: 'How much does this position pay?',
                                    validate(value) {
                                        const pword = value.match(/\d+/);
                                        if (pword) {
                                            return true;
                                        }
                                        return "must be a number"
                                    }
                                }
                            ])
                            .then(answers => {
                                let { role, salary } = answers;
                                // get a list of departments for next Inquirer prompt
                                db.listDept()
                                    .then(data => {
                                        const departments = data[0];
                                        return inquirer.prompt([
                                            {
                                                type: 'list',
                                                name: 'dept',
                                                message: 'In which department would you like to add this role?',
                                                choices: departments
                                            }
                                        ])
                                            .then((answers) => {
                                                let { dept } = answers;
                                                db.addRole(role, salary, dept)
                                                    .then((data) => {
                                                        console.table(`\n ADDED ${role}`)
                                                        this.run();
                                                    });
                                            });
                                    });
                            });
                        break;
                    case 'add an employee':
                        inquirer.prompt(
                            [
                                {
                                    type: 'input',
                                    name: 'first',
                                    message: 'What is the first name of the new employee',
                                },
                                {
                                    type: 'input',
                                    name: 'last',
                                    message: 'What is the last name of the new employee',
                                },
                            ])
                            .then(answers => {
                                let { first, last } = answers;
                                // get a list of roles for next question
                                db.listRoles()
                                    .then(data => {
                                        const roles = data[0];
                                        return inquirer.prompt([
                                            {
                                                type: 'list',
                                                name: 'title',
                                                message: 'What is the job title of the new employee',
                                                choices: roles
                                            }
                                        ])
                                            .then((answers) => {
                                                let { title } = answers;
                                                // get a list of managers for next question
                                                db.listManagers()
                                                    .then(data => {
                                                        const managers = data[0];
                                                        return inquirer.prompt([
                                                            {
                                                                type: 'list',
                                                                name: 'manager',
                                                                message: 'Please choice a manager for this employee',
                                                                choices: managers
                                                            }
                                                        ]).then((answers) => {
                                                            let { manager } = answers;
                                                            db.addEmployee(first, last, title, manager)
                                                                .then((data) => {
                                                                    console.table(`\n ADDED ${first} ${last} to the database`);
                                                                    this.run();
                                                                });
                                                        });
                                                    });
                                            });
                                    });
                            });

                        break;
                    case 'update an employee role':
                        // get a list of empoloyees for next question
                        db.listEmployees()
                            .then((data) => {
                                const employee = data[0];
                                inquirer.prompt([
                                    {
                                        type: 'list',
                                        name: 'empID',
                                        message: 'Who would you like to update? ',
                                        choices: employee
                                    }
                                ]).then(answers => {
                                    const empID = answers.empID;
                                    // get a list of roles for new variable required by the Query class
                                    db.listRoles().then((data) => {
                                        const roles = data[0]
                                        inquirer.prompt([
                                            {
                                                type: 'list',
                                                name: 'roleID',
                                                message: 'What is the new Role?',
                                                choices: roles
                                            }
                                        ]).then(answers => {
                                            const newRole = answers.roleID;
                                            db.updateEmployee(empID, newRole);
                                            console.table(`\n Sucessfully udpated!`);
                                            this.run();
                                        });
                                    });
                                });
                            });
                        break;
                    case 'delete department':
                        db.listDept()
                            .then(data => {
                                const departments = data[0];
                                return inquirer.prompt([
                                    {
                                        type: 'list',
                                        name: 'dept',
                                        message: 'Which department would you like to delete?',
                                        choices: departments
                                    }
                                ])
                                    .then((answers) => {
                                        const deptID = answers.dept;
                                        console.log(answers)
                                        db.deleteDept(deptID);
                                        console.log("department deleted")
                                        this.run();
                                    })
                            })
                        break;
                    case 'delete role':
                        db.listRoles()
                            .then(data => {
                                const roles = data[0];
                                return inquirer.prompt([
                                    {
                                        type: 'list',
                                        name: 'role',
                                        message: 'Which role would you like to delete?',
                                        choices: roles
                                    }
                                ])
                                    .then((answers) => {
                                        const roleID = answers.role;
                                        console.log(answers)
                                        db.deleteRole(roleID);
                                        console.log("role deleted")
                                        this.run();
                                    })
                            })
                        break;
                    case 'delete employee':
                        db.listEmployees()
                            .then((data) => {
                                const employee = data[0];
                                inquirer.prompt([
                                    {
                                        type: 'list',
                                        name: 'empID',
                                        message: 'Who would you like to fire?',
                                        choices: employee
                                    }
                                ]).then(answers => {
                                    const empID = answers.empID;
                                    db.deleteEmployee(empID)
                                    console.log('employee sucessfully laid off')
                                    this.run();
                                })   
                            })
                        break;
                        // didn't get here :()
                    case 'sort employees by manager':
                        console.log('this functionality is not currently enabled')
                        break;
                    case 'sort employees by department':
                        console.log('this functionality is not currently enabled')
                        break;
                    case 'view company budget':
                        console.log('this functionality is not currently enabled')
                        break;
                    case 'exit':
                        this.exit()
                }return
            })
    };
};
module.exports = CLI