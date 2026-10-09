'use client'

import { createContext, useState } from 'react'

import { createUserStore } from '@/store/user'

export const UserStoreContext = createContext(null)

export const UserStoreProvider = ({ children, user }) => {
  const [store] = useState(() => createUserStore({ user }))

  alert(JSON.stringify(user))

  return (
    <UserStoreContext.Provider value={store}>
      {children}
    </UserStoreContext.Provider>
  )
}
