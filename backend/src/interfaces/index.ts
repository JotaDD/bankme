
export interface Assignor {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
}

export interface Payable {
  id?: string;
  value: number;
  emissionDate: Date;
  assignorId: string;
}

export interface User {
  id?: string;
  login: string;
  password: string;
}
