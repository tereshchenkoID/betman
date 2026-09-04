'use client'

import { useEffect } from 'react'

import { usePathname } from '@/i18n/navigation'

const ScrollToTop = () => {
  const pathname = usePathname()

  useEffect(() => {
    document.body.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [pathname])

  return null
}

export default ScrollToTop
