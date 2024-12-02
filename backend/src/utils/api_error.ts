export class ApiError extends Error {
  public readonly status: number;
  public readonly details: string;

  constructor(status: number, message: string, details: string) {
    super();
    this.message = message;
    this.status = status;
    this.details = details;
  }
}

export class BadRequestError extends ApiError {
  constructor(details: string) {
    super(400, "Bad request", details);
  }
}
export class NotFoundError extends ApiError {
  constructor(details: string) {
    super(404, "Resource not found", details);
  }
}
export class InternalServerError extends ApiError {
  constructor(details: string) {
    super(500, "Internal server error", details);
  }
}
export class ValidationError extends ApiError {
  constructor(details: string) {
    super(422, "Validation error", details);
  }
}
export class UnhautorizedError extends ApiError {
  constructor(details: string) {
    super(401, "Unauthorized", details);
  }
}
export class ForbiddenError extends ApiError {
  constructor(details: string) {
    super(403, "Not allowed to access the resource", details);
  }
}
export class TooManyRequestsError extends ApiError {
  constructor(details: string) {
    super(429, "Too many requests in this timeframe", details);
  }
}

export function getErrorMessage(error:unknown):string{
    return error instanceof Error?error.message:String(error)
}

