const inquirer = require('inquirer')
const questions = require('./questions.js')
const mysql = require('mysql2/promise');
const table = require('console.table')
const Query = require('./class')
function userResponse(answers){
    const db = new Query()
    db.connect()
    // const db = mysql.createConnection(
    //     {host:'localhost',
    //     user: 'root',
    //     password: 'rootr00t!',
    //     database: 'employee_db'},
    //     console.log('sucessfully connected to mySql')
    // )
    // write a case switch here instead
    switch(answers.options){
        case 'view all departments':
            
            db.selectDept()
            // db.query('SELECT * FROM department', function(err,results){
            //     console.error(err)
            //     console.table(results)
            //     db.end()
            // })
        break;
        
        case 'view all roles':
            
        break;
        
        case 'add a department':
            db.end()
            
        break;
        case 'add a department':
            db.end()

        break;
        case 'add a role':
            db.end()

        break;
        case 'add an employee':
            db.end()

        break;
        case 'update an employee role':
            db.end()
        break;



    }return
}
class CLI{
    constructor(){}
    run(){
        return inquirer.prompt(questions)
        .then((answers)=>{
            
        userResponse(answers)
        })
    }
}
module.exports= CLI