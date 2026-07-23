'use client'

import { useTranslations } from 'next-intl'
import { usePathname } from '@/i18n/routing'
import Link from 'next/link'
import classNames from 'classnames'

import { NAVIGATION } from '@/constant/config'

import Icon from '@/components/Icon'

import style from './index.module.scss'

const isActive = (current, link) => {
  if (link === NAVIGATION.home.url) {
    return current === link
  }
  return current.startsWith(link)
}

const Aside = ({
  settings,
  wheels,
  quests
}) => {
  const t = useTranslations()
  const pathname = usePathname()
  const { wheelsCounter } = wheels
  const { questsCounter } = quests

  const DATA = [
    NAVIGATION.home,
    settings.modules?.wheel === '1' && {
      ...NAVIGATION.wheels_of_fortune,
      badge: wheelsCounter || false
    },
    NAVIGATION.jackpots,
    NAVIGATION.tournament,
    settings.modules?.quest === '1' && {
      ...NAVIGATION.quests,
      badge: questsCounter || false
    },
    NAVIGATION.promotions
  ].filter(Boolean);

  return (
    <aside className={style.block}>
      <div className={style.scroll}>
        <menu className={style.menu}>
          {
            DATA.map((el, idx) =>
              <Link
                key={idx}
                href={el.url}
                aria-label={t(el.text)}
                className={
                  classNames(
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
            )
          }
        </menu>
      </div>
    </aside>
  )
}

export default Aside
