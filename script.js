// array of departments and employees to be displayed on the page
const departments = [
    {
        name: "Administration",
        employees: [
            {
                firstName: "Zoë",
                lastName: "Robins"
            },
            {
                firstName: "Madeleine",
                lastName: "Madden"
            }
        ]
    }
];


// function to display departments and employees
const populateEmployeeList = (mainNode, departments) => {

    // iterate over departments array
    departments.forEach(department => {

        // create department section
        const departmentSection = document.createElement("section");

        // create department heading
        const departmentHeading = document.createElement("h2");

        // add department name to heading
        departmentHeading.innerHTML = department.name;

        // append heading to department section
        departmentSection.appendChild(departmentHeading);

        // create employee list
        const employeeList = document.createElement("ul");

        // iterate over employees in the department
        department.employees.forEach(employee => {

            // create new list item
            const employeeLi = document.createElement("li");

            // add employee name to list item
            employeeLi.innerHTML = `${employee.firstName} ${employee.lastName}`;

            // append employee to list
            employeeList.appendChild(employeeLi);
        });

        // append employee list to department section
        departmentSection.appendChild(employeeList);

        // append department section to main
        mainNode.appendChild(departmentSection);
    });
};


// add event listener when the DOM has loaded fully
document.addEventListener("DOMContentLoaded", () => {

    // store the DOM node referencing the main element
    const mainNode = document.querySelector("main");

    // populate the employee directory
    populateEmployeeList(mainNode, departments);

    // store the DOM node referencing the current year
    const currentYearNode = document.querySelector("#current-year");

    // insert the current year into the footer
    currentYearNode.innerHTML = new Date().getFullYear();
});