const mysql2= require('mysql2')
class Query {
    constructor(host, user, password, database){
        this.host='localhost' || host;
        this.user= 'root'|| user;
        this.password= 'rootr00t!'|| password;
        this.database= 'employee_db'|| database;
        
    }
    connect(){
        this.db = mysql2.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        },
        
        console.log(`You are connected to ${this.database}`))
    }
// VIEW ALL from Tables with Joins etc.
    selectDept(){
        return this.db.promise().query('SELECT name AS Department from department');
          
    }
    selectRoles(){
        return this.db.promise().query(`SELECT roles.id AS "Role ID", roles.title AS Title, department.name AS Department, roles.salary AS Salary FROM roles JOIN department ON roles.department_id = department.id ORDER BY roles.id;`)    
    }
    selectEmployee(){
        return this.db.promise().query('SELECT employee.id AS "Employee ID", employee.first_name AS First, employee.last_name AS Last, roles.title AS Title, department.name AS Department, roles.salary AS Salary,CONCAT (mgmt.first_name, " ", mgmt.last_name) AS Manager FROM employee LEFT OUTER JOIN employee mgmt ON mgmt.id = employee.manager_id JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id ORDER BY employee.id;');
    }
    // Add information to TABLES
    addDept(name){
        return this.db.promise().query (`INSERT INTO department (name) VALUES ("${name}");`);
    }
    addRole(title, salary, department_id){
        return this.db.promise().query(`INSERT INTO roles (title, salary, department_id)
        VALUES( '${title}', ${salary}, ${department_id});`);
    }
    addEmployee(first_name, last_name, role_id, manager_id){
        return this.db.promise().query(`INSERT INTO employee ( first_name, last_name, role_id, manager_id)
        VALUES('${first_name}' , '${last_name}' , ${role_id}, ${manager_id})`)
    }
    // UPDATE TABLES
    updateEmployee(){}
    updateRole(){}

    // return lists for inquirer Q's
    listDept(){
        return this.db.promise().query(`SELECT name AS name, id AS value FROM Department;`)
    }
    listRoles(){
        return this.db.promise().query(`SELECT title AS name, id AS value FROM roles;`)
    }
    listManagers(){
        return this.db.promise().query(`SELECT CONCAT (employee.first_name, " ", employee.last_name) AS name, employee.id as value FROM employee WHERE manager_id IS NULL`)
    }

    //  extra's below
    updateEmployeeManager() {}
    viewEmpXMan(){}
    viewEpmXDept(){}
    deleteDept(){}
    deletRole(){}
    deleteEmployee(){}
    viewBudget(){}
  
    

}
module.exports= Query