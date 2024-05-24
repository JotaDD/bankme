import { assignors } from './assignors.seed';
import { Payable } from 'src/types';

export const payables: Payable[] = [
  {
    value: 100.55,
    emissionDate: new Date(),
    assignorId: assignors[0].id,
  },
  {
    value: 555.55,
    emissionDate: new Date(),
    assignorId: assignors[0].id,
  },
  {
    value: 78977.55,
    emissionDate: new Date(),
    assignorId: assignors[1].id,
  },
  {
    value: 123.55,
    emissionDate: new Date(),
    assignorId: assignors[2].id,
  },
  {
    value: 789.55,
    emissionDate: new Date(),
    assignorId: assignors[1].id,
  },
  {
    value: 99.55,
    emissionDate: new Date(),
    assignorId: assignors[1].id,
  },
];
