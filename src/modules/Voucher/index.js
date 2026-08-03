import { useTranslations } from 'next-intl'

import { useCopy } from '@/hooks/useCopy'
import { date } from '@/helpers/date'

import Icon from '@/components/Icon'
import Action from '@/components/Action'

import style from './index.module.scss'

const Voucher = ({ user, data, isPaid }) => {
  const t = useTranslations()
  const { copy, copied } = useCopy()

  return (
    <div className={style.block}>
      <div className={style.button}>
        <span className={style.content}>
          <strong className={style.title}>
            <span className={style.label}>{t('voucher')}:</span>
            <h3 className={style.code}>{data.code}</h3>
            <Action
              classes={['primary', 'square', 'sm']}
              onChange={() => copy(data.code)}
            >
              <Icon name={copied ? 'icon-status-checkmark' : 'icon-actions-copy'} />
            </Action>
          </strong>
          <strong className={style.amount}>
            <span className={style.label}>{t('amount')}:</span>
            <span>{data.amount} {user.currency.code}</span>
          </strong>
          <span className={style.date}>
            {
              data.expire
              ?
                <>
                  <span className={style.label}>{t('expired_date')}:</span>
                  <span>{date(data.expire)}</span>
                </>
              :
                <>
                  <span className={style.label}>{t('username')}:</span>
                  <span>{data.username}</span>
                </>
            }
          </span>
          {
            isPaid &&
            <h4 className={style.status}>{t('voucher_status.paid')}</h4>
          }
        </span>
      </div>
    </div>
  )
}

export default Voucher
