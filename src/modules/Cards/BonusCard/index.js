import { startTransition } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { date } from '@/helpers/date'
import { toast } from '@/utils/toast'
import { action } from './action'

import Toggle from '@/components/Toggle'
import Action from '@/components/Action'
import Scale from '@/modules/Scale'

import style from './index.module.scss'

const BonusCard = ({ settings, data }) => {
  const t = useTranslations()

  const handleChange = (value) => {
    startTransition(async () => {
      const res = await action(data?.id, value)

      if (res?.code === '0') {
        toast.success(res.message)
      }
      else {
        toast.error(res.error_message)
      }
    })
  }

  return (
    <div className={style.block}>
      <div className={style.content}>
        <div className={style.left}>
          <div className={style.picture}>
            <Image
              className={style.image}
              src={'/images/logo-desktop.svg'}
              alt={settings.name}
              width={158}
              height={28}
              decoding="async"
            />
          </div>
        </div>
        <div className={style.right}>
          <div className={style.row}>
            <h3>{data.name}</h3>
            <Toggle
              data={data?.enable}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={style.row}>
            <p>{t('amount')}:</p>
            <p>{data.amount} {data.currency}</p>
          </div>
          <div className={style.row}>
            <p>{t('expired')}:</p>
            <p>{date(data.expired_at, 3)}</p>
          </div>
        </div>
      </div>
      <div className={style.info}>
        {
          data?.button?.link &&
          <Action
            to={data?.button?.link}
            placeholder={data?.button?.text}
            classes={['primary', 'md', 'wide']}
          />
        }
        {
          data?.info &&
          <Action
            to={data?.info}
            placeholder={t('details')}
            classes={['outline', 'md', 'wide']}
          />
        }
      </div>
      <div className={style.scale}>
        <Scale
          amount={data.total_bets}
          percentage={data.percentage}
          max={data.refund_sum}
          currency={data.currency}
          isInverted={true}
        />
      </div>
      <div>{t('wager')}: {data.wager}</div>
    </div>
  )
}

export default BonusCard
