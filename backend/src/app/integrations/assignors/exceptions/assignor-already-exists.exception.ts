import { HttpException } from "@nestjs/common";

export class AssignorAlreadyExistsException extends HttpException {
  constructor() {
    super('Cedente já cadastrado!', 400);
  }
}

