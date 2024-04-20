export interface EditUserRequest {
  password?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string | null;
}

export interface UserResponse {
  id: number;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    companyName?: string;
  };
}
