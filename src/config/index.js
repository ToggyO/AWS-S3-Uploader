import { Configuration } from './Configuration';

const config = new Configuration().envVars;
const isProduction = config.NODE_ENV === 'production';
const isDevelopment = config.NODE_ENV === 'development';

export { config, isDevelopment, isProduction };
