import { useState } from "react";
import Header from "./components/header/Header";
import EmployeeDirectory from "./components/employee-directory/EmployeeDirectory";
import EmployeeForm from "./components/employee-form/EmployeeForm";
import Footer from "./components/footer/Footer";
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
        <>
            <Header />
            <EmployeeDirectory departments={departments} />

            <EmployeeForm
                departments={departments}
                onAddEmployee={addEmployee}
            />

            <Footer />
        </>
    );
}

export default App;