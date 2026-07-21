// 'use server';
//
// import { cookies } from 'next/headers'
// /**
//  * Universal Server-Side API Request Wrapper.
//  * Automatically handles query parameters for GET requests and converts objects
//  * into FormData for POST/PUT/PATCH requests as expected by the backend API.
//  * * @param {string} endpoint - The target API endpoint (e.g., 'cars/list/').
//  * @param {Object} [config] - Request configuration options.
//  * @param {string} [config.method='GET'] - HTTP method (GET, POST, PUT, PATCH, DELETE).
//  * @param {Object} [config.params={}] - Payload data or query parameters.
//  * @returns {Promise<Object|null>} Parsed JSON response, success object, or null on failure.
//  */
//
// export const apiRequest = async (endpoint, {
//   method = 'GET',
//   params = {}
// } = {}) => {
//   const url = new URL(`${process.env.API_BASE_URL}/${endpoint}`);
//   const cookieStore = await cookies();
//   const token = cookieStore.get('NEXT_SID')?.value;
//
//   const options = {
//     method,
//     cache: 'no-cache',
//     headers: {}
//   };
//
//   if (token) {
//     options.headers['Authorization'] = `Bearer ${token}`;
//   }
//
//   if (method === 'GET' && Object.keys(params).length > 0) {
//     Object.entries(params).forEach(([key, value]) => {
//       if (value !== undefined && value !== null) {
//         url.searchParams.append(key, value);
//       }
//     });
//   }
//
//   if (['POST', 'PUT', 'PATCH'].includes(method) && Object.keys(params).length > 0) {
//     const formData = new FormData();
//
//     Object.entries(params)
//
//     Object.entries(params).forEach(([key, value]) => {
//       if (value !== undefined && value !== null) {
//         formData.append(key, value);
//       }
//     });
//
//     options.body = formData;
//   }
//
//   try {
//     const res = await fetch(url.toString(), options);
//
//     if (res.status === 204) return { success: true };
//
//     const json = await res.json();
//
//     console.log(json)
//
//     if (!res.ok) {
//       console.error(`❌ ${method} ${url.pathname} failed: ${res.status}`, json);
//       return null;
//     }
//
//     return json;
//   } catch (error) {
//     console.error(`💥 API Error [${method}] ${endpoint}:`, error);
//     return null;
//   }
// };


'use server';

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getLocale } from 'next-intl/server'

import {logoutAction} from "@/app/actions/auth";
import {routing} from "@/i18n/routing";

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
} = {}) => {
  const url = new URL(`${process.env.API_BASE_URL}/${endpoint}`);
  const cookieStore = await cookies();
  const token = cookieStore.get('NEXT_SID')?.value;
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';

  const options = {
    method,
    cache: 'no-cache',
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

      redirect('/?logout=true');
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
