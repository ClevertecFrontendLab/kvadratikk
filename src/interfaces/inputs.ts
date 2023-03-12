export interface RegInputs {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface AuthInputs {
  identifier: string;
  password: string;
}

export interface EmailInputs {
  email: string;
}

export interface PasswordsInputs {
  password: string;
  passwordConfirmation: string;
}
