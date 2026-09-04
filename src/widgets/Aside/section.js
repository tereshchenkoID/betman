'use client'

import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { Link, usePathname } from '@/i18n/navigation'

import { NAVIGATION, ROUTES_USER } from '@/constant/config'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const isActive = (current, link) => {
  if (link === NAVIGATION.home.url) {
    return current === link
  }
  return current.startsWith(link)
}

const Section = ({
  user,
  settings,
  wheels,
  quests,
  bonuses
}) => {
  const t = useTranslations()
  const pathname = usePathname()
  const { wheelsCounter } = wheels
  const { questsCounter } = quests

  const DATA = [
    NAVIGATION.home,
    user?.id && {
      ...ROUTES_USER.bonuses,
      badge: bonuses?.data || false
    },
    settings.modules?.wheel === '1' && {
      ...NAVIGATION.wheels_of_fortune,
      badge: wheelsCounter || false
    },
    settings.modules?.quest === '1' && {
      ...NAVIGATION.quests,
      badge: questsCounter || false
    },
    settings.modules?.jackpots === '1' && NAVIGATION.jackpots,
    settings.modules?.tournament === '1' && NAVIGATION.tournament,
    NAVIGATION.promotions,
  ].filter(Boolean)

  return (
    <aside className={style.block}>
      <div className={style.scroll}>
        <menu className={style.menu}>
          {
            DATA.map((el, idx) =>
              <li
                key={el?.icon || idx}
                className={style.item}
              >
                <Link
                  href={el.url}
                  aria-label={t(el.text)}
                  className={
                    clsx(
                      style.link,
                      {
                        [style.active]: isActive(pathname, el.url)
                      }
                    )
                  }
                >
                  <Icon name={el.icon} />
                  {t(el.text)}
                  {
                    el.badge &&
                    <span className={style.badge}>{el.badge}</span>
                  }
                </Link>
              </li>
            )
          }
        </menu>
      </div>
    </aside>
  )
}

export default Section
