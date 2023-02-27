const getEnvVar = (key) => {
  console.log(process.env);
  console.log(process.env[key]);
  if (process.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return process.env[key] || "";
};

export const API_URL = getEnvVar("REACT_APP_BASE_URL");
export const API_URL_SITE = getEnvVar("REACT_APP_SITE_URL");
