import "./EmployeeDirectory.css";
import departmentsData from "../../data/employees.json";
import type { Department } from "../../interfaces/Department";

function EmployeeDirectory() {
    const departments: Department[] = departmentsData;

    return (
        <main>
            {departments.map((department) => (
                <section key={department.name}>
                    <h2>{department.name}</h2>

                    <ul>
                        {department.employees.map((employee) => (
                            <li key={`${employee.firstName}-${employee.lastName}`}>
                                {employee.firstName} {employee.lastName}
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </main>
    );
}

export default EmployeeDirectory;