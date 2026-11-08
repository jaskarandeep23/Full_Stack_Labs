import { useEffect, useState } from "react";
import "./Organization.css";

import type { Role } from "../../interfaces/Role";
import { roleService } from "../../services/roleService";
import RoleForm from "../role-form/RoleForm";

function Organization() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadRoles = async () => {
    try {
      const data = await roleService.getRoles();
      setRoles(data);
      setError("");
    } catch {
      setError("Unable to load roles from the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadRoles();
  }, []);

  return (
    <main className="organization">
      <h2>Organization</h2>

      {loading && <p>Loading roles...</p>}

      {error && <p className="error">{error}</p>}

      <div className="organization-list">
        {roles.map((person) => (
          <div
            className="organization-row"
            key={person.role}
          >
            <span>
              {person.firstName} {person.lastName}
            </span>

            <span>{person.role}</span>
          </div>
        ))}
      </div>

      <RoleForm onRoleAdded={loadRoles} />
    </main>
  );
}

export default Organization;
