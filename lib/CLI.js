const inquirer = require('inquirer')
const questions = require('./questions.js')
const deptQ = require('./deptQ.js')
const mysql = require('mysql2/promise');
const table = require('console.table')
const Query = require('./class')
// console.log(questions)
// console.log(deptQ)

class CLI{
    constructor(){}
    run(){
        return inquirer.prompt(questions)
        .then((answers)=>{
            
            const db = new Query()
            db.connect()
            switch(answers.options){
                case 'view all departments':
                    db.selectDept()
                    .then(([data])=>{            
                        console.table('\nDepartments',data);
                        this.run();
                    })
                    break;
                    
            case 'view all employees':
                db.selectEmployee()
                    .then(([data])=>{
                         console.table('\nEmployees', data);
                        this.run();
                })
                break;
            case 'view all roles':
                db.selectRoles()
                    .then(([data]) =>{
                         console.table('\nRoles',data);
                        this.run();
                    });
                break;
                            
            case 'add a department':
                inquirer.prompt(deptQ)
                    .then((answers) =>{                                    
                        db.addDept(answers.dept_name)
                            .then((data) =>{
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
                                const pword= value.match(/\d+/);
                                if (pword){
                                    return true;
                                }
                                return "must be a number"
                            }
                        }
                    ])
                    .then (answers => {
                        let {role, salary} = answers;
                        console.log(role)
                        console.log(salary)
                        db.listDept()
                            .then(data => {
                                 const departments = data[0];
                                return inquirer.prompt([
                                    {
                                        type :'list',
                                        name: 'dept',
                                        message: 'In which department would you like to add this role?',
                                        choices: departments
                                    }
                                ])
                                .then((answers) =>{    
                                    let { dept } = answers;                                
                                    db.addRole(role, salary, dept)
                                        .then((data) =>{
                                            console.table(`\n ADDED ${role}`)
                                            this.run();
                                        });           
                                })
                            });
                    })       
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
                        let {first, last} = answers;
                        console.log(first);
                        console.log(last);
                        db.listRoles()
                            .then(data => {
                                const roles = data[0];
                                console.log(roles)
                                return inquirer.prompt([
                                    {
                                        type :'list',
                                        name: 'title',
                                        message: 'What is the job title of the new employee',
                                        choices: roles
                                    }
                                ])
                                .then((answers) =>{                            
                                    let { title } = answers; 
                                    console.log(title);
                                    db.listManagers()
                                        .then(data => {
                                            const managers= data[0];
                                            console.log(managers);
                                            return inquirer.prompt([
                                                {
                                                    type: 'list',
                                                    name: 'manager',
                                                    message: 'Please choice a manager for this employee',
                                                    choices: managers
                                                }
                                            ]).then((answers) => {
                                                let { manager } =answers
                                                db.addEmployee(first, last, title, manager)
                                                .then ((data) => {
                                                    console.table(`\n ADDED ${first} ${last} to the database`)
                                                    this.run();
                                                })
                                            })
                                        })                                        
                                    })
                            });
                    }) 
    
            break;
            case 'update an employee role':
                
            break;
    
    
    
        }return
    })

}}
module.exports= CLI