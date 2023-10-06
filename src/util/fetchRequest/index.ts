/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorCodes, TypeErrors } from '@libraries/constants/error-codes';
import logger from '@util/logger';
import fetch, { RequestInit, Response } from 'node-fetch';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorBody = await response.text();

    /* throw new Error(`[ :: HTTP Error :: ] ${response.status}:> ${errorBody}`); */
    logger.error(`[ :: HTTP Error :: ] ${response.status}:> ${errorBody}`);

    throw {
      code      : ErrorCodes.RESPONSE_ERROR,
      tipoError : TypeErrors.BAD_REQUEST,
      message   : response.statusText || 'GENERAL ERROR IN THE REQUEST',
      status    : response.status,
    };
  }
  let jsonResponse: Promise<Response> | null;

  try {
    jsonResponse = await response.json();
  } catch (error) {
    jsonResponse = null;
  }
  const res = jsonResponse || {
    url        : response.url,
    status     : response.status,
    statusText : response.statusText,
  };
  logger.info(`[ :: HTTP Response :: ] -> ${JSON.stringify(res)}`);
  return res as T;
};

export const get = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(url, { method: 'get', ...options });
  return handleResponse<T>(response);
};

export const post = async <T>(
  url: string,
  body: any,
  headers?: any,
  options?: RequestInit,
): Promise<T> => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  const response = await fetch(url, {
    method  : 'post',
    body,
    headers : headers || defaultHeaders,
    ...options,
  });
  return handleResponse<T>(response);
};

export const put = async <T>(
  url: string,
  data: Record<string, unknown>,
  headers?: Record<string, string>,
): Promise<T> => {
  const response = await fetch(url, {
    method : 'put',
    headers,
    body   : JSON.stringify(data),
  });
  return handleResponse<T>(response);
};

export const remove = async <T>(
  url: string,
  headers?: Record<string, string>,
): Promise<T> => {
  const response = await fetch(url, {
    method: 'delete',
    headers,
  });
  return handleResponse<T>(response);
};
