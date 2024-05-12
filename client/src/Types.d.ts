export interface Blog {
  _id?: string;
  heading?: string;
  author?: string;
  description?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "super-admin";
}
export interface EditProfileForm extends Partial<User> {
  password: string;
  confirmPassword: string;
}
export interface Credentials {
  name?: string;
  email: string;
  password: string;
}