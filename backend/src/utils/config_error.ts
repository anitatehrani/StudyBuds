export class ConfigError extends Error {
    public environmentVariable: string;

    constructor(message: string, environmentVariable: string) {
        super(message);
        this.environmentVariable = environmentVariable;
        Object.setPrototypeOf(this, ConfigError.prototype);
    }
}
