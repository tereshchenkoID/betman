'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { apiRequest } from '@/app/actions/api'

async function saveSession(token, userData) {
  const cookieStore = await cookies()
  const maxAge = 60 * 60 * 24 * 30 // 30 дней
  const isProd = process.env.NODE_ENV === 'production'

  if (token) {
    cookieStore.set('NEXT_SID', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: isProd,
      maxAge
    })
  }

  if (userData) {
    cookieStore.set('USER_INFO', JSON.stringify(userData), {
      path: '/',
      sameSite: 'lax',
      secure: isProd,
      maxAge
    })
  }
}

export async function loginWithCredentialsAction(username, password) {
  const data = await apiRequest('login/', {
    method: 'POST',
    params: { username, password },
    isRedirect: false
  })

  if (data?.token) {
    revalidatePath('/', 'layout')
  }

  return data
}

export async function loginWithGoogleAction({ email, name, picture }) {
  const data = await apiRequest('login/', {
    method: 'POST',
    params: {
      email,
      name,
      image: picture,
      provider: 'google',
      type: '1'
    },
    isRedirect: false
  })

  if (data?.token) {
    revalidatePath('/', 'layout')
  }

  return data
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('NEXT_SID')
  cookieStore.delete('USER_INFO')
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function getCachedUser() {
  const cookieStore = await cookies()
  const session = await apiRequest('authSession/', {
    method: 'GET',
    cache: 'no-cache'
  })

  if (session) {
    return session
  }

  const cached = cookieStore.get('USER_INFO')?.value

  if (cached) {
    try {
      return JSON.parse(cached)
    } catch {
      return null
    }
  }

  return null
}
