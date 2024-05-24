import { Assignor } from 'src/interfaces';

export class AssignorEntity implements Assignor {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
}
