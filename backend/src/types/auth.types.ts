export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: {
      id: number;
      email: string;
      name: string;
      role: 'USER' | 'ADMIN';
      createdAt: string | Date;
    };
    token: string;
  };
}
