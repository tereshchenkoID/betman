'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { NAVIGATION } from '@/constant/config'

import { useUser } from '@/hooks/useUser'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Logo from '@/modules/Logo'

import style from './index.module.scss'

const Section = ({
  settings,
  categories,
  providers,
  pages,
}) => {
  const t = useTranslations()
  const { isAuth } = useUser()

  // TODO Remove unoptimized

  return (
    <footer
      className={
        clsx(
          style.block,
          {
            [style.auth]: !isAuth
          }
        )
      }
    >
      <div className={style.container}>
        <div className={style.top}>
          <div>
            <h2 className={style.subtitle}>{t('section.categories')}</h2>
            <ul
              className={
                clsx(
                  style.list,
                  style.double
                )
              }
            >
              {
                categories?.data?.map((el, idx) =>
                  <li key={el?.id || idx}>
                    <Action
                      to={el.link || `${NAVIGATION.games_hall.url}/${el.slug}`}
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
            <ul
              className={
                clsx(
                  style.list,
                  style.double
                )
              }
            >
              {
                providers?.data?.map((el, idx) =>
                  <li key={el?.id || idx}>
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
            <div className={style.column}>
              <h2 className={style.subtitle}>{t('section.info')}</h2>
              <ul className={style.list}>
                {
                  pages?.data?.map((el, idx) =>
                    <li key={el?.id || idx}>
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
          <Logo />
          <div className={style.socials}>
            {
              settings?.social?.map((el, idx) =>
                <a
                  key={el?.icon || idx}
                  href={el.link}
                  className={style.social}
                  aria-label={el.link}
                  target={'_blank'}
                >
                  <Icon name={`misc-${el.icon}`} />
                </a>
              )
            }
          </div>
          <div>
            <p>{t('footer.legal_text_1')}</p>
            <p>{t('footer.legal_text_2')}</p>
          </div>
          <div className={style.payements}>
            <Image
              src="/images/18.svg"
              alt={'18+'}
              width={42}
              height={42}
              decoding="async"
              style={{ width: 42, height: 42 }}
              unoptimized
            />
            <Image
              src="/images/payements/visa.svg"
              alt={'Visa'}
              width={32}
              height={20}
              decoding="async"
              style={{ width: 32, height: 20 }}
              unoptimized
            />
            <Image
              src="/images/payements/mastercard.svg"
              alt={'Mastercard'}
              width={23}
              height={20}
              decoding="async"
              style={{ width: 23, height: 20 }}
              unoptimized
            />
            <Image
              src="/images/payements/crypto.svg"
              alt={'Crypto'}
              width={32}
              height={20}
              decoding="async"
              style={{ width: 32, height: 20 }}
              unoptimized
            />
          </div>
          <p className={style.copyright}>© {new Date().getFullYear()} - {t('name')}. {t('footer.legal_text_3')}</p>
          <Action
            onChange={() => document.body.scrollTo({ top: 0, left: 0 })}
            classes={['primary', 'md', 'square', style.up]}
            aria-label="Scroll to top"
          >
            <Icon name="navigation-chevron-up" />
          </Action>
        </div>
      </div>
    </footer>
  )
}

export default Section

