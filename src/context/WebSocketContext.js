'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { useRouter } from '@/i18n/routing'

import { useWebSocket } from '@/hooks/useWebSocket'
import { consoleHelper } from '@/helpers/console'

import { loginWithCredentialsAction, logoutAction } from '@/app/actions/auth'

const WebSocketContext = createContext(null)

export const WebSocketProvider = ({ children, user }) => {
  const router = useRouter()
  const [lastMessage, setLastMessage] = useState(null)

  const handleAutoLogin = async (username, password) => {
    try {
      const res = await loginWithCredentialsAction(username, password)
      if (res?.success) {
        router.refresh()
      }
    } catch (e) {
      consoleHelper.error('AutoLogin Failed')
    }
  }

  const handleLogout = async () => {
    await logoutAction()
    router.refresh()
  }

  const onOpen = useCallback((socket) => {
    if (user?.token) {
      socket.send(JSON.stringify({ cmd: 'login', token: user.token }))
    }
  }, [user])

  const onMessage = useCallback((message, socket) => {
    setLastMessage(message)
    const { cmd, data, topic } = message

    if (cmd === 'ping') {
      socket.send(JSON.stringify({ cmd: 'pong' }))
    }

    // if (cmd === 'logout') {
    //   handleLogout()
    // }
    //
    // if (cmd === 'autologin') {
    //   handleAutoLogin(data.login, data.password)
    // }
  }, [])

  const { socketRef, sendWhenReady } = useWebSocket({
    url: process.env.NEXT_PUBLIC_WSS_BASE_URL,
    onOpen,
    onMessage
  })

  return (
    <WebSocketContext.Provider value={{ socketRef, sendWhenReady, lastMessage }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext)
  if (!context) {
    consoleHelper.error('useWebSocketContext must be used within WebSocketProvider')
  }
  return context
}
