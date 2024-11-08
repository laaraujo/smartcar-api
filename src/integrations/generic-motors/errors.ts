import { CustomError } from "../../errors";

export class GMError extends CustomError {
  statusCode: number;

  constructor(status: string, reason: string) {
    super(reason);
    this.statusCode = parseInt(status);
  }
}
