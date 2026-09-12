'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { ROUTES_USER } from '@/constant/config'

import { useUser } from '@/hooks/useUser'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Title from '@/modules/Title'

import style from './index.module.scss'

const LEVELS = [
  {
    level: '1',
    title: '1 level',
    text: 'verify_steps.step_1.text',
    button: {
      url: `${ROUTES_USER.profile.url}/profile`,
      text: 'verify_steps.step_1.button'
    },
    list: [
      { icon: 'commerce-wallet', text: 'verify_steps.step_1.items.0' },
      { icon: 'games-slot', text: 'verify_steps.step_1.items.1' },
      { icon: 'commerce-bonus', text: 'verify_steps.step_1.items.2' },
      { icon: 'games-spinner', text: 'verify_steps.step_1.items.3' }
    ]
  },
  {
    level: '2',
    title: '2 level',
    text: 'verify_steps.step_2.text',
    disabled: 'verify_steps.step_2.disabled',
    button: {
      url: `${ROUTES_USER.profile.url}/verification`,
      text: 'verify_steps.step_2.button'
    },
    list: [
      { icon: 'commerce-withdraw', text: 'verify_steps.step_2.items.0' },
      { icon: 'games-slot', text: 'verify_steps.step_2.items.1' },
      { icon: 'commerce-bank-card', text: 'verify_steps.step_2.items.2' },
      { icon: 'toggle-lock', text: 'verify_steps.step_2.items.3' }
    ]
  },
  {
    level: '3',
    title: '3 level',
    text: 'verify_steps.step_3.text',
    disabled: 'verify_steps.step_3.disabled',
    button: null,
    list: [
      { icon: 'games-sparks', text: 'verify_steps.step_3.items.0' },
    ]
  }
]

const renderStatus = (isPassed, isActive, isLocked) => {
  if (isPassed) return 'verify_status.verified'
  if (isActive) return 'verify_status.not'
  if (isLocked) return 'verify_status.locked'
  return ''
}

const renderIcon = (level, cardLevel, isPassed, isLocked) => {
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

const Section = () => {
  const t = useTranslations()
  const { level: userLevel } = useUser()

  const level = userLevel || '1'

  return (
    <section className={style.block}>
      <div>
        <Title
          title={t('section.verification')}
          isBack={true}
        />
        <p>{t('verify_steps.subtitle')}</p>
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
                className={
                  clsx(
                    style.level,
                    style[`level-${cardLevel}`],
                    isPassed && style.passed,
                    isActive && style.active
                  )
                }
              >
                <div className={style.circle}>
                  <span>{renderIcon(level, cardLevel, isPassed, isLocked, isActive)}</span>
                </div>

                <div className={style.header}>
                  <h2>{showStatus ? el.title : t('verify_status.verified')}</h2>
                  {
                    showStatus &&
                    <div className={style.status}>
                      {renderBadgeIcon(cardLevel, isPassed, isLocked, isActive)}
                      {t(renderStatus(isPassed, isActive, isLocked))}
                    </div>
                  }
                </div>
                <p className={style.text}>{t(el.text)}</p>
                {
                  (el.disabled && !isActive && !isPassed) &&
                  <p className={style.disabled}>{t(el.disabled)}</p>
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
                      <p className={style.label}>{t(item.text)}</p>
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
                      <span>{t(el.button.text)}</span>
                    </Action>
                  }
                </div>
              </article>
            )
          })}
        </div>

        <Link
          href={'/info/verification-policy'}
          className={style.info}
        >
          <span>
            <Icon name="status-info" size="lg" />
          </span>
          <div>
            <p>{t('verify_steps.link')}</p>
            <p>{t('verify_steps.sublink')}</p>
          </div>
          <Icon name="navigation-chevron-right" size="lg" />
        </Link>
      </div>
    </section>
  )
}

export default Section
