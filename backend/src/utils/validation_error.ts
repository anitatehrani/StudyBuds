import { CustomError } from "./custom_error";

export class ValidationError extends CustomError {
    constructor(message = 'Validation error') {
        super(message, 404);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}