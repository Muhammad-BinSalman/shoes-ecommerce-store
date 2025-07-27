import clsx from 'clsx';

export function cn(...inputs: any[]) {
  return clsx(...inputs);
}

export function ensureStartsWith(str: string, start: string) {
  return str.startsWith(start) ? str : start + str;
}

export function createUrl(pathname: string, params: URLSearchParams) {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;
  return `${pathname}${queryString}`;
}

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export function validateEnvironmentVariables() {
  const requiredEnvVars = [
    'SHOPIFY_STORE_DOMAIN',
    'SHOPIFY_STOREFRONT_ACCESS_TOKEN',
    'NEXT_PUBLIC_BASE_URL'
  ];

  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    throw new Error(
      `The following environment variables are required but missing: ${missingEnvVars.join(', ')}`
    );
  }
}
