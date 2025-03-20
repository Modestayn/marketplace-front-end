export type UpdateProfileData = {
  name: string;
  email: string;
};

export type UpdatePasswordData = {
  current_password: string;
  password: string;
  password_confirmation: string;
};
