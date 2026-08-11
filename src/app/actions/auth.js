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
    maxAge: 60 * 60 * 24 * 30 // 30 days
  })
}

export const registerWithCredentialsAction = async (filterData) => {
  const data = await apiRequest('registration/', {
    method: 'POST',
    params: {
      data: JSON.stringify(filterData)
    },
  })

  if (data?.token) {
    await saveSession(data.token)
  }

  return data
}

export const loginWithTelegramAction = async (telegramUser) => {
  const data = await apiRequest('telegraf/', {
    method: 'POST',
    params: {
      data: telegramUser
    },
  })

  alert(JSON.stringify(telegramUser))

  if (data?.token) {
    await saveSession(data?.token)
  }

  return data
}

export const loginWithCredentialsAction = async (username, password) => {
  const data = await apiRequest('login/', {
    method: 'POST',
    params: { username, password },
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
  })

  if (data?.token) {
    await saveSession(data.token)
  }

  return data
}

export const logoutAction = async () => {
  await apiRequest('logout/', { method: 'GET' }).catch(() => {})

  const cookieStore = await cookies()
  cookieStore.delete('NEXT_SID')
  return { success: true }
}

export const getCachedUser = cache(async () => {
  return await apiRequest('authSession/', {
    method: 'GET',
    cache: 'no-cache',
    next: { tags: ['user'] }
  })
})
