// array of departments and employees to be displayed on the page
const departments = [
    {
        name: "Administration",
        employees: [
            { firstName: "Zoë", lastName: "Robins" },
            { firstName: "Madeleine", lastName: "Madden" }
        ]
    },
    {
        name: "Audit",
        employees: [
            { firstName: "Josha", lastName: "Sadowski" },
            { firstName: "Kate", lastName: "Fleetwood" }
        ]
    },
    {
        name: "Banking Operations",
        employees: [
            { firstName: "Priyanka", lastName: "Bose" },
            { firstName: "Hammed", lastName: "Animashaun" },
            { firstName: "Álvaro", lastName: "Morte" },
            { firstName: "Taylor", lastName: "Napier" },
            { firstName: "Alan", lastName: "Simmonds" }
        ]
    },
    {
        name: "Communications",
        employees: [
            { firstName: "Gil", lastName: "Cardinal" },
            { firstName: "Richard", lastName: "J. Lewis" }
        ]
    },
    {
        name: "Corporate Services",
        employees: [
            { firstName: "Randy", lastName: "Bradshaw" },
            { firstName: "Tracey", lastName: "Cook" },
            { firstName: "Lubomir", lastName: "Mykytiuk" }
        ]
    },
    {
        name: "Facilities",
        employees: [
            { firstName: "Dakota", lastName: "House" },
            { firstName: "Lori", lastName: "Lea Okemah" },
            { firstName: "Renae", lastName: "Morrisseau" },
            { firstName: "Rick", lastName: "Belcourt" }
        ]
    },
    {
        name: "Financial Services",
        employees: [
            { firstName: "Selina", lastName: "Hanusa" },
            { firstName: "Buffy", lastName: "Gaudry" },
            { firstName: "Shaneen", lastName: "Ann Fox" },
            { firstName: "Allan", lastName: "Little" },
            { firstName: "Danny", lastName: "Rabbit" }
        ]
    },
    {
        name: "Human Resources",
        employees: [
            { firstName: "Jesse", lastName: "Ed Azure" },
            { firstName: "Stacy", lastName: "Da Silva" },
            { firstName: "Vladimír", lastName: "Valenta" },
            { firstName: "Samone", lastName: "Sayeses-Whitney" },
            { firstName: "Paul", lastName: "Coeur" }
        ]
    },
    {
        name: "Information Technology",
        employees: [
            { firstName: "Graham", lastName: "Greene" },
            { firstName: "Sandika", lastName: "Evergreen" },
            { firstName: "Jennifer", lastName: "Rodriguez" }
        ]
    },
    {
        name: "IT Technician",
        employees: [
            { firstName: "Aiyana", lastName: "Littlebear" },
            { firstName: "Inara", lastName: "Thunderbird" },
            { firstName: "Kaya", lastName: "Runningbrook" },
            { firstName: "Elara", lastName: "Firehawk" },
            { firstName: "Siona", lastName: "Moonflower" },
            { firstName: "Kaiyu", lastName: "Greywolf" },
            { firstName: "Ayawamat", lastName: "Nightwind" },
            { firstName: "Tala", lastName: "Braveheart" },
            { firstName: "Iniko", lastName: "Stonebear" },
            { firstName: "Onatah", lastName: "Redhawk" }
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