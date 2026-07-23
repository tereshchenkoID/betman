'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { routing } from '@/i18n/routing'

import {logoutAction} from "@/app/actions/auth";

/**
 * Universal Server-Side API Request Wrapper.
 * Automatically fetches the 'NEXT_SID' cookie, builds FormData for POST/PUT/PATCH,
 * and handles session expiration based on the backend idle timeout.
 * @param {string} endpoint - The target API endpoint (e.g., 'user/favorites/').
 * @param {Object} [config] - Request configuration options.
 * @param {string} [config.method='GET'] - HTTP method (GET, POST, PUT, PATCH, DELETE).
 * @param {Object} [config.params={}] - Payload data or query parameters (flat object).
 * @returns {Promise<Object|null>} Parsed JSON response, success object, or null on failure.
 */
const PROTECTED = ['user/', 'profile/'];

export const apiRequest = async (endpoint, {
  method = 'GET',
  params = {},
  cache = 'no-cache',
  next = {},
  isRedirect = true,
} = {}) => {
  const url = new URL(`${process.env.API_BASE_URL}/${endpoint}`)
  const cookieStore = await cookies()
  const token = cookieStore.get('NEXT_SID')?.value
  const headersList = await headers()
  let locale = headersList.get('x-next-locale') || cookieStore.get('NEXT_LOCALE')?.value || routing.defaultLocale

  const options = {
    method,
    cache,
    headers: {
      'Accept-Language': locale,
    }
  };

  const isProtected = PROTECTED.some(prefix => endpoint.startsWith(prefix))

  if (isProtected && !token) {
    return null;
  }

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (method === 'GET' && Object.keys(params).length > 0) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });
  }

  if (['POST', 'PUT', 'PATCH'].includes(method) && Object.keys(params).length > 0) {
    const formData = new FormData();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    options.body = formData;
  }

  try {
    const res = await fetch(url.toString(), options);
    const json = await res.json();

    if (json?.code === '2') {
      // const cookieStore = await cookies()
      // cookieStore.delete('NEXT_SID')
      // cookieStore.delete('USER_INFO')

      if (isRedirect) {
        redirect('/?logout=true');
      }
    }

    if (!res.ok) {
      console.error(`❌ ${method} ${url.pathname} failed: ${res.status}`, json);
      return null;
    }

    return json;
  } catch (error) {
    if (error.message === 'NEXT_REDIRECT' || error.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }

    console.error(`API Error [${method}] ${endpoint}:`, error);
    return null;
  }
};
