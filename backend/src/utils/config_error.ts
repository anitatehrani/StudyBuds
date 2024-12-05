export class ConfigError extends Error {
  public environmentVariable: string;

  constructor(message: string, environmentVariable: string) {
    super(message);
    this.environmentVariable = environmentVariable;
  }
}

export function getEnvironmentVariable(name: string): string {
  const result = process.env[name];
  if (result === undefined) throw new ConfigError("Environment variable not found",name);
  return result;
}
