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
                        }])
                        .then (answers => {
                            let {role, salary} = answers;
                            console.log(role)
                            console.log(salary)
                            db.listDept()
                                .then(data => {
                                    // console.log(data[0])
                                    // let deptID = [];
                                    const departments = data[0];
                                    // departments.forEach( dept => 
                                        // deptID.push(dept.VALUE))
                                    console.log(departments)
                                    return inquirer.prompt([
                                        {
                                            type :'list',
                                            name: 'dept',
                                            message: 'In which department would you like to add this role?',
                                            choices: departments
                                        }
                                    ])
                                    .then((answers) =>{    
                                        console.log(answers)
                                        let { dept } = answers;
                                        console.log(dept)                                
                                        db.addRole(role, salary, dept)
                                            .then((data) =>{
                                                console.table(`\n ADDED ${role} to ${dept}`)
                                                this.run();
                                            });
                                                    
                                        })
                                });
                        })
                   
            break;
            case 'add an employee':
                
    
            break;
            case 'update an employee role':
                
            break;
    
    
    
        }return
    })

}}
module.exports= CLI