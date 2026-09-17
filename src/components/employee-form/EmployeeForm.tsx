import { useState } from "react";
import "./EmployeeForm.css";
import type { Department } from "../../interfaces/Department";
import type { Employee } from "../../interfaces/Employee";

interface Props {
    departments: Department[];
    onAddEmployee: (departmentName: string, employee: Employee) => void;
}

function EmployeeForm({ departments, onAddEmployee }: Props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [department, setDepartment] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        if (firstName.trim().length < 3) {
            setError("First name must be at least 3 characters.");
            return;
        }

        if (department === "") {
            setError("Please select a department.");
            return;
        }

        onAddEmployee(department, {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
        });

        setFirstName("");
        setLastName("");
        setDepartment("");
    }

    return (
        <section className="employee-form">
            <h2>Add Employee</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />

                <label htmlFor="department">Department</label>
                <select
                    id="department"
                    value={department}
                    onChange={(event) => setDepartment(event.target.value)}
                >
                    <option value="">Select Department</option>

                    {departments.map((department) => (
                        <option key={department.name} value={department.name}>
                            {department.name}
                        </option>
                    ))}
                </select>

                {error && <p className="error">{error}</p>}

                <button type="submit">Add Employee</button>
            </form>
        </section>
    );
}

export default EmployeeForm;