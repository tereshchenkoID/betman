'use client'

import { useState, useEffect } from 'react'

export const useSlideCount = (elementRef, defaultCount = 7) => {
  const [slideCount, setSlideCount] = useState(defaultCount)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const updateCount = () => {
      const computedValue = getComputedStyle(element)
        .getPropertyValue('--slide-count')
        .trim()

      if (computedValue) {
        const parsed = parseInt(computedValue, 10)
        if (!isNaN(parsed)) {
          setSlideCount(parsed)
        }
      }
    }

    updateCount()

    const observer = new ResizeObserver(updateCount)
    observer.observe(element)

    return () => observer.disconnect()
  }, [elementRef])

  return slideCount
}
