'use client'

import { useContext } from 'react'
import { useStore } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

import { UserStoreContext } from '@/context/UserContext'

export const useUserStore = (selector) => {
  const store = useContext(UserStoreContext)

  if (!store) {
    throw new Error('Error User store')
  }

  return useStore(store, selector)
}

const userSelector = (state) => {
  const user = state.user

  return {
    user,
    isAuth: Boolean(user?.id),
    country: user?.country ?? null,
    credits: user?.credits ?? null,
    currency: user?.currency ?? null,
    id: user?.id ?? null,
    invite: user?.invite ?? null,
    language: user?.language ?? null,
    level: user?.level ?? null,
    payements: user?.payements ?? null,
    profile: user?.profile ?? null,
    session: user?.session_type,
    username: user?.username ?? '',
  }
}

export const useUser = () => {
  return useUserStore(useShallow(userSelector))
}
