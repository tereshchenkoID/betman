'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { ROUTES_USER } from '@/constant/config'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Title from '@/modules/Title'

import style from './index.module.scss'

const LEVELS = [
  {
    level: '1',
    title: '1 level',
    text: 'Verify your basic details to unlock real money play and bonuses',
    button: {
      url: `${ROUTES_USER.profile.url}/profile`,
      text: 'Verify Level 1'
    },
    list: [
      { icon: 'commerce-wallet', text: 'Make deposit' },
      { icon: 'games-slot', text: 'Play for real' },
      { icon: 'commerce-bonus', text: 'Bonuses & rewards' },
      { icon: 'sports-futsal', text: 'Sports Betting' }
    ]
  },
  {
    level: '2',
    title: '2 level',
    text: 'Verify your identity to unlock withdrawal and higher limits',
    disabled: 'Complete Level 1 to unlock',
    button: {
      url: `${ROUTES_USER.profile.url}/verification`,
      text: 'Verify Level 2'
    },
    list: [
      { icon: 'commerce-wallet', text: 'Withdrawal funds' },
      { icon: 'games-slot', text: 'Higher Limits' },
      { icon: 'commerce-bonus', text: 'More Payment Methods' },
      { icon: 'sports-futsal', text: 'Full Account Security' }
    ]
  },
  {
    level: '3',
    title: '3 level',
    text: 'Complete advanced verification for maximum trust and unlimited access',
    disabled: 'Complete Level 2 to unlock',
    button: null,
    list: [
      { icon: 'commerce-wallet', text: 'Withdrawal funds' },
      { icon: 'games-slot', text: 'Higher Limits' },
      { icon: 'commerce-bonus', text: 'More Payment Methods' },
      { icon: 'sports-futsal', text: 'Full Account Security' }
    ]
  }
]

const SectionVerification = ({ user }) => {
  const t = useTranslations()
  const level = user?.level || '1'

  const getStatusText = (isPassed, isActive, isLocked) => {
    if (isPassed) return 'Verified'
    if (isActive) return 'Not Verified'
    if (isLocked) return 'Locked'
    return ''
  }

  const renderIcon = (cardLevel, isPassed, isLocked) => {
    if (cardLevel === '2' && level === '2') {
      return <Icon name="status-info" size="sm" />
    }
    if (isLocked) return <Icon name="toggle-lock" size="sm" />
    if (isPassed) return <Icon name="status-checkmark" size="sm" />
    return cardLevel
  }

  const renderBadgeIcon = (cardLevel, isPassed, isLocked, isActive) => {
    if (isActive) return <Icon name="status-info" size="sm" />
    if (isLocked) return <Icon name="toggle-lock" size="sm" />
    return <Icon name="status-checkmark" size="sm" />
  }

  return (
    <section className={style.block}>
      <div>
        <Title title={t('section.verification')} />
        <p>Complete verifications to unlock all features</p>
      </div>

      <div className={style.wrapper}>
        <div className={style.levels}>
          {
            LEVELS.map((el) => {
            const cardLevel = el.level
            const isLocked = level < cardLevel
            const isPassed = level > cardLevel
            const isActive = level === cardLevel
            const showStatus = level < '3' || cardLevel !== '3'

            return (
              <article
                key={cardLevel}
                className={clsx(
                  style.level,
                  style[`level-${cardLevel}`],
                  isPassed && style.passed,
                  isActive && style.active
                )}
              >
                <div className={style.circle}>
                  <span>{renderIcon(cardLevel, isPassed, isLocked, isActive)}</span>
                </div>

                <div className={style.header}>
                  <h2>{el.title}</h2>
                  {
                    showStatus &&
                    <div className={style.status}>
                      {renderBadgeIcon(cardLevel, isPassed, isLocked, isActive)}
                      {getStatusText(isPassed, isActive, isLocked)}
                    </div>
                  }
                </div>

                <p className={style.text}>{el.text}</p>

                {
                  (el.disabled && !isActive && !isPassed) &&
                  <p className={style.disabled}>{el.disabled}</p>
                }

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
                      <p className={style.label}>{item.text}</p>
                    </li>
                  )}
                </ul>

                <div className={style.footer}>
                  {
                    (!isPassed && el.button) &&
                    <Action
                      to={el.button.url}
                      classes={['primary', 'wide', 'md']}
                      isDisabled={isLocked}
                    >
                      {
                        isLocked &&
                        <Icon name="toggle-lock" />
                      }
                      <span>{el.button.text}</span>
                    </Action>
                  }
                </div>
              </article>
            )
          })}
        </div>

        <Link href="./" className={style.info}>
          <span>
            <Icon name="status-info" size="lg" />
          </span>
          <div>
            <p>Why verify</p>
            <p>Verification helps us keep your account secure, prevent fraud and comply with regulations</p>
          </div>
          <Icon name="navigation-chevron-right" size="lg" />
        </Link>
      </div>
    </section>
  )
}

export default SectionVerification
