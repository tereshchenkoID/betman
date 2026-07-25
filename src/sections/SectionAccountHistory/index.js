'use client'

import { usePathname, useRouter } from 'next/navigation'

import { ROUTES_USER } from '@/constant/config'

import Tabs from '@/modules/Tabs'

const DATA = [
  {
    key: 'casino_history',
    url: 'casino',
    value: 0,
  },
  {
    key: 'wallet_history',
    url: 'wallet',
    value: 1,
  },
]

const SectionAccountHistory = () => {
  const pathname = usePathname()
  const router = useRouter()
  const active = DATA.find((item) => pathname.includes(item.url)) || DATA[0]

  const handleTabClick = (el) => {
    const targetUrl = `${ROUTES_USER.history.url}/${el.url}`
    router.push(targetUrl)
  }

  return (
    <section>
      <Tabs
        options={DATA}
        data={active}
        action={handleTabClick}
      />
    </section>
  )
}

export default SectionAccountHistory
