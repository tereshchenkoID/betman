'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useTransition } from 'react'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import classNames from 'classnames'

import {ROUTES_USER, USER_VERIFY} from '@/constant/config'

import { useModal } from '@/context/ModalContext'

import Loader from '@/components/Loader'
import Tabs from '@/modules/Tabs'

import style from './index.module.scss'
import Notification from "@/modules/Notification";

const DATA = [
  {
    key: 'deposit',
    value: 0
  },
  {
    key: 'withdrawal',
    value: 1
  },
]

const SectionAccountWallet = ({ user, children }) => {
  const t = useTranslations()
  const pathname = usePathname()
  const router = useRouter()
  const { openModal } = useModal()
  const [isPending, startTransition] = useTransition()

  const pathSegments = pathname.split('/').filter(Boolean)

  const currentTabKey = pathSegments[pathSegments.length - 1]
  const currentMethodKey = pathSegments[pathSegments.length - 2]

  const method = user?.payements?.find(p => p.alias === currentMethodKey)?.alias || user?.payements?.[0]?.alias
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
    if (user?.level !== '3') {
      openModal('verify', { user }, { title: t('verification') })
    }
  }, [])

  return (
    <>
      <section className={style.list}>
        {
          user?.payements.map((el, idx) =>
            <Link
              key={idx}
              onClick={(e) => handleMethod(e, el)}
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
      </section>
      {
        user?.level !== '3' &&
        <section>
          <Notification
            text={'Verification text'}
            type={user?.level !== '3' ? 'error' : 'success'}
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
