'use client'

import { useSearchParams } from 'next/navigation'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import classNames from 'classnames'

import { ROUTES_USER } from '@/constant/config'

import Tabs from '@/modules/Tabs'

import style from './index.module.scss'

const DATA = [
  {
    key: 'deposit',
    url: 'deposit',
    value: 0
  },
  {
    key: 'withdrawal',
    url: 'withdrawal',
    value: 1
  },
]

const SectionAccountWallet = ({ user, children }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentTab = searchParams.get('tab') || DATA[0].url
  const pathSegments = pathname.split('/').filter(Boolean)
  const activeMethod = pathSegments[pathSegments.length - 1] || user?.payements?.[0]?.alias || 'voucher'

  const activeTab = DATA.find((t) => t.url === currentTab) || DATA[0]

  const handleTabChange = (tab) => {
    const selectedTabUrl = typeof tab === 'object' ? tab.url : tab
    router.push(`${ROUTES_USER.wallet.url}/${activeMethod}?tab=${selectedTabUrl}`)
  }

  return (
    <section className={style.block}>
      <div className={style.list}>
        {
          user?.payements.map((el, idx) =>
            <Link
              key={idx}
              href={`${ROUTES_USER.wallet.url}/${el.alias}/?tab=${DATA[0].url}`}
              className={
                classNames(
                  style.link,
                  pathSegments.includes(el.alias) && style.active
                )
              }
            >
              <p>{el.name}</p>
            </Link>
          )
        }
      </div>
      <div className={style.content}>
        <Tabs
          options={DATA}
          data={activeTab}
          action={handleTabChange}
        />
        <div className={style.container}>
          {children}
        </div>
      </div>
    </section>
  )
}

export default SectionAccountWallet
