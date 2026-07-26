import { startTransition } from 'react'
import { useTranslations } from 'next-intl'
import classNames from 'classnames'

import { VOUCHER_STATUS, PAYMENT_TYPE } from '@/constant/config'
import { toast } from '@/utils/toast'
import { useModal } from '@/context/ModalContext'

import { date } from '@/helpers/date'
import { action } from './action'

import Action from '@/components/Action'
import PaymentDetailsModal from '@/modules/Modals/PaymentDetailsModal'

import style from '../index.module.scss'

const Row = ({ data }) => {
  const t = useTranslations()
  const { openModal } = useModal()

  const handleCancel = () => {
    startTransition(async () => {
      const res = await action(data.id)

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
        <a
          key={idx}
          className={style.link}
          href={action.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      )
    }

    if (action.text === 'cancel') {
      return (
        <Action
          key={idx}
          onChange={handleCancel}
          classes={['primary', 'sm']}
          placeholder={label}
        />
      )
    }

    return (
      <Action
        key={idx}
        classes={['primary', 'sm']}
        placeholder={label}
      />
    )
  }

  return (
    <div
      className={
        classNames(
          style.row,
          style[VOUCHER_STATUS[data.status]],
        )
      }
    >
      <div className={style.cell}>{data.id}</div>
      <div className={style.cell}>{t(`voucher_status.${VOUCHER_STATUS[data.status]}`)}</div>
      <div className={style.cell}>{t(`payments.${data.payment.alias}`)}</div>
      <div className={style.cell}>{t(PAYMENT_TYPE[data.type])}</div>
      <div className={style.cell}>{data.type === '1' ? '-' : '+'}{data.amount}</div>
      <div className={style.cell}>{date(data.date)}</div>
      <div className={style.cell}>
        <Action
          classes={['primary', 'sm']}
          placeholder={t('show')}
          onChange={() => {
            openModal({
              title: `${t('details')}: ${data.id}`,
              body: <PaymentDetailsModal data={data} />
            })
          }}
        />
      </div>
      <div className={style.cell}>
        {
          data.actions?.map((el, idx) =>
            renderAction(el, idx)
          )
        }
      </div>
    </div>
  )
}

export default Row
