import { HttpException } from "@nestjs/common";

export class PayableNotFoundException extends HttpException {
  constructor() {
    super('Recebível não encontrado!', 404);
  }
}