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
