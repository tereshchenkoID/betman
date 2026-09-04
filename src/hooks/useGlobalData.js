'use client'

import {
  startTransition, useEffect, useRef, useState 
} from 'react'

import { eventBus } from '@/utils/eventBus'

export function useGlobalData(eventName, initialData, customMerger) {
  const [data, setData] = useState(initialData)

  const mergerRef = useRef(customMerger)
  useEffect(() => {
    mergerRef.current = customMerger
  }, [customMerger])

  useEffect(() => {
    if (initialData !== undefined) {
      startTransition(() => {
        setData(initialData)
      })
    }
  }, [initialData])

  useEffect(() => {
    return eventBus.subscribe(eventName, (incomingData) => {
      setData((prev) => {
        if (typeof mergerRef.current === 'function') {
          return mergerRef.current(prev, incomingData)
        }

        if (typeof incomingData !== 'object' || incomingData === null || Array.isArray(incomingData)) {
          return incomingData
        }

        if (typeof prev !== 'object' || prev === null || Array.isArray(prev)) {
          return { ...incomingData }
        }

        const nextState = { ...prev }

        for (const key of Object.keys(incomingData)) {
          const prevVal = prev[key]
          const incVal = incomingData[key]

          if (
            typeof incVal === 'object' &&
            incVal !== null &&
            !Array.isArray(incVal) &&
            typeof prevVal === 'object' &&
            prevVal !== null &&
            !Array.isArray(prevVal)
          ) {
            nextState[key] = { ...prevVal, ...incVal }
          } else {
            nextState[key] = incVal
          }
        }

        return nextState
      })
    })
  }, [eventName])

  return [data, setData]
}
