'use client'

import { useEffect, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { Link, usePathname, useRouter } from '@/i18n/navigation'

import { ROUTES_USER } from '@/constant/config'

import useModal from '@/hooks/useModal'
import { useUser } from '@/hooks/useUser'

import Loader from '@/components/Loader'
import Notification from '@/modules/Notification'
import Tabs from '@/modules/Tabs'

import style from './index.module.scss'

const DATA = [
  { key: 'deposit', value: 0 },
  { key: 'withdrawal', value: 1 },
]

const SectionAccountWallet = ({ children }) => {
  const t = useTranslations()
  const pathname = usePathname()
  const router = useRouter()
  const { level, payements } = useUser()
  const { openModal } = useModal()
  const [isPending, startTransition] = useTransition()

  const pathSegments = pathname.split('/').filter(Boolean)

  const currentTabKey = pathSegments[pathSegments.length - 1]
  const currentMethodKey = pathSegments[pathSegments.length - 2]

  const method = payements?.find(p => p.alias === currentMethodKey)?.alias || payements?.[0]?.alias
  const active = DATA.find((t) => t.key === currentTabKey) || DATA[0]

  const handleActive = (el) => {
    startTransition(() => {
      router.push(`${ROUTES_USER.wallet.url}/${method}/${el.key}`, { scroll: false })
    })
  }

  const handleMethod= (e, el) => {
    e.preventDefault()
    startTransition(() => {
      router.push(`${ROUTES_USER.wallet.url}/${el.alias}/${DATA[0].key}`, { scroll: false })
    })
  }

  useEffect(() => {
    if (level !== '3') {
      openModal('verify', { }, { title: t('verification') })
    }
  }, [level, openModal, t])

  return (
    <>
      <section className={style.list}>
        {
          payements.map((el, idx) =>
            <Link
              key={el?.id || idx}
              onClick={(e) => handleMethod(e, el)}
              className={
                clsx(
                  style.link,
                  pathSegments.includes(el.alias) && style.active
                )
              }
            >
              <p>{el.name}</p>
            </Link>
          )
        }
      </section>
      {
        level !== '3' &&
        <section>
          <Notification
            text={t('notification.verification_text')}
            type={'error'}
          />
        </section>
      }
      <section>
        <Tabs
          options={DATA}
          data={active}
          action={handleActive}
        />
      </section>
      <section className={style.section}>
        {
          isPending
            ?
              <Loader />
            :
              children
        }
      </section>
    </>
  )
}

export default SectionAccountWallet
