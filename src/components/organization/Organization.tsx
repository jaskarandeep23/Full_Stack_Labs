import "./Organization.css";
import rolesData from "../../data/roles.json";
import type { Role } from "../../interfaces/Role";

function Organization() {
    const roles: Role[] = rolesData;

    return (
        <main className="organization">
            <h2>Organization</h2>

            <div className="organization-list">
                {roles.map((role) => (
                    <div
                        className="organization-row"
                        key={`${role.firstName}-${role.lastName}`}
                    >
                        <span>
                            {role.firstName} {role.lastName}
                        </span>

                        <span>{role.role}</span>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Organization;