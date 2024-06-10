interface Field {
  value: string;
  isValid: boolean;
  showError: boolean;
}

interface Error {
  message: string;
  field?: string;
}

interface BaseAuthForm {
  isValid: boolean;
  email: Field;
  password: Field;
  errors: Error[];
}

export interface SignUpForm extends BaseAuthForm {}
export interface SignInForm extends BaseAuthForm {}
