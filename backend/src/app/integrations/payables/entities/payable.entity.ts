import { UUID } from 'crypto';
import { Payable } from 'src/interfaces';

export class PayableEntity implements Payable {
  id?: UUID;
  value: number;
  emissionDate: Date;
  assignorId: UUID;
}
