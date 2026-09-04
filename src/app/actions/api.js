'use server'

import { cookies, headers } from 'next/headers'

import { redirect } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const PROTECTED = ['user/', 'profile/']

const getClientIp = (headersList) => {
  const forwarded = headersList.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  return headersList.get('x-real-ip') || null
}

export const apiRequest = async (endpoint, {
  method = 'GET',
  params = {},
  // cache = 'no-store',
  // next = {},
  timeout = 15000,
} = {}) => {
  const url = new URL(`${process.env.API_BASE_URL}/${endpoint}`)
  const cookieStore = await cookies()
  const token = cookieStore.get('NEXT_SID')?.value
  const headersList = await headers()
  let locale = headersList.get('x-next-locale') || cookieStore.get('NEXT_LOCALE')?.value || routing.defaultLocale
  const clientIp = getClientIp(headersList)

  const options = {
    method,
    cache: 'no-store',
    next: { revalidate: 0 },
    // cache,
    headers: {
      'Accept-Language': locale,
      ...(clientIp && { 'X-Forwarded-For': clientIp, 'X-Real-IP': clientIp }),
    },
    // next,
    signal: AbortSignal.timeout(timeout),
  }

  const isProtected = PROTECTED.some(prefix => endpoint.startsWith(prefix))

  if (isProtected && !token) {
    return null
  }

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`
  }

  if (['GET', 'DELETE'].includes(method) && Object.keys(params).length > 0) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value))
      }
    })
  }

  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) && Object.keys(params).length > 0) {
    const formData = new FormData()

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return

      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value)
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value))
      } else {
        formData.append(key, value)
      }
    })

    if (method !== 'DELETE') {
      options.body = formData
    }
  }

  try {
    const res = await fetch(url.toString(), options)
    const json = await res.json()

    if (json?.code === '2' || json?.code === '4') {
      redirect({
        href: '/',
        locale,
        query: { expired: '1' }
      })
    }

    return json
  } catch (error) {
    if (error?.message === 'NEXT_REDIRECT' || error?.digest?.startsWith('NEXT_REDIRECT')) {
      throw error
    }

    if (error.name === 'TimeoutError') {
      return { code: '3', error_message: 'Request timeout' }
    }

    return { code: '3', error_message: 'Internal server error' }
  }
}
