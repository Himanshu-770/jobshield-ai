export interface SignInFields {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpFields {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}