'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { routing } from '@/i18n/routing'

const PROTECTED = ['user/', 'profile/'];

export const apiRequest = async (endpoint, {
  method = 'GET',
  params = {},
  cache = 'no-cache',
  next = {},
  isRedirect = false,
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
    },
    next
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
      if (isRedirect) {
        redirect('/?logout=true');
      }
    }

    return json;
  } catch (error) {
    return { code: '3', error_message: 'Internal server error'};
  }
};
