import { UUID } from 'crypto';

export interface Assignor {
  id: UUID;
  document: string;
  email: string;
  phone: string;
  name: string;
}

export interface Payable {
  id?: string;
  value: number;
  emissionDate: Date;
  assignorId: UUID;
}

export interface User {
  id?: string;
  login: string;
  password: string;
}
