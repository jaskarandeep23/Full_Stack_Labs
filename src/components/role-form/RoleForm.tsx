import { useState } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import { roleService } from "../../services/roleService";

interface RoleFormProps {
  onRoleAdded: () => void;
}

export default function RoleForm({ onRoleAdded }: RoleFormProps) {
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const role = useFormInput("");

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage("");

    const validFirstName = firstName.validate(
      roleService.validateFirstName
    );

    const validRole = role.validate(roleService.validateRole);

    if (!validFirstName || !validRole) {
      return;
    }

    const result = roleService.createRole({
      firstName: firstName.value,
      lastName: lastName.value,
      role: role.value,
    });

    if (!result.success) {
      firstName.setError(result.firstNameError);
      role.setError(result.roleError);
      return;
    }

    firstName.reset();
    lastName.reset();
    role.reset();

    setSuccessMessage("Role added successfully!");
    onRoleAdded();
  };

  return (
    <section className="role-form">
      <h3>Add New Role</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="roleFirstName">First Name:</label>
          <input
            id="roleFirstName"
            type="text"
            value={firstName.value}
            onChange={(event) => firstName.setValue(event.target.value)}
          />
          {firstName.error && <p className="error">{firstName.error}</p>}
        </div>

        <div>
          <label htmlFor="roleLastName">Last Name:</label>
          <input
            id="roleLastName"
            type="text"
            value={lastName.value}
            onChange={(event) => lastName.setValue(event.target.value)}
          />
          {lastName.error && <p className="error">{lastName.error}</p>}
        </div>

        <div>
          <label htmlFor="roleName">Role:</label>
          <input
            id="roleName"
            type="text"
            value={role.value}
            onChange={(event) => role.setValue(event.target.value)}
          />
          {role.error && <p className="error">{role.error}</p>}
        </div>

        <button type="submit">Add Role</button>
      </form>

      {successMessage && <p>{successMessage}</p>}
    </section>
  );
}
