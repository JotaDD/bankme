import { UUID } from 'crypto';

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
  assignorId: UUID;
}
