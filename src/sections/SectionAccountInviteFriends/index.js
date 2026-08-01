'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { useCopy } from '@/hooks/useCopy'

import Action from '@/components/Action'
import Field from '@/components/Field'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const SectionAccountInviteFriends = ({ user, data }) => {
  const t = useTranslations()
  const { copy, copied } = useCopy()

  return (
    <section>
      <div className={style.top}>
        <div>
          <Image
            className={style.image}
            src={'/images/invite_friend.webp'}
            alt={'Invite Friend'}
            width={1024}
            height={1024}
            decoding="async"
          />
        </div>
        <div className={style.left}>
          <div className={style.info}>
            <h1>{t('invite.title')}</h1>
            <h2 className={style.subtitle}>{t('invite.subtitle')}</h2>
          </div>
          <div className={style.links}>
            <Action
              target={'_blank'}
              to={`viber://forward?text=${user?.invite?.text}${data}`}
              placeholder={'Viber'}
              classes={['tertiary', 'md']}
            />
            <Action
              target={'_blank'}
              to={`https://t.me/share/url?url=${user?.invite?.text}${data}`}
              placeholder={'Telegram'}
              classes={['tertiary', 'md']}
            />
            <Action
              target={'_blank'}
              to={`https://wa.me/?text=${user?.invite?.text}${data}`}
              placeholder={'Whatsapp'}
              classes={['tertiary', 'md']}
            />
          </div>
          <p className={style.divider}>{t('invite.divider')}</p>
          <div className={style.form}>
            <Field
              placeholder={t('link')}
              data={data}
              onChange={() => {}}
              isRequired={true}
            />
            <Action
              classes={['primary', 'lg', 'square']}
              onChange={() => copy(data)}
            >
              <Icon name={copied ? 'icon-status-checkmark' : 'icon-actions-copy'} />
            </Action>
          </div>
        </div>
      </div>
      <div className={style.bottom}>
        <h1 className={style.description}>{t('invite.how_work')}</h1>
        <div className={style.steps}>
          <div className={style.step}>
            <h5>{t('step')} 1</h5>
            <p>{t('invite.step_1')}</p>
          </div>
          <div className={style.step}>
            <h5>{t('step')} 2</h5>
            <p>{t('invite.step_2')}</p>
          </div>
          <div className={style.step}>
            <h5>{t('step')} 3</h5>
            <p>{t('invite.step_3')}</p>
          </div>
          <div className={style.step}>
            <h5>{t('step')} 4</h5>
            <p>{t('invite.step_4')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionAccountInviteFriends
