export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface UserResponseData {
  status: string;
  data: {
    user: User;
  };
}
