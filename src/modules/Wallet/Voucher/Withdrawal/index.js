'use client'

import { useState, useTransition } from 'react'
import { useTranslations } from 'next-intl'

import { useFilterState } from '@/hooks/useFilterState'
import { toast } from '@/utils/toast'

import { action } from './action'

import Action from '@/components/Action'
import Field from '@/components/Field'
import Voucher from '@/modules/Voucher'
import Notification from '@/modules/Notification'

import style from './index.module.scss'

const INITIAL_FILTER = { amount: '' }

const Withdrawal = ({ user, data }) => {
  const t = useTranslations()
  const [ticket, setTicket] = useState(null)
  const [isPending, startTransition] = useTransition()

  const { filter, setFilter, handlePropsChange } = useFilterState(INITIAL_FILTER)

  const handleSubmit = async (e) => {
    e && e.preventDefault()

    startTransition(async () => {
      const res = await action(filter.amount)

      if (res?.code === '0') {
        setTicket(res?.voucher)
        setFilter(INITIAL_FILTER)
        toast.success(res?.message)
      }
      else {
        toast.error(res?.error_message || t('error'))
      }
    })
  }

  const isValid = (Number(filter.amount) >= data?.withdraw?.min) && (Number(filter.amount) <= data?.withdraw?.max)

  return (
    <form className={style.block} onSubmit={handleSubmit}>
      {
        ticket &&
        <Voucher
          user={user}
          data={ticket}
        />
      }
      <Notification
        text={`${t('min')}: ${data?.withdraw?.min}, ${t('max')}: ${data?.withdraw?.max}`}
        type={'warning'}
      />
      <Field
        type={'number'}
        placeholder={t('amount')}
        data={filter.amount}
        onChange={value => handlePropsChange('amount', value)}
        isRequired={true}
      />
      <div className={style.actions}>
        {
          data?.withdraw?.quickAmount.map((el, idx) =>
            <Action
              key={idx}
              placeholder={`${el} ${user.currency.code}`}
              classes={['primary', 'md']}
              onChange={() => handlePropsChange('amount', el)}
            />
          )
        }
      </div>
      <Action
        type={'submit'}
        classes={['primary', 'lg', 'wide']}
        placeholder={t('withdrawal')}
        isDisabled={!isValid || isPending}
      />
    </form>
  )
}

export default Withdrawal
