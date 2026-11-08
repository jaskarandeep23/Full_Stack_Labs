
import { useState } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import { roleService } from "../../services/roleService";

interface RoleFormProps {
  onRoleAdded: () => void | Promise<void>;
}

export default function RoleForm({ onRoleAdded }: RoleFormProps) {
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const role = useFormInput("");

  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setSuccessMessage("");

    const validFirstName = firstName.validate(
      roleService.validateFirstName
    );

    const validRole = role.validate(roleService.validateRole);

    if (!validFirstName || !validRole) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await roleService.createRole({
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        role: role.value.trim(),
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

      await onRoleAdded();
    } catch {
      role.setError("Unable to add role.");
    } finally {
      setIsSubmitting(false);
    }
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
          {firstName.error && (
            <p className="error">{firstName.error}</p>
          )}
        </div>

        <div>
          <label htmlFor="roleLastName">Last Name:</label>
          <input
            id="roleLastName"
            type="text"
            value={lastName.value}
            onChange={(event) => lastName.setValue(event.target.value)}
          />
          {lastName.error && (
            <p className="error">{lastName.error}</p>
          )}
        </div>

        <div>
          <label htmlFor="roleName">Role:</label>
          <input
            id="roleName"
            type="text"
            value={role.value}
            onChange={(event) => role.setValue(event.target.value)}
          />
          {role.error && (
            <p className="error">{role.error}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Role"}
        </button>
      </form>

      {successMessage && <p>{successMessage}</p>}
    </section>
  );
}
