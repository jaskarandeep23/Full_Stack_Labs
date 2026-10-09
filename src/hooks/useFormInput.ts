import { useState } from "react";

export function useFormInput(initialValue: string = "") {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const validate = (validationFunction: (value: string) => string) => {
    const message = validationFunction(value);

    setError(message);

    return message === "";
  };

  const reset = () => {
    setValue(initialValue);
    setError("");
  };

  return {
    value,
    setValue,
    error,
    setError,
    validate,
    reset,
  };
}
