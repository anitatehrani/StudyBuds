import axios from "axios";
import { getEnvironmentVariable } from "../utils/config_error";

export const TOKEN = getEnvironmentVariable("UNIGE_TOKEN");
export const UNIGEAPI_URL = getEnvironmentVariable("UNIGEAPI_URL");

export const axios_instance = axios.create({
  validateStatus: (status) => status === 200,
});
