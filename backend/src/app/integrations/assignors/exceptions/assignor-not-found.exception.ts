import { HttpException } from "@nestjs/common";

export class AssignorNotFoundException extends HttpException {
  constructor() {
    super('Cedente não encontrado!', 404);
  }
}