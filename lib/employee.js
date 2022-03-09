class Employee {
    constructor (name, id, email, role = "Employee") {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;

    }
    getName () {
        return this.name
    }
    getId () {
        return this.id
    }
    getEmail () {
        return this.email
    }

    getRole() {
        return this.role
    }

    generateHtmlCard (info) {
        return`  <div class="card">
        <div class="top">
            <div>${this.name}</div>
            <div>${this.role}</div>
        </div>
        <div class="bottom">
            <ul>
            <li>ID: ${this.id}</li>
            <li>Email: ${this.email}</li>
            ${this.role === "Manager" ? 
            `<li>Office Number: ${info}</li>` : 
            this.role === "Engineer" ? 
            `<li>Github Account: ${info}</li>` : 
            `<li>School Name: ${info}</li>`
    }
            </ul>
        </div>
    </div>
    `
    }
}
module.exports = Employee;