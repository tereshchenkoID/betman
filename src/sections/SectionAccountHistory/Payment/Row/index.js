import { startTransition } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { VOUCHER_STATUS, PAYMENT_TYPE } from '@/constant/config'
import { toast } from '@/utils/toast'
import { useModal } from '@/context/ModalContext'

import { date } from '@/helpers/date'
import { action } from './action'

import Action from '@/components/Action'

import style from '../index.module.scss'

const Row = ({ data }) => {
  const t = useTranslations()
  const { openModal } = useModal()

  const handleCancel = () => {
    startTransition(async () => {
      const res = await action(data?.id)

      if (res.code === '0') {
        toast.success(res.message)
      }
      else {
        toast.error(res.message)
      }
    })
  }

  const renderAction = (action, idx) => {
    const label = t(action.text)

    if (action.link) {
      return (
        <Action
          key={idx}
          onChange={() => {
            openModal('cryptoDeposit', { data: action.link }, { title: t('deposit'), size: 'lg' })
          }}
          classes={['primary', 'sm']}
          placeholder={label}
        />
      )
    }

    else if (action.text === 'cancel') {
      return (
        <Action
          key={idx}
          onChange={handleCancel}
          classes={['secondary', 'sm']}
          placeholder={label}
        />
      )
    }

    return ''
  }

  return (
    <div
      className={
        clsx(
          style.row,
          style[VOUCHER_STATUS[data?.status]],
        )
      }
    >
      <div className={style.cell}>{data?.id}</div>
      <div className={style.cell}>{date(data?.date)}</div>
      <div className={style.cell}>{t(`payments.${data?.payment.alias}`)}</div>
      <div className={style.cell}>{t(`voucher_status.${VOUCHER_STATUS[data?.status]}`)}</div>
      <div className={style.cell}>{t(PAYMENT_TYPE[data?.type])}</div>
      <div className={style.cell}>{data?.type === '1' ? '-' : '+'}{data?.amount}</div>
      <div className={style.cell}>
        <Action
          classes={['primary', 'sm']}
          placeholder={t('show')}
          onChange={() => {
            openModal('paymentDetails', { data }, { title: `${t('details')}: ${data?.id}` })
          }}
        />
        {
          data?.actions?.map((el, idx) =>
            renderAction(el, idx)
          )
        }
      </div>
    </div>
  )
}

export default Row
