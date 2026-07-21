'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'


import {apiRequest} from "@/app/actions/api";

/**
 * Base helper to send auth data to the backend API.
 * @param {FormData} formData - Form data containing credentials or provider payload.
 * @returns {Promise<Object|null>} Backend JSON response or null on failure.
 */
const backendLogin = async (formData) => {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/login/`, {
      method: "POST",
      body: formData
    })

    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error("💥 Auth Backend API Error:", error)
    return null
  }
}

/**
 * Normalizes user data from different authentication streams (Credentials / Google)
 * into a single unified structure for frontend usage.
 * @param {Object} rawData - Fresh data from backend response or client payload.
 * @returns {Object} Unified user profile object.
 */
function normalizeUserData(rawData) {
  return {
    id: rawData.id || null,
    username: rawData.username || rawData.email || 'user',
    name: rawData.name || rawData.username || 'User',
    email: rawData.email || null,
    image: rawData.image || rawData.picture || null,
    userType: rawData.userType ?? null,
    account: rawData.account ? {
      balance: rawData.account.balance || '0.00',
      bonus: rawData.account.bonus || '0.00',
      currency: rawData.account.currency || { code: 'USD', text: 'US Dollar', symbol: '$' },
    } : null
  }
}

/**
 * Encapsulates session cookie storage logic.
 * Saves auth token securely and caches user profile details.
 * @param {string} token - The auth token received from the backend (SID).
 * @param {Object} userData - User profile details to cache for the frontend.
 */
async function saveSession(token, userData) {
  const cookieStore = await cookies()

  if (token) {
    cookieStore.set('NEXT_SID', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })
  }

  if (userData) {
    cookieStore.set('USER_INFO', JSON.stringify(userData), {
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })
  }
}

/**
 * Server Action: Traditional credentials login handler.
 * @param {string} username - User login/email.
 * @param {string} password - User password.
 * @returns {Promise<Object>} Success status or specific error message.
 */
export async function loginWithCredentialsAction(username, password) {
  try {
    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)

    const data = await backendLogin(formData)

    if (!data?.token) {
      return { success: false, error: 'Invalid username or password' }
    }

    const user = normalizeUserData(data)

    await saveSession(data.token, user)
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Internal server error during login' }
  }
}

/**
 * Server Action: Google OAuth login handler.
 * Processes payload decrypted from Google Identity SDK on the client.
 * @param {Object} payload - Decoded Google identity fields.
 * @returns {Promise<Object>} Success status or specific error message.
 */
export async function loginWithGoogleAction({ email, name, picture }) {
  try {
    const formData = new FormData()
    formData.append("email", email)
    formData.append("name", name)
    formData.append("image", picture)
    formData.append("provider", 'google')
    formData.append("type", '1')

    const data = await backendLogin(formData)

    if (!data?.token) {
      return { success: false, error: 'Backend failed to validate Google account' }
    }

    const user = normalizeUserData(data)

    await saveSession(data.token, user)
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Internal server error during Google login' }
  }
}

/**
 * Server Action: Signs out the current user by clearing all session cookies.
 * @returns {Promise<Object>} Success confirmation status.
 */
export async function logoutAction() {
  console.log("LOGOUT")
  const cookieStore = await cookies()
  cookieStore.delete('NEXT_SID')
  cookieStore.delete('USER_INFO')
  revalidatePath('/', 'layout')
  return { success: true }
}

/**
 * Utility: Retrieves and parses cached user data from cookies on the server.
 * Safeguards against broken or missing session tokens.
 * @returns {Promise<Object|null>} Deserialized user object or null if unauthenticated.
 */
// export async function getCachedUser() {
//   const { cookies } = await import('next/headers')
//   const cookieStore = await cookies()
//
//   const isAuth = cookieStore.has('NEXT_SID')
//   if (!isAuth) return null
//
//   const userCookie = cookieStore.get('USER_INFO')?.value
//   if (!userCookie) return null
//
//   try {
//     return JSON.parse(userCookie)
//   } catch {
//     return null
//   }
// }


export async function getCachedUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('NEXT_SID')?.value

  // 1. Делаем запрос к бэку.
  // apiRequest сам подхватит NEXT_SID из кук и передаст в Authorization.
  // Если юзер гость — бэк вернет гостевую структуру. Если залогинен — полную.
  const session = await apiRequest('authSession/', { method: 'GET' })

  if (session) {
    return session
  }

  // 2. Фоллбэк: если бэк лежит, отдаем то, что сохранено в USER_INFO
  const cached = cookieStore.get('USER_INFO')?.value
  // console.log(cached)

  if (cached) {
    try {
      return JSON.parse(cached)
    } catch {}
  }

  return null
}
