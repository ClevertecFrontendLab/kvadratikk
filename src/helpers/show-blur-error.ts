import { FieldErrors, UseFormWatch } from 'react-hook-form';

import { Inputs } from '../interfaces/inputs';

export const showBlurError = (
  field: keyof FieldErrors<Inputs>,
  changeErrorState: React.Dispatch<React.SetStateAction<boolean>>,
  errors: FieldErrors<Inputs>,
  watch: UseFormWatch<Inputs>
) => {
  if (errors[field] || !watch(field as keyof Inputs)) changeErrorState(true);
  else changeErrorState(false);
};
