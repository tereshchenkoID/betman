'use client'

import { useTranslations } from 'next-intl'
import classNames from 'classnames'

import { NAVIGATION } from '@/constant/config'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Logo from '@/modules/Logo'

import style from './index.module.scss'

const Footer = ({
  user,
  settings,
  categories,
  providers,
  pages,
}) => {
  const t = useTranslations()

  return (
    <footer
      className={
        classNames(
          style.block,
          !user?.id && style.auth
        )
      }
    >
      <div className={style.container}>
        <div className={style.top}>
          <div>
            <h2 className={style.subtitle}>{t('section.categories')}</h2>
            <ul className={style.list}>
              {
                categories?.data?.map((el, idx) =>
                  <li key={idx}>
                    <Action
                      to={`${NAVIGATION.games_hall.url}/${el.slug}`}
                      classes={['link', style.link]}
                      placeholder={el.title}
                    />
                  </li>
                )
              }
            </ul>
          </div>
          <div>
            <h2 className={style.subtitle}>{t('section.providers')}</h2>
            <ul className={style.list}>
              {
                providers?.data?.map((el, idx) =>
                  <li key={idx}>
                    <Action
                      to={`${NAVIGATION.games_hall.url}/${el.slug}`}
                      classes={['link', style.link]}
                      placeholder={el.title}
                    />
                  </li>
                )
              }
            </ul>
          </div>
          {
            pages &&
            <div>
              <h2 className={style.subtitle}>{t('section.info')}</h2>
              <ul className={style.list}>
                {
                  pages?.data.map((el, idx) =>
                    <li key={idx}>
                      <Action
                        to={el.url}
                        classes={['link', style.link]}
                        placeholder={el.title}
                        target={el.newtab === '1' ? '_blank' : undefined}
                      />
                    </li>
                  )
                }
              </ul>
            </div>
          }
        </div>
        <hr className={style.divider} />
        <div className={style.bottom}>
          <Logo settings={settings} />
          <div className={style.socials}>
            {
              settings.social.map((el, idx) =>
                <a
                  key={idx}
                  href={el.link}
                  className={style.social}
                  aria-label={el.link}
                >
                  <Icon name={`icon-misc-${el.icon}`} />
                </a>
              )
            }
          </div>
          <div className={style.info}>
            <p>{t('footer.legal_text_1')}</p>
            <p>{t('footer.legal_text_2')}</p>
          </div>
          <p className={style.copyright}>© {new Date().getFullYear()} - {t('name')}. {t('footer.legal_text_3')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

