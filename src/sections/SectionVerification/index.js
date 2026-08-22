'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import classNames from 'classnames'

import { ROUTES_USER, USER_VERIFY } from '@/constant/config'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Title from '@/modules/Title'
import Notification from '@/modules/Notification'

import style from './index.module.scss'

const LEVELS = [
  {
    level: '1',
    title: '1 level',
    text: 'Verify tour basic details to unlock real money play and bonuses',
    button: {
      url: `${ROUTES_USER.profile.url}/profile`,
      text: 'Verify Level 1'
    },
    list: [
      {
        icon: 'icon-commerce-wallet',
        text: 'Make deposit'
      },
      {
        icon: 'icon-games-slot',
        text: 'Play for real'
      },
      {
        icon: 'icon-commerce-bonus',
        text: 'Bonuses & rewards'
      },
      {
        icon: 'icon-sports-futsal',
        text: 'Sports Betting'
      }
    ]
  },
  {
    level: '2',
    title: '2 level',
    text: 'Verify tour identify to unlock withdrawal and higher limit',
    button: {
      url: `${ROUTES_USER.profile.url}/verification`,
      text: 'Verify Level 2'
    },
    list: [
      {
        icon: 'icon-commerce-wallet',
        text: 'Withdrawal funds'
      },
      {
        icon: 'icon-games-slot',
        text: 'Higher Limits'
      },
      {
        icon: 'icon-commerce-bonus',
        text: 'More Payment Methods'
      },
      {
        icon: 'icon-sports-futsal',
        text: 'Full Account Security'
      }
    ]
  },
  {
    level: '3',
    title: '3 level',
    text: 'Verified',
    button: null,
    list: [
      {
        icon: 'icon-commerce-wallet',
        text: 'Withdrawal funds'
      },
      {
        icon: 'icon-games-slot',
        text: 'Higher Limits'
      },
      {
        icon: 'icon-commerce-bonus',
        text: 'More Payment Methods'
      },
      {
        icon: 'icon-sports-futsal',
        text: 'Full Account Security'
      }
    ]
  }
]

const SectionVerification = ({ user }) => {
  const t = useTranslations()

  const level = user?.level
  const isFully = level >= 3

  const levels = LEVELS.filter((item) =>
    isFully ? item.level === '3' : item.level !== '3'
  )

  const renderBadge = (value) => {
    const cardLevel = value

    if (cardLevel === '2' && level === '2') {
      return (
        <div
          className={
            classNames(
              style.badge,
              style[`badge-${user?.profile?.isVerify}`]
            )
          }
        >
          <p>{t(`verify_status.${USER_VERIFY[user?.profile?.isVerify]}`)}</p>
        </div>
      )
    }

    if (level < cardLevel) {
      return (
        <div className={style.badge}>
          <Icon name="icon-toggle-lock" size="sm" />
          <p>Locked</p>
        </div>
      )
    }

    if (level > cardLevel) {
      return (
        <div className={style.badge}>
          <p>Complete</p>
        </div>
      )
    }

    return (
      <div className={style.badge}>
        <p>Not verified</p>
      </div>
    )
  }

  return (
    <section className={style.block}>
      <div>
        <Title title={t('section.verification')} />
        <p>Complete verifications to unlock all features</p>
      </div>

      <div className={style.levels}>
        {
          levels.map((el) => {
            const cardLevel = el.level
            const isLocked = level < cardLevel
            const isPassed = level > cardLevel

            return (
              <article
                key={el.level}
                className={
                  classNames(
                    style.level,
                    cardLevel === level && style.active
                  )
                }
              >
                <div className={style.header}>
                  <div className={style.badge}>Level {cardLevel}</div>
                  {
                    !isFully &&
                    renderBadge(cardLevel)
                  }
                </div>

                {/*{*/}
                {/*  (cardLevel === '2' && level === '2') &&*/}
                {/*  <Notification*/}
                {/*    text={t(`verify_status.${USER_VERIFY[user?.profile?.isVerify]}`)}*/}
                {/*    type={user?.profile?.isVerify < 3 ? 'error' : 'success'}*/}
                {/*    classes={style.status}*/}
                {/*  />*/}
                {/*}*/}

                <h2>{el.title}</h2>
                <p>{el.text}</p>

                <ul className={style.list}>
                  {
                    el.list.map((item, idx) =>
                      <li
                        key={idx}
                        className={style.item}
                      >
                        <span className={style.icon}>
                          <Icon name={item.icon} />
                        </span>
                        <p>{item.text}</p>
                      </li>
                    )
                  }
                </ul>

                <div className={style.footer}>
                  {
                    isPassed
                      ?
                        <Notification
                          text="Verified"
                          type="success"
                          classes={style.status}
                        />
                      :
                        el.button &&
                          <Action
                            to={el.button.url}
                            classes={['primary', 'wide', 'md']}
                            isDisabled={isLocked}
                          >
                            {
                              isLocked &&
                              <Icon name="icon-toggle-lock" />
                            }
                            <span>{el.button.text}</span>
                          </Action>
                  }
                </div>
              </article>
            )
          })
        }
      </div>

      {/* pages/why-verified */}
      <Link
        href={'./'}
        className={style.info}
      >
        <Icon
          name={'icon-status-info'}
          size={'xl'}
        />
        <p>
          <span>Why verify</span>
          <span>Verification helps us keep your account secure, prevent fraud and comply with regulations</span>
        </p>
        <Icon
          name={'icon-navigation-chevron-right'}
          size={'lg'}
        />
      </Link>
    </section>
  )
}

export default SectionVerification
