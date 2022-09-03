import { useState, useCallback } from 'react';

export function useFormAndValidation(defaultValues, defaultIsValid) {
  const [formValues, setFormValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(defaultIsValid);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}) => {
      setFormValues(defaultValues);
      setErrors(newErrors);
      setIsValid(defaultIsValid);
    },
    [setFormValues, setErrors, setIsValid]
  );

  return {
    formValues,
    setFormValues,
    handleChangeInput,
    errors,
    isValid,
    resetForm,
    setIsValid,
  };
}
