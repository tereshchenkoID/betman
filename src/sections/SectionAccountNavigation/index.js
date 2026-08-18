'use client'

import { useTranslations } from 'next-intl'
import { usePathname } from '@/i18n/routing'

import { NAVIGATION, ROUTES_USER } from '@/constant/config'

import Action from '@/components/Action'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const DATA = [
  ROUTES_USER.account,
  ROUTES_USER.profile,
  ROUTES_USER.history,
  ROUTES_USER.wallet,
  ROUTES_USER.bonuses,
  ROUTES_USER.promocode,
  NAVIGATION.invite_friends,
  ROUTES_USER.favourites
]

const SectionAccountNavigation = () => {
  const t = useTranslations()
  const pathname = usePathname()

  const isActiveLink = (url) => {
    if (!url) return false

    if (url === ROUTES_USER.account.url) {
      return pathname === url
    }

    return pathname === url || pathname.startsWith(`${url}/`)
  }

  return (
    <section className={style.block}>
      {
        DATA.map((el, idx) => {
          const isActive = isActiveLink(el.url)

          return (
            <Action
              key={idx}
              to={el.url}
              classes={[isActive ? 'primary' : 'secondary', 'md', style.link]}
              isActive={isActive}
            >
              <Icon name={el.icon} />
              <span>{t(el.text)}</span>
            </Action>
        )
      })}
    </section>
  )
}

export default SectionAccountNavigation
