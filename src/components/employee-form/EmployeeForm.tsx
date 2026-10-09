import { useState } from "react";
import type { Department } from "../../interfaces/Department";
import { useFormInput } from "../../hooks/useFormInput";
import { employeeService } from "../../services/employeeService";
import "./EmployeeForm.css";

interface EmployeeFormProps {
  departments: Department[];
  onEmployeeAdded: () => void;
}

export default function EmployeeForm({
  departments,
  onEmployeeAdded,
}: EmployeeFormProps) {
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const department = useFormInput("");

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");

    const validFirstName = firstName.validate(
      employeeService.validateFirstName
    );

    const validDepartment = department.validate(
      employeeService.validateDepartment
    );

    if (!validFirstName || !validDepartment) {
      return;
    }

    const result = employeeService.createEmployee(department.value, {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
    });

    if (!result.success) {
      firstName.setError(result.firstNameError);
      department.setError(result.departmentError);
      return;
    }

    setSuccessMessage("Employee added successfully!");

    firstName.reset();
    lastName.reset();
    department.reset();

    onEmployeeAdded();
  };

  return (
    <div className="employee-form">
      <h2>Add New Employee</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            value={firstName.value}
            onChange={(event) => firstName.setValue(event.target.value)}
          />
          {firstName.error && <p>{firstName.error}</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            value={lastName.value}
            onChange={(event) => lastName.setValue(event.target.value)}
          />
          {lastName.error && <p>{lastName.error}</p>}
        </div>

        <div>
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            value={department.value}
            onChange={(event) => department.setValue(event.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          {department.error && <p>{department.error}</p>}
        </div>

        <button type="submit">Add Employee</button>
      </form>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}
