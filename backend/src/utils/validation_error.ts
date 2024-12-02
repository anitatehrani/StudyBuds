import { ValidationError } from "./api_error";

export type IndexSignature = { [key: string]: string };

export function validateString(map: IndexSignature, key: string): string {
  const result = map[key];
  if (result === undefined)
    throw new ValidationError(`Missing required field ${key}`);
  return result;
}

export function validateInt(map: IndexSignature, key: string): number {
  const elem = Number.parseInt(validateString(map, key));
  if (isNaN(elem)) throw new ValidationError(`Field ${key} is not an int`);
  return elem;
}

