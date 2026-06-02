export interface RegistrationFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  country: string;
  agree: boolean;
}

export interface RegistrationFormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  age?: string;
  country?: string;
  agree?: string;
}
