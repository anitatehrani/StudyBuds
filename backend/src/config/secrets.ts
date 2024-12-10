import { getEnvironmentVariable } from "../utils/config_error";

export const JWT_SECRET = getEnvironmentVariable("JWT_SECRET");
export const FB_PKEY = getEnvironmentVariable("FB_PKEY");
