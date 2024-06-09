interface Field {
  value: string;
  isValid: boolean;
}

interface BaseAuthForm {
  isValid: boolean;
  email: Field;
  password: Field;
}

export interface SignUpForm extends BaseAuthForm {}
export interface SignIpForm extends BaseAuthForm {}
