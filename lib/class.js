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


    selectDept(){
        return this.db.promise().query('SELECT * FROM department;');
          
    }
    selectRoles(){
        return this.db.promise().query('SELECT * FROM roles;');
    }
    selectEmployee(){
        return this.db.promise().query('SELECT * FROM employee;');
    }
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
    listDept(){
        return this.db.promise().query(`SELECT name AS name, id AS value FROM Department`)
    }
    updateRole(){}
    updateEmployee(){}
    updateEmployeeManager() {}
    viewEmpXMan(){}
    viewEpmXDept(){}
    deleteDept(){}
    deletRole(){}
    deleteEmployee(){}
    viewBudget(){}
    // not required or bonus
    updateDept(){}
    

}
module.exports= Query