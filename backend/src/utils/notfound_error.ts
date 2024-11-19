import { CustomError } from "./custom_error";

export class NotFoundError extends CustomError {
    constructor(message = 'Resource not found') {
        super(message, 404);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}