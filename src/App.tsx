import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import EmployeeDirectory from "./components/employee-directory/EmployeeDirectory";
import EmployeeForm from "./components/employee-form/EmployeeForm";
import Organization from "./components/organization/Organization";
import departmentsData from "./data/employees.json";
import type { Department } from "./interfaces/Department";
import type { Employee } from "./interfaces/Employee";

function App() {
    const [departments, setDepartments] = useState<Department[]>(departmentsData);

    function addEmployee(departmentName: string, employee: Employee) {
        setDepartments(
            departments.map((department) =>
                department.name === departmentName
                    ? {
                        ...department,
                        employees: [...department.employees, employee],
                    }
                    : department
            )
        );
    }

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={<Navigate to="/employees" replace />}
                />

                <Route
                    path="employees"
                    element={
                        <>
                            <EmployeeDirectory departments={departments} />
                            <EmployeeForm
                                departments={departments}
                                onAddEmployee={addEmployee}
                            />
                        </>
                    }
                />

                <Route
                    path="organization"
                    element={<Organization />}
                />
            </Route>
        </Routes>
    );
}

export default App;