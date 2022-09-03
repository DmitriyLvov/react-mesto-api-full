import { useState } from 'react';

export function useForm(inputValues) {
  const [formValues, setFormValues] = useState(inputValues);

  const handleChangeInput = (event) => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return { formValues, setFormValues, handleChangeInput };
}
