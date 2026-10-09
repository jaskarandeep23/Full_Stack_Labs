import "./EmployeeDirectory.css";
import type { Department } from "../../interfaces/Department";

interface Props {
    departments: Department[];
}

function EmployeeDirectory({ departments }: Props) {
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