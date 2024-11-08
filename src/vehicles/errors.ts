import { CustomError } from "../errors";

abstract class InvalidVehicleTypeError extends CustomError {
  statusCode = 422;
}

export class NonElectricVehicleError extends InvalidVehicleTypeError {
  constructor() {
    super("This operation only supports electric vehicles");
  }
}

export class NonFuelVehicleError extends InvalidVehicleTypeError {
  constructor() {
    super("This operation only supports fuel vehicles");
  }
}
