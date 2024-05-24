export type Assignor = {
  id?: string;
  document: string;
  email: string;
  phone: string;
  name: string;
};

export const assignors: Assignor[] = [
  {
    id: '8ed1fc1f-86e2-4179-9c01-07888e7fc036',
    document: '11122244488',
    email: 'john@email.com',
    phone: '18912341234',
    name: 'Johnny Test',
  },
  {
    id: '0f732e1a-e3fd-4da8-8087-40a83bef4f9e',
    document: '48657948645',
    email: 'susan@email.com',
    phone: '18912341234',
    name: 'Susan Test',
  },
  {
    id: '20a753a5-7a15-45ff-9543-0bb051285b67',
    document: '22222222222',
    email: 'mary@email.com',
    phone: '18912341234',
    name: 'Mary Test',
  },
];
