'use server'

import { cookies, headers } from 'next/headers'

import { redirect } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

import { checkRateLimit } from '@/app/lib/rateLimit'

const PROTECTED_PREFIXES = ['user/', 'profile/']
const MUTATING_METHODS = ['POST', 'PUT', 'PATCH']
const BODY_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE']
const QUERY_METHODS = ['GET', 'DELETE']
const DEFAULT_RATE_LIMIT = { max: 30, windowMs: 60_000 }

const getClientIp = (headersList) => {
  const forwarded = headersList.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  return headersList.get('x-real-ip') || null
}

const buildQueryUrl = (url, params) => {
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value))
    }
  })

  return url
}

const buildFormData = (params) => {
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

  return formData
}

const applyRateLimit = (endpoint, clientIp) => {
  const { allowed, resetAt } = checkRateLimit(`${endpoint}:${clientIp || 'unknown'}`, DEFAULT_RATE_LIMIT)

  if (allowed) return null

  return {
    code: '3',
    error_message: `Too many attempts. Try again in ${Math.ceil((resetAt - Date.now()) / 1000)} sec.`,
  }
}

export const apiRequest = async (endpoint, {
  method = 'GET',
  params = {},
  // cache = 'no-store',
  // next = {},
  timeout = 15000,
} = {}) => {
  const cookieStore = await cookies()
  const headersList = await headers()

  const token = cookieStore.get('NEXT_SID')?.value
  const locale = headersList.get('x-next-locale') || cookieStore.get('NEXT_LOCALE')?.value || routing.defaultLocale
  const ip = getClientIp(headersList)

  if (MUTATING_METHODS.includes(method)) {
    const rateLimitError = applyRateLimit(endpoint, ip)
    if (rateLimitError) return rateLimitError
  }

  const isProtected = PROTECTED_PREFIXES.some((prefix) => endpoint.startsWith(prefix))
  if (isProtected && !token) return null

  let url = new URL(`${process.env.API_BASE_URL}/${endpoint}`)

  const options = {
    method,
    cache: 'no-store',
    next: { revalidate: 0 },
    // cache,
    // next,
    headers: {
      'Accept-Language': locale,
      ...(ip && { 'X-Forwarded-For': ip, 'X-Real-IP': ip }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    signal: AbortSignal.timeout(timeout),
  }

  const hasParams = Object.keys(params).length > 0

  if (QUERY_METHODS.includes(method) && hasParams) {
    url = buildQueryUrl(url, params)
  }

  if (BODY_METHODS.includes(method) && hasParams && method !== 'DELETE') {
    options.body = buildFormData(params)
  }

  try {
    const res = await fetch(url.toString(), options)
    const json = await res.json()

    if (json?.code === '2' || json?.code === '4') {
      redirect({
        pathname: {
          href: '/',
          query: { expired: '1' }
        },
        locale,
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
