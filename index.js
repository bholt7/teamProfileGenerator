const {prompt} = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Employee = require('./lib/Employee');
const fs = require('fs');
const { info } = require('console');

const managerPrompt = [
    {
        message: "What is your Managers name ?",
        name: "managerName",
        type: "input"
    },
    {
        message: "What is your Managers id ?",
        name: "id",
        type: "input"
    },
    {
        message: "What is your Managers email ?",
        name: "email",
        type: "input"
    },
    {
        message: "What is your Managers office number ?",
        name: "officeNumber",
        type: "input"
    },
]

const employeePrompt = [
    {
        message: "What is the role of the employee you want to add ?",
        name: "role",
        type: "list",
        choices: ["Engineer", "Intern"]
    },
    {
        message: (answers)=>`What is the ${answers.role} name ?`,
        name: "name"
    },
    { 
         message: (answers)=>`What is the ${answers.role} id ?`,
         name: "id"
    },
    {
        message: (answers)=>`What is the ${answers.role} email ?`,
        name: "email"
    },
    {
        message: (answers)=> {
            if(answers.role === "Engineer") {
                return "What is the Engineers github link ?"
            } else {
                return "What school did the intern graduate from ?"

            }
        },
        name: "info",
    }

]

const employees = []

function addEmployee () {
    prompt([
        {
            message: "Would you like to add a new employee ?",
            name: "choice",
            type: "list",
            choices: ["Yes", "No"]
        }
    ])
    .then(data => {
        console.log("You've chosen --- ", data.choice);

        if(data.choice === "Yes") {
            prompt(employeePrompt)
            .then(data => {
                console.log("answers for employee ---", data);
                if(data.role === "Engineer") {
                    const emp = new Engineer(data.name, data.id, data.email, data.info);
                    employees.push(emp);
                } else{
                    const emp = new Intern(data.name, data.id, data.email, data.info);
                    employees.push(emp);
                }

                console.log(`${data.role} has been added to the team`);
                setTimeout(addEmployee, 2000);
            })
        } else {
        createHtml ()
        }
    })
}

function createHtml() {
    console.log("Generating HTML");
    console.log("Employees added --- ", employees);

    const generateHtml = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Generator</title>
</head>
<style>
    * {
        margin: 0;
        padding: 0;
    }
    body {
        background: rgb(112, 4, 4);
    }
    h1 {
        background: linear-gradient(goldenrod, rgb(112, 4, 4));
        border: 1rem solid rgb(51, 51, 51);
        border-radius: 3px;
        color: rgb(112, 4, 4);
        text-align: center;
        height: 100px;
        padding-top: 50px;
    }

    .container {
        padding: 6em 12em;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .card {
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
        width: 15rem;
        height: fit-content;
        border-radius: 5px;
    }

    .card .top {
        background: linear-gradient(green, blue );
        height: 4.25rem;
        padding: 1em;
        border-radius: 5px 5px 0 0;
        color: white;
    }
    .top :first-child {
        font-size: 30px;
    }

    .top :nth-child(2) {
        font-size: 25px;
    }

    .bottom {
        padding: 3em;
        height: fit-content;
        background: darkblue;
        border-radius: 0 0 5px 5px;
    }

    .bottom ul {
        list-style: none;
    }

    .bottom ul li {
        width: 100%;
        background: white;
        border: 1px solid white;
        padding: 10px 0px;
    }


</style>
<body>
    <h1>Team Generator</h1>
    <div class="container">
      ${employees.map(employee => employee.renderHtmlCard(employee.officeNumber || employee.github || employee.school)).join("\n")}
    </div>
</body>
</html>`

fs.writeFileSync("./dist/generated.html", generateHtml);
console.log("Successful")
}

function init() {
    prompt(managerPrompt).then((data) => {
        console.log(data)

        const manager = new Manager(data.managerName, data.id, data.email, data.officeNumber);
         employees.push(manager);

         addEmployee();

    })
}

init();

