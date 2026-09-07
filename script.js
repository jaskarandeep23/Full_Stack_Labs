// Different array of employees to be displayed on the page 
const employees = [
    {
        firstName: "Zoë",
        lastName: "Robins",
        department: "Administration"
    },
    {
        firstName: "Madeleine",
        lastName: "Madden",
        department: "Administration"
    }
];

const populateEmployeeList = (mainNode, employees) => {

    const departmentSection = document.createElement("section");

    const departmentHeading = document.createElement("h2");
    departmentHeading.innerHTML = "Adminstration";

    departmentSection.appendChild(departmentHeading);

    const employeeList = document.createElement("ul");
    departmentSection.appendChild(employeeList);

     employees.forEach(employee => {
        const employeeLi = document.createElement("li");

        employeeLi.innerHTML = `${employee.firstName} ${employee.lastName}`;

        employeeList.appendChild(employeeLi);
    });
      
    mainNode.appendChild(departmentSection);
};

// Adding event listener when the DOM has loaded fully
document.addEventListener("DOMContentLoaded", () => {

    const mainNode = document.querySelector("main");

    populateEmployeeList(mainNode, employees);
});