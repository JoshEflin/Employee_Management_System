const inquirer = require('inquirer')
const questions = require('./questions.js')
const mysql = require('mysql2/promise');
const table = require('console.table')
const Query = require('./class')

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
                    })
            break;
            
            case 'add a department':
                db.addDept()
                    .then((data) =>
                    console.table(data[0]));
                    this.run();
                
            break;
            case 'add a department':
                
    
            break;
            case 'add a role':
                
    
            break;
            case 'add an employee':
                
    
            break;
            case 'update an employee role':
                
            break;
    
    
    
        }return
    })

}}
module.exports= CLI