export interface Step1Inputs {
  login: string;
  password: string;
}

export interface Step2Inputs {
  name: string;
  surname: string;
}

export interface Step3Inputs {
  tel: string;
  email: string;
}

export interface RegInputs extends Step1Inputs, Step2Inputs, Step3Inputs {}

export interface AuthInputs {
  login: string;
  password: string;
}

export interface EmailInputs {
  email: string;
}

export interface PasswordsInputs {
  password: string;
  repeat: string;
}
