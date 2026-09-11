'use client'

import {
  createContext,
  startTransition,
  useCallback,
  useContext, useEffect,
  useState
} from 'react'

import { useRouter } from '@/i18n/navigation'

import { logoutAction } from '@/app/actions/auth'

import { useWebSocket } from '@/hooks/useWebSocket'
import { consoleHelper } from '@/helpers/console'

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
    socket.send(JSON.stringify({ cmd: 'ping' }))
  }, [])

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

  useEffect(() => {
    if (user?.token) {
      sendWhenReady(JSON.stringify({ cmd: 'login', token: user.token }))
    }
  }, [sendWhenReady, user.token])

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
