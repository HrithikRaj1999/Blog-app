export interface Blog {
  _id?: string;
  heading?: string;
  author?: string;
  description?: string;
  createdBy?: string;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}
export interface EditProfileForm extends Partial<User> {
  password: string;
  confirmPassword: string;
}
