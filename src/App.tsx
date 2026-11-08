import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import type { Department } from "./interfaces/Department";
import { employeeService } from "./services/employeeService";

import Layout from "./components/layout/Layout";
import EmployeeDirectory from "./components/employee-directory/EmployeeDirectory";
import EmployeeForm from "./components/employee-form/EmployeeForm";
import Organization from "./components/organization/Organization";

function App() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState("");

  const loadDepartments = async () => {
    try {
      const data = await employeeService.getDepartments();
      setDepartments(data);
      setError("");
    } catch {
      setError("Unable to load employees from the backend.");
    }
  };

  useEffect(() => {
    void loadDepartments();
  }, []);

  return (
    <>
      {error && <p className="error">{error}</p>}

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<EmployeeDirectory departments={departments} />}
          />

          <Route
            path="add-employee"
            element={
              <EmployeeForm
                departments={departments}
                onEmployeeAdded={loadDepartments}
              />
            }
          />

          <Route
            path="organization"
            element={<Organization />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
