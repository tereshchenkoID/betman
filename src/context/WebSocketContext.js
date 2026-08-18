'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  startTransition
} from 'react'
import { useRouter } from '@/i18n/routing'

import { useWebSocket } from '@/hooks/useWebSocket'
import { consoleHelper } from '@/helpers/console'

import { logoutAction } from '@/app/actions/auth'

const WebSocketContext = createContext(null)

export const WebSocketProvider = ({ children, user }) => {
  const router = useRouter()
  const [lastMessage, setLastMessage] = useState(null)

  const handleLogout = useCallback(() => {
    startTransition(async () => {
      await logoutAction()
      router.refresh()
    })
  }, [router])

  const onOpen = useCallback((socket) => {
    if (user?.token) {
      socket.send(JSON.stringify({ cmd: 'login', token: user.token }))
    }
  }, [user])

  const onMessage = useCallback((message, socket) => {
    setLastMessage(message)
    const { cmd } = message

    if (cmd === 'ping') {
      socket.send(JSON.stringify({ cmd: 'pong' }))
    }

    if (cmd === 'logout') {
      handleLogout()
    }
  }, [handleLogout])

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
