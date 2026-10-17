
import { useState } from "react";
import "./Organization.css";

import type { Role } from "../../interfaces/Role";
import { roleService } from "../../services/roleService";
import RoleForm from "../role-form/RoleForm";

function Organization() {
  const [roles, setRoles] = useState<Role[]>(() =>
    roleService.getRoles()
  );

  const loadRoles = () => {
    setRoles(roleService.getRoles());
  };

  return (
    <main className="organization">
      <h2>Organization</h2>

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
