'use server'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { apiRequest } from '@/app/actions/api'

const saveSession = async (token) => {
  if (!token) return

  const cookieStore = await cookies()
  cookieStore.set('NEXT_SID', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30 // 30 дней
  })
}

export const registerWithCredentialsAction = async (filterData) => {
  const data = await apiRequest('registration/', {
    method: 'POST',
    params: {
      data: JSON.stringify(filterData)
    },
    isRedirect: false
  })

  if (data?.token) {
    await saveSession(data.token)
  }

  return data
}

export const loginWithCredentialsAction = async (username, password) => {
  const data = await apiRequest('login/', {
    method: 'POST',
    params: { username, password },
    isRedirect: false
  })

  if (data?.token) {
    await saveSession(data.token)
  }

  return data
}

export const loginWithGoogleAction = async ({ email, name, picture }) => {
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
    await saveSession(data.token)
  }

  return data
}

export const logoutAction = async () => {
  const res = await apiRequest('logout/', {
    method: 'GET',
  })

  if (res?.code === '0' && !res?.id) {
    const cookieStore = await cookies()
    cookieStore.delete('NEXT_SID')
    return { success: true }
  }
}

export const getCachedUser = cache(async () => {
  return await apiRequest('authSession/', {
    method: 'GET',
    cache: 'no-cache'
  })
})
