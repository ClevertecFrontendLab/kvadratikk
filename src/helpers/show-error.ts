import { FieldErrors, UseFormWatch } from 'react-hook-form';

import { Inputs } from '../interfaces/inputs';

export const showError = (
  errors: FieldErrors<Inputs>,
  watch: UseFormWatch<Inputs>,
  field: keyof Inputs,
  fieldErrors: object,
  isBlur: boolean
) => {
  const type = errors[field]?.type as keyof typeof fieldErrors;
  const fieldError = fieldErrors[type];

  if (isBlur) {
    if (!watch(field)) return fieldErrors['required' as keyof typeof fieldErrors];
    if (type === 'required') return fieldError;

    return fieldErrors['blur' as keyof typeof fieldErrors];
  }

  return fieldError ? fieldError : fieldErrors['default' as keyof typeof fieldErrors];
};
